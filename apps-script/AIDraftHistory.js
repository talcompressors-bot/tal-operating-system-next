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