// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const analyticsRoutes = require("./routes/analytics");
const { getAuthURL, getTokens } = require("./services/googleAuth");

dotenv.config(); // Load configuration (e.g., Mongo URI, JWT secret)
const app = express();
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/analytics-app")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB connection error:", err));
// (Use 127.0.0.1 instead of localhost to avoid IPv6 issues:contentReference[oaicite:0]{index=0})

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);

// Initiate Google OAuth2 flow
app.get("/auth/google", (req, res) => {
  const url = getAuthURL();
  console.log("Redirecting to Google OAuth2 URL:", url);
  res.redirect(url);
});

// Google OAuth2 callback
app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;
  try {
    console.log("Received OAuth2 code:", code);
    const tokens = await getTokens(code);
    console.log("Tokens retrieved successfully:", tokens);
     

    // res.redirect("/analytics");
    res.status(200).send("Authentication successful, tokens retrieved.");
  } catch (error) {
    console.error("Error retrieving tokens:", error);
    res.status(500).send("Authentication failed");
  }
});

app.get("/auth/google", (req, res) => {
  const url = getAuthURL();
  res.redirect(url);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
