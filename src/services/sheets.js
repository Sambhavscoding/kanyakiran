import { google } from "googleapis";

// Header row to put in the first row of the Sheet, in this exact order:
// Timestamp | Full name | Phone | Email | Gender | Story | Consent
export const SHEET_COLUMNS = [
  "Timestamp",
  "Full name",
  "Phone",
  "Email",
  "Gender",
  "Story",
  "Consent",
];

// Spreadsheet "formula injection" guard. If someone's text starts with = + - @ the cell
// could run as a formula when the data is exported to CSV and opened in Excel.
// A leading apostrophe makes it plain text. (We write with RAW mode too, so Google Sheets
// itself never evaluates formulas.)
export function sanitizeCell(value) {
  const text = String(value ?? "");
  return /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
}

// Turns the validated form data into one row (an array), matching SHEET_COLUMNS
export function buildRow(data, now = new Date()) {
  return [
    now.toISOString(),
    sanitizeCell(data.fullName),
    data.phone, // already validated to digits and an optional leading +
    data.email, // already validated as an email
    data.gender,
    sanitizeCell(data.story),
    data.consent ? "Yes" : "No",
  ];
}

function getAuth() {
  const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;
  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    throw new Error("Google credentials are not configured");
  }
  return new google.auth.JWT({
    email: GOOGLE_CLIENT_EMAIL,
    // .env files store the key with literal "\n" text, so turn them back into real newlines
    key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function appendRegistration(data) {
  const { GOOGLE_SHEET_ID, GOOGLE_SHEET_TAB = "Registrations" } = process.env;
  if (!GOOGLE_SHEET_ID) throw new Error("GOOGLE_SHEET_ID is not configured");

  const sheets = google.sheets({ version: "v4", auth: getAuth() });

  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: `${GOOGLE_SHEET_TAB}!A:G`,
    valueInputOption: "RAW", // store text exactly as given; never evaluate formulas
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [buildRow(data)] },
  });
}