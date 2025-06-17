// middleware/roleMiddleware.js
function authorizeRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user) return res.sendStatus(401);  // No auth
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}

module.exports = authorizeRole;
