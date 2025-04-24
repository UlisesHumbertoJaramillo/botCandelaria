//En este archivo se implementa la conexión con google Sheets y sus métodos

//https://docs.google.com/spreadsheets/d/1jz4q34y50cKkQNrW-vx2ALuHBoNaGJlAAAbAO62idrk/edit?gid=0#gid=0

//1jz4q34y50cKkQNrW-vx2ALuHBoNaGJlAAAbAO62idrk

import { google } from "googleapis";

// Initializes the Google APIs client library and sets up the authentication using service account credentials.
const auth = new google.auth.GoogleAuth({
  keyFile: "./services/googleSheets/google.json", // Path to your service account key file.
  scopes: ["https://www.googleapis.com/auth/spreadsheets"], // Scope for Google Sheets API.
});

const spreadsheetId = "1jz4q34y50cKkQNrW-vx2ALuHBoNaGJlAAAbAO62idrk";

// Asynchronous function to append data to a Google Sheet.
export async function writeToSheet(values) {
  const sheets = google.sheets({ version: "v4", auth }); // Creates a Sheets API client instance.
  const spreadsheetId = "1jz4q34y50cKkQNrW-vx2ALuHBoNaGJlAAAbAO62idrk"; // The ID of the spreadsheet.
  const range = "Turnos"; // The sheet name where data will be appended.
  const valueInputOption = "USER_ENTERED"; // How input data should be interpreted.

  const resource = { values }; // The data to be written.

  try {
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      insertDataOption: "INSERT_ROWS", // Inserts rows at the end of the table.
      resource,
    });
    //console.log(res.data.updates.updatedRange); // Logs the updated range.
    return res; // Returns the response from the Sheets API.
  } catch (error) {
    console.error("Error al agregar datos al sheet:", error); // Logs errors.
  }
}

// Asynchronous function to read data from a Google Sheet.
export async function readSheet() {
  const sheets = google.sheets({ version: "v4", auth });
  const range = "Turnos!A1:E10"; // Specifies the range to read.

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const rows = response.data.values; // Extracts the rows from the response.
    return rows; // Returns the rows.
  } catch (error) {
    console.error("error", error); // Logs errors.
  }
}
