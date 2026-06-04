const SPREADSHEET_ID = '1q6cCUJTNhhrUSok9rrZyFTN9BlrT6-4d7s9CUqrVHh4';

const TABLES = {
  reports: 'ServiceReports',
  equipment: 'ReportEquipmentItems',
  customers: 'Customers_Final'
};

function doGet(e) {

if (e.parameter.action === 'publicReport') {
  return servePublicReport(e.parameter.ReportID, e.parameter.token);
}

  if (e.parameter.action === 'debugLastReports') {
  return HtmlService.createHtmlOutput(debugLastReports());
}

  if (e.parameter.action === 'sendEmail') {
    return sendReportEmail(e.parameter.reportId);
  }
if (e.parameter.action === 'saveHtml') {
  const fileUrl = saveSignedHtmlFile(e.parameter.reportId);

  return HtmlService.createHtmlOutput(
    'הדוח נשמר בהצלחה<br><br>' +
    '<a href="' + fileUrl + '" target="_blank">פתח דוח</a>'
  );
}
if (e.parameter.action === 'assignCounter') {
  const counter = assignReportCounter(e.parameter.reportId);

  return HtmlService.createHtmlOutput(
    'מספר דוח הוקצה בהצלחה: ' + counter
  );
}
  if (e.parameter.action === 'createReportFile') {
    const fileUrl = createReportFile(e.parameter.reportId);

    return HtmlService.createHtmlOutput(
      'הדוח הופק ונשמר בתיקיית הלקוח<br><br>' +
      '<a href="' + fileUrl + '" target="_blank">פתח דוח</a>'
    );
  }


const reportId = e.parameter.reportId || '';

const template = HtmlService.createTemplateFromFile('Report');
template.reportId = reportId;
template.preloadedDataJson = JSON.stringify(getReportData(reportId) || {});  
  return template
    .evaluate()
    .setTitle('דוח שירות');
}




function getReportData(reportId) {

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  const reports = sheetToObjects(
    ss.getSheetByName(TABLES.reports)
  );

  const equipment = sheetToObjects(
    ss.getSheetByName(TABLES.equipment)
  );

  const customers = sheetToObjects(
    ss.getSheetByName(TABLES.customers)
  );


const cleanId = String(reportId || '').trim();

const report = reports.find(row =>
  String(row['ReportID'] || '').trim() === cleanId ||
  String(row['ReportId'] || '').trim() === cleanId ||
  String(row['ReportCounter'] || '').trim() === cleanId ||
  String(row['מספר דוח'] || '').trim() === cleanId
);

  if (!report) {

    throw new Error('Report not found: ' + reportId);

  }
  
  const customerId = report['CustomerID'];

  const customer = customers.find(row =>

    String(row['CustomerID']) === String(customerId) ||
    String(row['ID']) === String(customerId)

  ) || {};

 const reportKey = String(report['ReportID'] || '').trim();
const reportCounter = String(report['ReportCounter'] || '').trim();
const reportNumber = String(report['מספר דוח'] || '').trim();
const requestId = String(reportId || '').trim();

const relatedEquipment = equipment.filter(row => {
  const eqReportId = String(row['ReportID'] || '').trim();
  const eqReportRef = String(row['דוח'] || '').trim();
  const eqReportNumber = String(row['מספר דוח'] || '').trim();

  return (
    eqReportId === reportKey ||
    eqReportId === reportCounter ||
    eqReportId === reportNumber ||
    eqReportId === requestId ||
    eqReportRef === reportKey ||
    eqReportRef === reportCounter ||
    eqReportRef === reportNumber ||
    eqReportRef === requestId ||
    eqReportNumber === reportCounter ||
    eqReportNumber === reportNumber ||
    eqReportNumber === requestId
  );
});
report['תאריך שירות'] = formatDateForReport(report['תאריך שירות']);
report['שעת שירות'] = formatTimeForReport(report['שעת שירות']);
 return JSON.parse(JSON.stringify({
  report: report || {},
  customer: customer || {},
  equipment: relatedEquipment || []
}));

}

function sheetToObjects(sheet) {

  if (!sheet) {

    throw new Error('Sheet not found');

  }

  const values = sheet.getDataRange().getValues();

  const headers = values[0];

  return values.slice(1).map(row => {

    const obj = {};

    headers.forEach((header, index) => {

      obj[header] = row[index];

    });

    return obj;

  });

}

function jsonResponse(data) {

  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);

}
function imageDataUrl(fileId) {
  const file = DriveApp.getFileById(fileId);
  const blob = file.getBlob();
  const contentType = blob.getContentType();
  const base64 = Utilities.base64Encode(blob.getBytes());

  return 'data:' + contentType + ';base64,' + base64;
}
function saveClientSignature(reportId, signatureData) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('ServiceReports');

  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const reportIdCol = headers.indexOf('ReportID');
  const reportCounterCol = headers.indexOf('ReportCounter');
  const reportNumberCol = headers.indexOf('מספר דוח');
  const clientSignCol = headers.indexOf('ClientSign');
  const statusCol = headers.indexOf('סטטוס דוח');

  if (reportIdCol === -1) throw new Error('ReportID column not found');
  if (reportCounterCol === -1) throw new Error('ReportCounter column not found');
  if (reportNumberCol === -1) throw new Error('מספר דוח column not found');
  if (clientSignCol === -1) throw new Error('ClientSign column not found');
  if (statusCol === -1) throw new Error('סטטוס דוח column not found');

  const cleanId = String(reportId || '').trim();

  for (let i = 1; i < data.length; i++) {
    const rowReportId = String(data[i][reportIdCol] || '').trim();
    const rowReportCounter = String(data[i][reportCounterCol] || '').trim();
    const rowReportNumber = String(data[i][reportNumberCol] || '').trim();

    if (
      rowReportId === cleanId ||
      rowReportCounter === cleanId ||
      rowReportNumber === cleanId
    ) {
      const row = i + 1;

      sheet.getRange(row, clientSignCol + 1).setValue(signatureData);
      sheet.getRange(row, statusCol + 1).setValue('חתום');

      SpreadsheetApp.flush();

      return true;
    }
  }

  throw new Error('Report not found: ' + reportId);
}
  function formatDateForReport(value) {
  if (!value) return '';
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return Utilities.formatDate(value, 'Asia/Jerusalem', 'dd/MM/yyyy');
  }
  return value;
}

function formatTimeForReport(value) {
  if (!value) return '';
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return Utilities.formatDate(value, 'Asia/Jerusalem', 'HH:mm');
  }
  return value;
}

function saveSignedHtmlFile(reportId) {
  const rootFolderId = '1a6mJvxxFKVqQr8hUjmSZZa5tyQ-nI6Ql';

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('ServiceReports');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const reportIdCol = headers.indexOf('ReportID');
  const reportCounterCol = headers.indexOf('ReportCounter');
  const reportNumberCol = headers.indexOf('מספר דוח');
  const customerCol = headers.indexOf('CustomerID');
  const customerFolderIdCol = headers.indexOf('CustomerFolderId');
  const serviceDateCol = headers.indexOf('תאריך שירות');
  const signedUrlCol = headers.indexOf('SignedHtmlFileUrl');
  const reportDriveFileIdCol = headers.indexOf('ReportDriveFileId');

  if (reportIdCol === -1) throw new Error('עמודת ReportID לא נמצאה');
  if (reportCounterCol === -1) throw new Error('עמודת ReportCounter לא נמצאה');
  if (reportNumberCol === -1) throw new Error('עמודת מספר דוח לא נמצאה');
  if (customerCol === -1) throw new Error('עמודת CustomerID לא נמצאה');
  if (customerFolderIdCol === -1) throw new Error('עמודת CustomerFolderId לא נמצאה');
  if (serviceDateCol === -1) throw new Error('עמודת תאריך שירות לא נמצאה');
  if (signedUrlCol === -1) throw new Error('עמודת SignedHtmlFileUrl לא נמצאה');
  if (reportDriveFileIdCol === -1) throw new Error('עמודת ReportDriveFileId לא נמצאה');

  const cleanId = String(reportId || '').trim();

  for (let i = 1; i < data.length; i++) {
    const rowReportId = String(data[i][reportIdCol] || '').trim();

    if (rowReportId === cleanId) {
      const row = i + 1;

      const customerId = String(data[i][customerCol] || '').trim();
      const customerName = String(getCustomerNameById(customerId) || '').trim();
      const customerFolderName = customerName || customerId || 'Unknown Customer';

      const reportNumber =
        data[i][reportCounterCol] ||
        data[i][reportNumberCol] ||
        reportId;

      const serviceDate = Utilities.formatDate(
        new Date(data[i][serviceDateCol]),
        'Asia/Jerusalem',
        'dd.MM.yyyy'
      );

      const fileName =
        'דוח שירות מס׳ ' +
        reportNumber +
        ' - ' +
        serviceDate +
        ' - ' +
        customerFolderName +
        '.html';

      const reportUrl =
        ScriptApp.getService().getUrl() +
        '?reportId=' +
        encodeURIComponent(rowReportId);

      const htmlContent =
        '<!DOCTYPE html>' +
        '<html><head><meta charset="UTF-8"></head><body>' +
        '<h2>דוח שירות מס׳ ' + reportNumber + '</h2>' +
        '<p><b>מספר דוח:</b> ' + reportNumber + '</p>' +
        '<p><b>תאריך:</b> ' + serviceDate + '</p>' +
        '<p><b>לקוח:</b> ' + customerFolderName + '</p>' +
        '<hr>' +
        '<p><b>קישור לדוח המלא:</b></p>' +
        '<p><a href="' + reportUrl + '">' + reportUrl + '</a></p>' +
        '</body></html>';

      const rootFolder = DriveApp.getFolderById(rootFolderId);

      let customerFolder = null;
      const savedFolderId = String(data[i][customerFolderIdCol] || '').trim();

      if (savedFolderId) {
        try {
          customerFolder = DriveApp.getFolderById(savedFolderId);
        } catch (e) {
          throw new Error(
            'CustomerFolderId קיים אבל התיקייה לא נמצאה בדרייב.\n' +
            'ReportID: ' + rowReportId + '\n' +
            'CustomerID: ' + customerId + '\n' +
            'CustomerFolderId בעייתי: ' + savedFolderId + '\n\n' +
            'מה לסדר: לבדוק את עמודת CustomerFolderId בשורת הדוח ולעדכן ל-ID של תיקיית הלקוח הנכונה.'
          );
        }
      } else {
        const matches = findFoldersByExactName(rootFolder, customerFolderName);

        if (matches.length > 1) {
          throw new Error(
            'נמצאו ' + matches.length + ' תיקיות לקוח עם אותו שם:\n' +
            customerFolderName + '\n\n' +
            'המערכת עצרה כדי לא ליצור כפילות נוספת.\n\n' +
            'מה לסדר: להשאיר תיקיית לקוח אחת נכונה בדרייב, להעביר אליה קבצים חסרים, למחוק/לשנות שם לתיקיות הכפולות, ואז לעדכן CustomerFolderId בשורת הדוח.'
          );
        }

        if (matches.length === 1) {
          customerFolder = matches[0];
        } else {
          customerFolder = rootFolder.createFolder(customerFolderName);
        }

        sheet.getRange(row, customerFolderIdCol + 1)
          .setValue(customerFolder.getId());
      }

      let file = null;
      const savedFileId = String(data[i][reportDriveFileIdCol] || '').trim();

      if (savedFileId) {
        try {
          file = DriveApp.getFileById(savedFileId);
          file.setContent(htmlContent);
          file.setName(fileName);
        } catch (e) {
          throw new Error(
            'ReportDriveFileId קיים אבל הקובץ לא נמצא בדרייב.\n' +
            'ReportID: ' + rowReportId + '\n' +
            'מספר דוח: ' + reportNumber + '\n' +
            'ReportDriveFileId בעייתי: ' + savedFileId + '\n\n' +
            'מה לסדר: לבדוק אם הקובץ נמחק או הועבר, ואז לעדכן/לנקות את ReportDriveFileId בשורת הדוח.'
          );
        }
      } else {
        const existingFiles = customerFolder.getFilesByName(fileName);

        if (existingFiles.hasNext()) {
          file = existingFiles.next();

          if (existingFiles.hasNext()) {
            throw new Error(
              'נמצאו כמה קבצי דוח עם אותו שם:\n' +
              fileName + '\n\n' +
              'המערכת עצרה כדי לא ליצור עותק נוסף.\n\n' +
              'מה לסדר: להשאיר קובץ אחד נכון בתיקיית הלקוח, למחוק כפילויות, ואז לעדכן ReportDriveFileId בשורת הדוח.'
            );
          }

          file.setContent(htmlContent);
        } else {
          file = customerFolder.createFile(
            fileName,
            htmlContent,
            MimeType.HTML
          );
        }

        sheet.getRange(row, reportDriveFileIdCol + 1)
          .setValue(file.getId());
      }

      const fileUrl = file.getUrl();

      sheet.getRange(row, signedUrlCol + 1)
        .setValue(fileUrl);

      SpreadsheetApp.flush();

      return fileUrl;
    }
  }

  throw new Error(
    'הדוח לא נמצא לפי ReportID:\n' +
    cleanId +
    '\n\nמה לסדר: לבדוק שה-ReportID שנשלח מהכפתור/בוט קיים בטבלת ServiceReports.'
  );
}

function findFoldersByExactName(parentFolder, folderName) {
  const result = [];
  const folders = parentFolder.getFolders();

  while (folders.hasNext()) {
    const folder = folders.next();

    if (folder.getName().trim() === String(folderName).trim()) {
      result.push(folder);
    }
  }

  return result;
}

function createReportFile(reportId) {
  return saveSignedHtmlFile(reportId);
}
function onReportGenerated(reportId) {
  return saveSignedHtmlFile(reportId);
}

  function getCustomerNameById(customerId) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Customers_Final');

  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const idCol = headers.indexOf('CustomerID');
  const nameCol = headers.indexOf('שם לקוח');

  if (idCol === -1) throw new Error('CustomerID column not found in Customers_Final');
  if (nameCol === -1) throw new Error('שם לקוח column not found in Customers_Final');

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === String(customerId)) {
      return data[i][nameCol];
    }
  }

  throw new Error('Customer not found: ' + customerId);

}
function findFolderByNameRecursive(parentFolder, folderName) {
  const folders = parentFolder.getFolders();

  while (folders.hasNext()) {
    const folder = folders.next();

    if (folder.getName().trim() === folderName.trim()) {
      return folder;
    }

    const found = findFolderByNameRecursive(folder, folderName);
    if (found) return found;
  }

  return null;
  }
function sendReportEmail(reportId) {
  const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxAWNw2sNbyqMPct9RdHozsVosLhlwXfhZLXsffBlGc-wN_wt-k7ctamTH43eUQmUvbxQ/exec?reportId=';

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('ServiceReports');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const reportCounterCol = headers.indexOf('ReportCounter');
  const sendToEmailsCol = headers.indexOf('SendToEmails');
  const extraEmailCol = headers.indexOf('אימייל נוסף לשליחה');

  if (reportCounterCol === -1) throw new Error('ReportCounter column not found');
  if (sendToEmailsCol === -1) throw new Error('SendToEmails column not found');

  let report = null;

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][reportCounterCol]) === String(reportId)) {
      report = data[i];
      break;
    }
  }

  if (!report) throw new Error('Report not found: ' + reportId);

  let emailsText = String(report[sendToEmailsCol] || '');

  
const emails = String(emailsText || '')
  .split(',')
  .map(function(e) {
    return e.trim();
  })
  .filter(function(e) {
    return e;
  });
  if (emails.length === 0) {
    throw new Error('No email address selected');
  }

  const reportUrl = WEB_APP_URL + encodeURIComponent(reportId);

  const subject = 'דוח שירות - ' + reportId;

  const body =
    'שלום,\n\n' +
    'מצורף קישור לדוח השירות:\n\n' +
    reportUrl + '\n\n' +
    'אנו מודים על שיתוף הפעולה';

  GmailApp.sendEmail(emails.join(','), subject, body);

  return HtmlService.createHtmlOutput('המייל נשלח בהצלחה');
}
  function testMail() {
  GmailApp.sendEmail(
    "liad0992@gmail.com",
    "בדיקת מייל",
    "השליחה עובדת"
  );

  return HtmlService.createHtmlOutput("נשלח");
}
/*
function createReportFile(reportId) {
  return saveSignedHtmlFile(reportId);
}
*/
function testRootFolder() {
  const rootFolderId = '1a6mJvxxFKVqQr8hUjmSZZa5tyQ-nI6Ql';
  const folder = DriveApp.getFolderById(rootFolderId);
  Logger.log(folder.getName());
}
function assignReportCounter(reportId) {

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {

    const cleanId = String(reportId || '').trim();

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName('ServiceReports');

    const data = sheet.getDataRange().getValues();
    const headers = data[0];

    const reportIdCol = headers.indexOf('ReportID');
    const counterCol = headers.indexOf('ReportCounter');
    const numberCol = headers.indexOf('מספר דוח');

    for (let i = 1; i < data.length; i++) {

      const currentId =
        String(data[i][reportIdCol] || '').trim();

      if (currentId === cleanId) {

        const row = i + 1;

        if (data[i][counterCol]) {
          return data[i][counterCol];
        }

        let maxCounter = 5801;

        for (let j = 1; j < data.length; j++) {

          const n = Number(data[j][counterCol]);

          if (!isNaN(n) && n > maxCounter) {
            maxCounter = n;
          }
        }

        const newCounter = maxCounter + 1;

        sheet.getRange(
          row,
          counterCol + 1
        ).setValue(newCounter);

        sheet.getRange(
          row,
          numberCol + 1
        ).setValue(newCounter);

        SpreadsheetApp.flush();

          saveSignedHtmlFile(reportId);

         return newCounter;
      }
    }

    throw new Error(
      'ReportID not found: ' + cleanId
    );

  } finally {

    lock.releaseLock();

  }
}
function debugLastReports() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('ServiceReports');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const reportIdCol = headers.indexOf('ReportID');
  const counterCol = headers.indexOf('ReportCounter');
  const numberCol = headers.indexOf('מספר דוח');

  let out = '';
  out += 'Spreadsheet ID: ' + SPREADSHEET_ID + '<br>';
  out += 'Sheet name: ' + sheet.getName() + '<br>';
  out += 'Last row: ' + sheet.getLastRow() + '<br>';
  out += 'ReportID col: ' + reportIdCol + '<br>';
  out += 'ReportCounter col: ' + counterCol + '<br>';
  out += 'מספר דוח col: ' + numberCol + '<br><br>';

  for (let i = Math.max(1, data.length - 10); i < data.length; i++) {
    out += 'Row ' + (i + 1) +
      ' | ReportID=' + data[i][reportIdCol] +
      ' | ReportCounter=' + data[i][counterCol] +
      ' | מספר דוח=' + data[i][numberCol] +
      '<br>';
  }

  return out;
}
function servePublicReport(ReportID, token) {
  const PUBLIC_TOKEN = 'talcomp_2026_reports_secret';

  if (token !== PUBLIC_TOKEN) {
    return HtmlService.createHtmlOutput('Unauthorized');
  }

  const cleanId = String(ReportID || '').trim();

  const template = HtmlService.createTemplateFromFile('Report');
  template.reportId = cleanId;
  template.preloadedDataJson = JSON.stringify(getReportData(cleanId) || {});

  return template
    .evaluate()
    .setTitle('דוח שירות')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

