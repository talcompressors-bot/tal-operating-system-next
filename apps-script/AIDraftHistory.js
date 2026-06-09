function findHistoricalPricesForReport(reportCounter) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  const reports = sheetToObjects(ss.getSheetByName('ServiceReports'));
  const equipmentItems = sheetToObjects(ss.getSheetByName('ReportEquipmentItems'));
  const mavenItems = sheetToObjects(ss.getSheetByName('InvoiceMavenDocumentItems'));

  const report = reports.find(r =>
    String(r.ReportCounter || '').trim() === String(reportCounter).trim() ||
    String(r['מספר דוח'] || '').trim() === String(reportCounter).trim()
  );

  if (!report) {
    return { success: false, message: 'Report not found', reportCounter };
  }

  const reportId = String(report.ReportID || '').trim();

  const relatedEquipment = equipmentItems.filter(item =>
    String(item.ReportID || '').trim() === reportId ||
    String(item['דוח'] || '').trim() === reportId ||
    String(item['מספר דוח'] || '').trim() === String(reportCounter).trim()
  );

  const searchTerms = [];

  relatedEquipment.forEach(item => {
    [
      item['דגם הציוד'],
      item['סוג ציוד'],
      item['תת סוג ציוד'],
      item['קטגוריית מדחס'],
      item['תיאור השירות'],
      item['מסנן אויר'],
      item['מסנן שמן'],
      item['מפריד שמן'],
      item['שמן'],
      item['חלפים נוספים']
    ].forEach(v => {
      if (v) searchTerms.push(String(v).trim());
    });
  });

  const usefulTerms = searchTerms
    .filter(t => t && t !== 'הוחלף' && t !== 'תקין')
    .map(t => t.toLowerCase());

  const matches = [];

  mavenItems.forEach(row => {
    const description = String(
      row.Description ||
      row.description ||
      row.ItemName ||
      row['תיאור'] ||
      ''
    );

    const lower = description.toLowerCase();

    const score = usefulTerms.filter(term => lower.includes(term)).length;

    if (score > 0) {
      matches.push({
        score,
        description,
        quantity: row.Quantity || row.quantity || '',
        unitPrice: row.UnitPrice || row.price || '',
        total: row.TotalPrice || row.total || '',
        documentId: row.DocumentId || row.DocumentID || row.documentId || '',
        raw: row
      });
    }
  });

  matches.sort((a, b) => b.score - a.score);

  return {
    success: true,
    reportCounter,
    reportId,
    customerName: report.CustomerName || report['שם לקוח'] || '',
    equipment: relatedEquipment,
    searchTerms: usefulTerms,
    matches: matches.slice(0, 20),
    note: 'Read-only historical pricing search. No document was created.'
  };
}

function generateBusinessDocumentItemsPreview(reportCounter) {
  Logger.log('AI Draft preview started. ReportCounter: ' + reportCounter);

  if (!reportCounter) {
    Logger.log('AI Draft preview failed: missing reportCounter');
    return {
      success: false,
      mode: 'preview_only',
      reportCounter: reportCounter || '',
      message: 'reportCounter is required',
      warnings: ['Missing reportCounter']
    };
  }

  const warnings = [];
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  const reports = sheetToObjects(ss.getSheetByName('ServiceReports'));
  const equipmentItems = sheetToObjects(ss.getSheetByName('ReportEquipmentItems'));
  const partsUsedRows = sheetToObjects(ss.getSheetByName('PartsUsed'));
  const catalogRows = sheetToObjects(ss.getSheetByName('ProductsCatalog'));

  Logger.log(JSON.stringify(partsUsedRows[0]));
  Logger.log(JSON.stringify(catalogRows[0]));

  Logger.log('AI Draft preview loaded tables. ServiceReports=' + reports.length +
    ', ReportEquipmentItems=' + equipmentItems.length +
    ', PartsUsed=' + partsUsedRows.length +
    ', ProductsCatalog=' + catalogRows.length);

  const historicalResult = findHistoricalPricesForReport(reportCounter);

  if (!historicalResult.success) {
    Logger.log('AI Draft preview failed in historical search: ' + historicalResult.message);
    return {
      success: false,
      mode: 'preview_only',
      reportCounter: String(reportCounter),
      message: historicalResult.message || 'Historical price search failed',
      warnings: warnings
    };
  }

  const report = findSourceReportForAIDraft_(reports, reportCounter);

  if (!report) {
    Logger.log('AI Draft preview failed: report not found. ReportCounter: ' + reportCounter);
    return {
      success: false,
      mode: 'preview_only',
      reportCounter: String(reportCounter),
      message: 'Report not found',
      warnings: warnings
    };
  }

  const reportId = String(report.ReportID || '').trim();
  const customerName = report.CustomerName || report['׳©׳ ׳׳§׳•׳—'] || '';
  const relatedEquipment = findRelatedEquipmentForAIDraft_(equipmentItems, report, reportCounter);
  const relatedParts = findPartsUsedForAIDraft_(partsUsedRows, report, reportCounter);

  Logger.log('AI Draft preview source found. ReportID=' + reportId +
    ', CustomerName=' + customerName +
    ', EquipmentRows=' + relatedEquipment.length +
    ', PartsRows=' + relatedParts.length);

  const items = [];

  items.push(buildVisitPreviewItem_(report));

  const laborItem = buildLaborPreviewItem_(report, warnings);
  if (laborItem) {
    items.push(laborItem);
  }

  relatedParts.forEach(function(part) {
    const catalogMatch = findCatalogMatchForPart_(catalogRows, part);
    const historicalMatch = findHistoricalMatchForPart_(historicalResult.matches || [], part);
    items.push(buildPartPreviewItem_(part, catalogMatch, historicalMatch, reportCounter));
  });

  if (relatedParts.length === 0) {
    warnings.push('No PartsUsed rows found for this report');
    Logger.log('AI Draft preview warning: no PartsUsed rows found');
  }

  const needsPriceApprovalCount = items.filter(function(item) {
    return item.businessDocumentItemFields.NeedsPriceApproval === true;
  }).length;

  const missingQuantityCount = items.filter(function(item) {
    const quantity = item.businessDocumentItemFields.Quantity;
    return quantity === '' || quantity === null || quantity === undefined || Number(quantity) === 0;
  }).length;

  const result = {
    success: true,
    mode: 'preview_only',
    reportCounter: String(reportCounter),
    reportId: reportId,
    customerName: customerName,
    source: {
      serviceReport: report,
      equipment: relatedEquipment,
      partsUsed: relatedParts
    },
    items: items,
    approvalSummary: {
      needsUserApproval: true,
      needsPriceApprovalCount: needsPriceApprovalCount,
      missingQuantityCount: missingQuantityCount,
      warnings: warnings
    },
    note: 'Preview only. No rows were created.'
  };

  Logger.log('AI Draft preview completed. Items=' + items.length +
    ', NeedsPriceApproval=' + needsPriceApprovalCount +
    ', MissingQuantity=' + missingQuantityCount);

  return result;
}

function findSourceReportForAIDraft_(reports, reportCounter) {
  const cleanCounter = String(reportCounter || '').trim();

  return reports.find(function(report) {
    return String(report.ReportCounter || '').trim() === cleanCounter ||
      String(report['׳׳¡׳₪׳¨ ׳“׳•׳—'] || '').trim() === cleanCounter;
  }) || null;
}

function findRelatedEquipmentForAIDraft_(equipmentItems, report, reportCounter) {
  const reportId = String(report.ReportID || '').trim();
  const reportCounterValue = String(report.ReportCounter || reportCounter || '').trim();
  const reportNumber = String(report['׳׳¡׳₪׳¨ ׳“׳•׳—'] || '').trim();

  return equipmentItems.filter(function(item) {
    const itemReportId = String(item.ReportID || '').trim();
    const itemReportRef = String(item['׳“׳•׳—'] || '').trim();
    const itemReportNumber = String(item['׳׳¡׳₪׳¨ ׳“׳•׳—'] || '').trim();

    return itemReportId === reportId ||
      itemReportId === reportCounterValue ||
      itemReportId === reportNumber ||
      itemReportRef === reportId ||
      itemReportRef === reportCounterValue ||
      itemReportRef === reportNumber ||
      itemReportNumber === reportCounterValue ||
      itemReportNumber === reportNumber;
  });
}

function findPartsUsedForAIDraft_(partsUsedRows, report, reportCounter) {
  const reportId = String(report.ReportID || '').trim();
  const reportCounterValue = String(report.ReportCounter || reportCounter || '').trim();
  const reportNumber = String(report['׳׳¡׳₪׳¨ ׳“׳•׳—'] || '').trim();

  return partsUsedRows.filter(function(part) {
    const partReportId = String(part.ReportID || part.ReportId || '').trim();
    const partReportRef = String(part['׳“׳•׳—'] || '').trim();
    const partReportNumber = String(part['׳׳¡׳₪׳¨ ׳“׳•׳—'] || '').trim();

    return partReportId === reportId ||
      partReportId === reportCounterValue ||
      partReportId === reportNumber ||
      partReportRef === reportId ||
      partReportRef === reportCounterValue ||
      partReportRef === reportNumber ||
      partReportNumber === reportCounterValue ||
      partReportNumber === reportNumber;
  });
}

function findCatalogMatchForPart_(catalogRows, part) {
  const partSku = normalizeAIDraftText_(
    part['׳׳§״ט']
  );
  const partName = normalizeAIDraftText_(
    part['׳©׳ ׳—׳׳§']
  );

  let bestMatch = null;

  catalogRows.forEach(function(row) {
    const catalogSku = normalizeAIDraftText_(row.SKU);
    const catalogName = normalizeAIDraftText_(row.ProductName);
    const catalogDescription = normalizeAIDraftText_(row.ProductDescription);
    const compatibleEquipment = normalizeAIDraftText_(row.CompatibleEquipment);

    let score = 0;
    let reason = '';

    if (partSku && catalogSku && partSku === catalogSku) {
      score = 95;
      reason = 'Exact ProductsCatalog SKU match';
    } else if (partName && catalogName && partName === catalogName) {
      score = 90;
      reason = 'Exact ProductsCatalog item name match';
    } else if (partName && catalogDescription && catalogDescription.indexOf(partName) !== -1) {
      score = 80;
      reason = 'ProductsCatalog product description match';
    } else if (partName && compatibleEquipment && compatibleEquipment.indexOf(partName) !== -1) {
      score = 80;
      reason = 'ProductsCatalog compatible equipment match';
    } else if (partName && catalogName && (catalogName.indexOf(partName) !== -1 || partName.indexOf(catalogName) !== -1)) {
      score = 70;
      reason = 'Partial ProductsCatalog item name match';
    }

    if (score > 0 && (!bestMatch || score > bestMatch.confidenceScore)) {
      bestMatch = {
        matched: true,
        itemId: row.ProductID || '',
        unitPrice: toAIDraftNumber_(row.SellingPrice),
        confidenceScore: score,
        priceSource: 'ProductsCatalog',
        reasoning: reason,
        raw: row
      };
    }
  });

  if (bestMatch) return bestMatch;

  return {
    matched: false,
    itemId: '',
    unitPrice: 0,
    confidenceScore: 0,
    priceSource: '',
    reasoning: 'No ProductsCatalog match found',
    raw: null
  };
}

function findHistoricalMatchForPart_(historicalMatches, part) {
  const partName = normalizeAIDraftText_(
    part['׳©׳ ׳—׳׳§']
  );

  let bestMatch = null;
  const matchedItems = [];

  historicalMatches.forEach(function(match) {
    const description = normalizeAIDraftText_(match.description || '');
    if (!partName || !description) return;

    let score = 0;

    if (description === partName) {
      score = 75;
    } else if (description.indexOf(partName) !== -1 || partName.indexOf(description) !== -1) {
      score = 60;
    } else {
      const terms = partName.split(' ').filter(Boolean);
      const termHits = terms.filter(function(term) {
        return description.indexOf(term) !== -1;
      }).length;
      if (termHits > 0) {
        score = Math.min(40 + (termHits * 5), 55);
      }
    }

    if (score > 0) {
      const item = {
        matched: true,
        unitPrice: toAIDraftNumber_(match.unitPrice),
        confidenceScore: score,
        priceSource: 'HistoricalMaven',
        reasoning: 'Matched historical Maven item description',
        raw: match
      };
      matchedItems.push(item);

      if (!bestMatch || score > bestMatch.confidenceScore) {
        bestMatch = item;
      }
    }
  });

  if (bestMatch) {
    bestMatch.matches = matchedItems.slice(0, 5);
    return bestMatch;
  }

  return {
    matched: false,
    unitPrice: 0,
    confidenceScore: 0,
    priceSource: '',
    reasoning: 'No historical Maven match found',
    matches: []
  };
}

function buildVisitPreviewItem_(report) {
  const reportCounter = report.ReportCounter || report['׳׳¡׳₪׳¨ ׳“׳•׳—'] || '';

  return {
    businessDocumentItemFields: {
      BusinessDocumentId: '',
      ItemName: 'Technician Visit',
      Description: 'Technician visit for compressor service report ' + reportCounter,
      Quantity: 1,
      UnitPrice: 300,
      SourceType: 'FixedRule',
      ItemId: '',
      NeedsPriceApproval: false
    },
    previewMetadata: {
      LineType: 'Visit',
      LineTotal: 300,
      PriceSource: 'FixedRule',
      ConfidenceScore: 100,
      Confidence: 'High',
      Reasoning: 'Fixed technician visit price.'
    }
  };
}

function buildLaborPreviewItem_(report, warnings) {
  const reportCounter = report.ReportCounter || report['׳׳¡׳₪׳¨ ׳“׳•׳—'] || '';
  const laborQuantity = toAIDraftNumber_(
    report.TechnicianWorkTime ||
    report.WorkTime ||
    report.LaborHours ||
    report['׳©׳¢׳•׳× ׳¢׳‘׳•׳“׳”'] ||
    report['׳–׳׳ן ׳¢׳‘׳•׳“׳”'] ||
    report['׳©׳¢׳•׳× ׳˜׳›׳ ׳׳™']
  );

  const hasQuantity = laborQuantity > 0;
  if (!hasQuantity) {
    warnings.push('Technician labor quantity was not found');
    Logger.log('AI Draft preview warning: technician labor quantity missing');
  }

  return {
    businessDocumentItemFields: {
      BusinessDocumentId: '',
      ItemName: 'Technician Labor',
      Description: 'Labor for compressor service report ' + reportCounter,
      Quantity: hasQuantity ? laborQuantity : '',
      UnitPrice: 275,
      SourceType: 'FixedRule',
      ItemId: '',
      NeedsPriceApproval: !hasQuantity
    },
    previewMetadata: {
      LineType: 'Labor',
      LineTotal: hasQuantity ? laborQuantity * 275 : 0,
      PriceSource: 'FixedRule',
      ConfidenceScore: hasQuantity ? 100 : 50,
      Confidence: hasQuantity ? 'High' : 'Low',
      Reasoning: hasQuantity ?
        'Fixed technician labor price multiplied by reported labor hours.' :
        'Fixed technician labor price found, but labor quantity is missing.'
    }
  };
}

function buildPartPreviewItem_(part, catalogMatch, historicalMatch, reportCounter) {
  const partName = String(
    part['׳©׳ ׳—׳׳§'] || 'Part'
  ).trim();
  const quantity = toAIDraftNumber_(part['׳›׳׳•׳×']);
  const hasQuantity = quantity > 0;

  let unitPrice = 0;
  let itemId = '';
  let priceSource = 'ApprovalRequired';
  let confidenceScore = 0;
  let reasoning = 'No reliable ProductsCatalog or historical Maven price match found.';

  if (catalogMatch && catalogMatch.matched && catalogMatch.unitPrice > 0) {
    unitPrice = catalogMatch.unitPrice;
    itemId = catalogMatch.itemId || '';
    priceSource = catalogMatch.priceSource;
    confidenceScore = catalogMatch.confidenceScore;
    reasoning = catalogMatch.reasoning;
  } else if (historicalMatch && historicalMatch.matched && historicalMatch.unitPrice > 0) {
    unitPrice = historicalMatch.unitPrice;
    priceSource = historicalMatch.priceSource;
    confidenceScore = historicalMatch.confidenceScore;
    reasoning = historicalMatch.reasoning;
  }

  if (!hasQuantity) {
    reasoning += ' Quantity is missing.';
  }

  const needsPriceApproval = !hasQuantity || unitPrice <= 0 || confidenceScore < 70;
  const confidence = confidenceScore >= 80 ? 'High' : (confidenceScore >= 60 ? 'Medium' : 'Low');

  return {
    businessDocumentItemFields: {
      BusinessDocumentId: '',
      ItemName: partName,
      Description: partName + ' replaced during compressor service report ' + reportCounter,
      Quantity: hasQuantity ? quantity : '',
      UnitPrice: unitPrice,
      SourceType: 'PartsUsed',
      ItemId: itemId,
      NeedsPriceApproval: needsPriceApproval
    },
    previewMetadata: {
      LineType: 'Part',
      LineTotal: hasQuantity ? quantity * unitPrice : 0,
      PriceSource: priceSource,
      ConfidenceScore: confidenceScore,
      Confidence: confidence,
      Reasoning: reasoning,
      MatchedCatalogItem: catalogMatch && catalogMatch.matched ? catalogMatch.raw : null,
      MatchedHistoricalItems: historicalMatch && historicalMatch.matches ? historicalMatch.matches : []
    }
  };
}

function normalizeAIDraftText_(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function toAIDraftNumber_(value) {
  if (value === null || value === undefined || value === '') return 0;

  if (typeof value === 'number') return isNaN(value) ? 0 : value;

  const clean = String(value)
    .replace(/[^\d.,-]/g, '')
    .replace(',', '.');
  const number = Number(clean);

  return isNaN(number) ? 0 : number;
}
