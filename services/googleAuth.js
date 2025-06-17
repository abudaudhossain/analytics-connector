// googleAuth.js
const { google } = require("googleapis");
require("dotenv").config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const SCOPES = [
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

function getAuthURL() {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });
}

async function getTokens(code) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });
  const userInfo = await oauth2.userinfo.get();
  tokens.userInfo = userInfo.data; 

  // get properties for analytics
  const analytics = google.analytics({
    version: "v3",
    auth: oauth2Client,
  });
  const response = await analytics.management.accounts.list();
  console.log("Analytics accounts:", response.data.items);
  if (response.data.items && response.data.items.length > 0) {
    tokens.analyticsAccounts = response.data.items; // Store analytics accounts
  } else {
    tokens.analyticsAccounts = [];
  }

  console.log("Tokens with user info and analytics accounts:", tokens);
  return tokens;
}

function setCredentials(tokens) {
  oauth2Client.setCredentials(tokens);
}

module.exports = { getAuthURL, getTokens, setCredentials, oauth2Client };
