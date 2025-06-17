// googleAuth.js
const { google } = require("googleapis");
const clientId =
  "";
const clientSecret = "";
const oauth2Client = new google.auth.OAuth2(
  //   process.env.GOOGLE_CLIENT_ID,
  //   process.env.GOOGLE_CLIENT_SECRET,
  clientId,
  clientSecret,
  "http://localhost:3000/auth/google/callback"
);

const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];

function getAuthURL() {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
}

async function getTokens(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

function setCredentials(tokens) {
  oauth2Client.setCredentials(tokens);
}
module.exports = { getAuthURL, getTokens, oauth2Client };
