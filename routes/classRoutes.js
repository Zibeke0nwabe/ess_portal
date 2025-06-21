const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const { verifyAdmin } = require('../middleware/auth');

// Create a new class (only teacher/admin)
router.post('/create', verifyAdmin, async (req, res) => {
  try {
    const newClass = new Class({
      title: req.body.title,
      subject: req.body.subject,
      teacher: req.user.id,
    });
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all live classes (for students)
router.get('/live', async (req, res) => {
  try {
    const liveClasses = await Class.find({ isLive: true }).populate('teacher', 'username');
    res.status(200).json(liveClasses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
