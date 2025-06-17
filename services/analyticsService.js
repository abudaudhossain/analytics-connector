// (Pseudo-code for Google Analytics integration)
const { BetaAnalyticsDataClient } = require("@google-analytics/data");
const path = require("path");
require("dotenv").config();
// process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(
//   "./client_secret.json"
// ); // Ensure this points to your service account key file
// const analyticsDataClient = new BetaAnalyticsDataClient(); // uses GOOGLE_APPLICATION_CREDENTIALS

// async function getUserAnalytics() {
//  try {
//    // Determine GA property ID(s) for the user's websites, e.g. from DB
//    const propertyId = '313673321';  // This would be looked up per user
//   //  const propertyId = 'GA4_PROPERTY_ID_FOR_USER';  // This would be looked up per user
//    // Query GA for some metrics (e.g. activeUsers in the last 30 days)
//    const [response] = await analyticsDataClient.runReport({
//      property: `properties/${propertyId}`,
//      dateRanges: [{ startDate: '2025-05-01', endDate: 'today' }],
//      metrics: [{ name: 'activeUsers' }],
//      dimensions: [{ name: 'city' }]
//    });
//    return response.rows;
//  } catch (error) {
//    console.error('Error fetching user analytics:', error);
//    throw new Error('Failed to fetch user analytics');

//  }
// }

// const key = require("../client_secret.json");

const credentials = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY,
};
// console.log("Credentials:", credentials);

async function getUserAnalytics(tokens, propertyId) {
  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: credentials,
  });

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/440755280`,
      dateRanges: [
        {
          startDate: "2024-05-01",
          endDate: "today",
        },
      ],
      dimensions: [
        { name: "eventName" },
        { name: "city" },
      ],
      metrics: [
        { name: "activeUsers" },
        { name: "totalUsers" },
        { name: "eventCount" },
        { name: "screenPageViews" },
      ],
    });

    return response.rows;
  } catch (error) {
    console.error("Error fetching user analytics:", error);
    throw new Error("Failed to fetch user analytics");
  }
}

module.exports = {
  getUserAnalytics,
};
