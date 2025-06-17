
const { google } = require("googleapis");

const auth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
auth.setCredentials({ access_token: userAccessToken });

const analyticsAdmin = google.analyticsadmin({ version: "v1beta", auth });

const result = await analyticsAdmin.accounts.list();
const accountId = result.data.accounts?.[0]?.name; // "accounts/1234"

const properties = await analyticsAdmin.properties.list({ parent: accountId });
properties.data.properties.forEach((prop) => {
  console.log(prop.name); // "properties/123456789"
  console.log(prop.displayName); // Friendly name of the property
});