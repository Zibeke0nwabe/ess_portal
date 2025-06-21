const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(verified.id);
    if (!admin) throw new Error();
    req.user = admin;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = { verifyAdmin };
