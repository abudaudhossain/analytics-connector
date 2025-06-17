// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.sendStatus(401); // No token provided
  }
  const token = authHeader.split(' ')[1];  // Expected format "Bearer <token>"
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    // Verify token and extract payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');
    req.user = decoded;  // attach { id, role, ... } to request
    next();
  } catch (err) {
    return res.sendStatus(403); // Invalid token
  }
}

module.exports = authenticateJWT;
