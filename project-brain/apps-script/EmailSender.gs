function sendReportEmail(reportId) {
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

if (extraEmailCol !== -1 && report[extraEmailCol]) {
  emailsText += ',' + String(report[extraEmailCol]);
}
  const emails = emailsText
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

  const reportUrl = "https://script.google.com/macros/s/AKfycbxAWNw2sNbyqMPct9RdHozsVosLhlwXfhZLXsffBlGc-wN_wt-k7ctamTH43eUQmUvbxQ/exec?reportId=" + encodeURIComponent(reportId) + "&v=3";

  const subject = 'דוח שירות - ' + reportId;

  const body =
    'שלום,\n\n' +
    'מצורף קישור לדוח השירות:\n\n' +
    reportUrl + '\n\n' +
    'אנו מודים על שיתוף הפעולה';

  GmailApp.sendEmail(emails.join(','), subject, body);

  return HtmlService.createHtmlOutput('המייל נשלח בהצלחה');
}
