const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const classRoutes = require('./routes/classRoutes');
const authRoutes = require('./routes/authRoutes'); 

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine and views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Mongo Error:', err));

// Routes for logged users
app.use('/api/classes', classRoutes);
app.use('/', authRoutes); 

//No login needed to this routes
app.get('/', (req, res) => {
  res.render('index'); 
});
app.get('/universities', (req, res) => {
  res.render('universities'); 
});
app.get('/news', (req, res) => {
  res.render('news');
});

app.get('/bursaries', (req, res) => {
  res.render('bursaries');
});

app.get('/management', (req, res) => {
  res.render('management');
});

app.get('/live-classes', (req, res) => {
  res.render('live-classes');
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

