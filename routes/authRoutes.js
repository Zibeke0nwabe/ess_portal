const express = require('express');
const router = express.Router();

// Render student login page
router.get('/login', (req, res) => {
  res.render('login'); 
});

// Render teacher login page
router.get('/teacher-login', (req, res) => {
  res.render('teacher-login');  
});


router.post('/login', (req, res) => {
  const { email, password } = req.body;
  res.redirect('/');
});

// Handle teacher login POST
router.post('/teacher-login', (req, res) => {
  const { username, password } = req.body;

  res.redirect('/');
});

// Logout route (optional)
router.get('/logout', (req, res) => {
 
  res.redirect('/login');
});

module.exports = router;
