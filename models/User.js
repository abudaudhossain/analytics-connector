// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },        // Store a bcrypt hash
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  websites: [String]  // e.g. list of website IDs or Analytics property IDs
});

module.exports = mongoose.model('User', userSchema);
