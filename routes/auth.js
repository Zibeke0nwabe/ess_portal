const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Applicant = require('../models/Applicant');

// GET Login Page
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// POST Login
router.post('/login', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    if (role === 'admin') {
      const admin = await Admin.findOne({ username, password });
      if (!admin) return res.render('login', { error: 'Invalid Admin credentials' });

      req.session.user = { role: 'admin', id: admin._id };
      return res.redirect('/class/dashboard');
    } else if (role === 'student') {
      const student = await Applicant.findOne({ email: username, password });
      if (!student) return res.render('login', { error: 'Invalid Student credentials' });

      req.session.user = { role: 'student', id: student._id, name: student.name };
      return res.redirect('/class/available');
    }

    return res.render('login', { error: 'Invalid role selected' });
  } catch (err) {
    console.error(err);
    res.render('login', { error: 'Something went wrong' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
