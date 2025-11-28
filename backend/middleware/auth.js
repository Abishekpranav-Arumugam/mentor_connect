// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization') || '';
  const parts = authHeader.split(' ');
  const token = parts.length === 2 && /^Bearer$/i.test(parts[0]) ? parts[1] : authHeader;

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // normalized: { id: ... }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
