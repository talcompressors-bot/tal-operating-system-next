// ===== Maven API =====

const MAVEN_API_KEY = PropertiesService
  .getScriptProperties()
  .getProperty("MAVEN_API_KEY");


function syncMavenDocuments() {
  const lock = LockService.getScriptLock();

  if (!lock.tryLock(30000)) {
    Logger.log("Sync skipped: another sync is already running");
    return;
  }

  try {
    const ss = SpreadsheetApp.openById("1q6cCUJTNhhrUSok9rrZyFTN9BlrT6-4d7s9CUqrVHh4");

    const sheet = ss.getSheetByName("InvoiceMavenDocuments");
    const documentItemsSheet = ss.getSheetByName("InvoiceMavenDocumentItems");
    const stateSheet = ss.getSheetByName("SyncState");
    const logSheet = ss.getSheetByName("SyncLog");

    const url = "https://app.invoice-maven.co.il/api/documents/searchDocuments";

    let currentPage = 1;
    let stateRow = null;

    if (stateSheet) {
      const stateValues = stateSheet.getDataRange().getValues();

      for (let i = 1; i < stateValues.length; i++) {
        if (stateValues[i][0] === "Maven" && stateValues[i][1] === "DocumentsLastPage") {
          currentPage = Number(stateValues[i][2]) || 1;
          stateRow = i + 1;
          break;
        }
      }
    }

    const payload = {
      api_key: MAVEN_API_KEY,
      page: currentPage,
      page_size: 25,
      sort_by: "document_date",
      sort_order: "DESC",
      date_from: "2023-07-12"
    };

    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(url, options);
    const responseText = response.getContentText();
    const data = JSON.parse(responseText);

    if (String(data.status_code) !== "0") {
      if (responseText.includes("search_documents_too_many_times")) {
        if (logSheet) {
          logSheet.appendRow([
            Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss"),
            "Maven",
            0,
            0,
            "Rate limited",
            "Maven blocked page " + currentPage + ". Will retry same page next run."
          ]);
        }

        Logger.log("Maven rate limit on page " + currentPage + ". Page was NOT advanced.");
        return;
      }

      throw new Error("Maven API error: " + responseText);
    }

    const documents = data.documents || [];

    if (documents.length === 0) {
      if (logSheet) {
        logSheet.appendRow([
          Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss"),
          "Maven",
          0,
          0,
          "No documents",
          "No documents returned for page " + currentPage
        ]);
      }

      Logger.log("No Maven documents returned for page " + currentPage);
      return;
    }

    const existingIds = new Set();
    const lastRow = sheet.getLastRow();

    if (lastRow > 1) {
      const idValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
      idValues.forEach(row => {
        if (row[0]) existingIds.add(String(row[0]));
      });
    }

    const documentRows = [];
    const itemRows = [];

    let addedCount = 0;
    let skippedCount = 0;

    documents.forEach(function(doc) {
      const documentId = String(doc.id || "");

      if (!documentId) {
        skippedCount++;
        return;
      }

      if (existingIds.has(documentId)) {
        skippedCount++;
        return;
      }

      documentRows.push([
        documentId,
        doc.doc_no || "",
        doc.doc_type || "",
        doc.customer && doc.customer.id ? doc.customer.id : "",
        doc.customer && doc.customer.name ? doc.customer.name : "",
        doc.document_date || "",
        doc.total || "",
        doc.vat_amount || "",
        doc.status_description || "",
        "",
        "",
        "",
        doc.pdf_original || doc.pdf_copy || "",
        JSON.stringify(doc),
        new Date(),
        "Imported",
        ""
      ]);

      if (documentItemsSheet && doc.items && Array.isArray(doc.items)) {
        doc.items.forEach(function(item, index) {
          itemRows.push([
            documentId + "_" + index,
            documentId,
            doc.doc_no || "",
            doc.document_date || "",
            doc.customer && doc.customer.id ? doc.customer.id : "",
            doc.customer && doc.customer.name ? doc.customer.name : "",
            doc.doc_type || "",
            item.description || item.name || "",
            item.quantity || "",
            item.price || "",
            item.total || "",
            item.currency_code || doc.currency_code || "ILS",
            JSON.stringify(item),
            Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss")
          ]);
        });
      }

      existingIds.add(documentId);
      addedCount++;
    });

    if (documentRows.length > 0) {
      sheet.getRange(
        sheet.getLastRow() + 1,
        1,
        documentRows.length,
        documentRows[0].length
      ).setValues(documentRows);
    }

    if (documentItemsSheet && itemRows.length > 0) {
      documentItemsSheet.getRange(
        documentItemsSheet.getLastRow() + 1,
        1,
        itemRows.length,
        itemRows[0].length
      ).setValues(itemRows);
    }

    if (logSheet) {
      logSheet.appendRow([
        Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss"),
        "Maven",
        addedCount,
        skippedCount,
        "Success",
        "Documents sync completed. Page " + currentPage + " imported."
      ]);
    }

    if (stateSheet && stateRow) {
      stateSheet.getRange(stateRow, 3).setValue(currentPage + 1);
      stateSheet.getRange(stateRow, 4).setValue(
        Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss")
      );
    }

    Logger.log("Maven sync finished. Page: " + currentPage + ", Added: " + addedCount + ", Skipped: " + skippedCount);

  } catch (error) {
    const errorSs = SpreadsheetApp.openById("1q6cCUJTNhhrUSok9rrZyFTN9BlrT6-4d7s9CUqrVHh4");
    const errorSheet = errorSs.getSheetByName("ErrorLog");

    if (errorSheet) {
      errorSheet.appendRow([
        Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss"),
        "Maven",
        "syncMavenDocuments",
        error.message,
        JSON.stringify(error),
        "Error"
      ]);
    }

    throw error;

  } finally {
    lock.releaseLock();
  }
}

function doPost(e) {
 

  const data = JSON.parse(e.postData.contents);

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const logSheet = ss.getSheetByName("BusinessDocumentLog");

  

 if (String(data.Command).trim() === "CreateMavenDraft") {

  const claimed = claimAutomationCommand(data.CommandID);

  if (!claimed) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: "Command already handled",
        commandId: data.CommandID
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const result = createMavenDraft(data);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: "createDraft finished",
        result: result
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      message: "Unknown command",
      command: data.command || ""
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

 

function createMavenDraft(data) {

 
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);


  let logSheet = ss.getSheetByName("BusinessDocumentLog");
  if (!logSheet) {
    logSheet = ss.insertSheet("BusinessDocumentLog");
  }

  logSheet.appendRow([
    new Date(),
    "Webhook received",
    data.BusinessDocumentId || "",
    data.CustomerId || "",
    data.CustomerName || "",
    data.DocumentType || "",
    data.TotalAmount || "",
    JSON.stringify(data)
  ]);

  const sheet = ss.getSheetByName("BusinessDocuments");
  if (!sheet) {
    return {
      success: false,
      message: "BusinessDocuments sheet not found"
    };
  }

  const values = sheet.getDataRange().getValues();
const headers = values[0];

  
const cleanHeaders = headers.map(h => String(h).trim());

const idCol = cleanHeaders.indexOf("BusinessDocumentId");
const statusCol = cleanHeaders.indexOf("DocumentStatus");
const actionAtCol = cleanHeaders.indexOf("LastActionAt");


  if (idCol === -1 || statusCol === -1) {
    return {
      success: false,
      message: "Required columns not found"
    };
  }

  let updated = false;

for (let i = 1; i < values.length; i++) {
  const sheetId = String(values[i][idCol]).trim();
  const requestId = String(data.BusinessDocumentId).trim();

  if (sheetId === requestId) {
    sheet.getRange(i + 1, statusCol + 1).setValue("DraftRequestReceived");

    if (actionAtCol >= 0) {
      sheet.getRange(i + 1, actionAtCol + 1).setValue(new Date());
    }

    SpreadsheetApp.flush();

    logSheet.appendRow([
      new Date(),
      "UPDATED",
      data.BusinessDocumentId,
      "",
      "",
      "",
      "DocumentStatus changed to DraftRequestReceived"
    ]);

    updated = true;
    break;
  }
}

  if (!updated) {
    logSheet.appendRow([
      new Date(),
      "ERROR",
      data.BusinessDocumentId || "",
      "",
      "",
      "",
      "BusinessDocumentId not found in BusinessDocuments"
    ]);
}

   updateAutomationCommandStatus(
  data.CommandID,
  "Completed",
  "BusinessDocuments updated",
  ""
);

   return {
  success: true,
  message: "BusinessDocumentLog updated and BusinessDocuments updated",
  businessDocumentId: data.BusinessDocumentId || ""
};
  }


function updateAutomationCommandStatus(commandId, status, result, errorMessage) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName("AutomationCommands");
  if (!sheet) return;

  const values = sheet.getDataRange().getValues();
  const headers = values[0];

  const idCol = headers.indexOf("CommandID");
  const statusCol = headers.indexOf("Status");
  const resultCol = headers.indexOf("Result");
  const completedAtCol = headers.indexOf("CompletedAt");
  const errorCol = headers.indexOf("ErrorMessage");

  if (idCol === -1 || statusCol === -1) return;

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idCol]).trim() === String(commandId).trim()) {
      sheet.getRange(i + 1, statusCol + 1).setValue(status);

      if (resultCol !== -1) {
        sheet.getRange(i + 1, resultCol + 1).setValue(result || "");
      }

      if (completedAtCol !== -1 && (status === "Completed" || status === "Error")) {
        sheet.getRange(i + 1, completedAtCol + 1).setValue(new Date());
      }

      if (errorCol !== -1) {
        sheet.getRange(i + 1, errorCol + 1).setValue(errorMessage || "");
      }

      SpreadsheetApp.flush();
      return;
    }
  }
}

function testMavenConnection() {

  const url =
    "https://app.invoice-maven.co.il/api/documents/searchDocuments";

 const payload = {
  api_key: MAVEN_API_KEY,
  page:1,
  page_size:5
};

  const options = {
    method:"post",
    contentType:"application/json",
    payload:JSON.stringify(payload),
    muteHttpExceptions:true
  };

  const response =
    UrlFetchApp.fetch(url,options);

  Logger.log(response.getContentText());
}
function runMavenDocumentsSyncNow() {
  syncMavenDocuments();

  return {
    success: true,
    message: "Maven documents sync completed"
  };
}

function backfillMavenDocumentItems() {
const ss = SpreadsheetApp.openById("1q6cCUJTNhhrUSok9rrZyFTN9BlrT6-4d7s9CUqrVHh4");

  const docsSheet = ss.getSheetByName("InvoiceMavenDocuments");
  const itemsSheet = ss.getSheetByName("InvoiceMavenDocumentItems");

  const docs = docsSheet.getDataRange().getValues();
  const items = itemsSheet.getDataRange().getValues();

  const existingItemIds = new Set(
    items.slice(1).map(r => r[0]).filter(String)
  );

const startRow = Number(
  PropertiesService.getScriptProperties()
    .getProperty("BACKFILL_ROW")
) || 1;

const batchSize = 200;

const endRow = Math.min(
  startRow + batchSize,
  docs.length
);

  let added = 0;

for (let i = startRow; i < endRow; i++) {
    const documentId = docs[i][0];
    const rawJson = docs[i][13]; // RawJson = column N

    if (!documentId || !rawJson) continue;

    const doc = JSON.parse(rawJson);

    if (!doc.items || !Array.isArray(doc.items)) continue;

    doc.items.forEach(function(item, index) {
      const itemRowId = documentId + "_" + index;


      if (existingItemIds.has(itemRowId)) return;

      itemsSheet.appendRow([
        itemRowId,
        documentId,
        doc.doc_no || "",
        doc.document_date || "",
        doc.customer && doc.customer.id ? doc.customer.id : "",
        doc.customer && doc.customer.name ? doc.customer.name : "",
        doc.doc_type || "",
        item.description || item.name || "",
        item.quantity || "",
        item.price || "",
        item.total || "",
        item.currency_code || doc.currency_code || "ILS",
        JSON.stringify(item),
        Utilities.formatDate(
          new Date(),
          Session.getScriptTimeZone(),
          "dd/MM/yyyy HH:mm:ss"
        )
      ]);

      existingItemIds.add(itemRowId);
      added++;
    });
  }
Logger.log("Backfill Maven document items completed. Added: " + added);

PropertiesService.getScriptProperties()
  .setProperty("BACKFILL_ROW", endRow);

Logger.log(
  "Processed rows: " + startRow + " - " + endRow
);
 
}

function claimAutomationCommand(commandId) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName("AutomationCommands");
    const values = sheet.getDataRange().getValues();
    const headers = values[0];

    const idCol = headers.indexOf("CommandID");
    const statusCol = headers.indexOf("Status");
    const resultCol = headers.indexOf("Result");

    for (let i = 1; i < values.length; i++) {
      if (String(values[i][idCol]).trim() === String(commandId).trim()) {
        const status = String(values[i][statusCol]).trim();

        if (status !== "Pending") {
          return false;
        }

        sheet.getRange(i + 1, statusCol + 1).setValue("Running");

        if (resultCol !== -1) {
          sheet.getRange(i + 1, resultCol + 1).setValue("Started");
        }

        SpreadsheetApp.flush();
        return true;
      }
    }

    return false;

  } finally {
    lock.releaseLock();
  }
}
