const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware to use body-parser and passport
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// creating connection to database
const dbURI = 'mongodb+srv://mzubairtariq1:siqAbkJ2V9axxE3a@ubicluster.fixyzrq.mongodb.net/';

mongoose.connect(dbURI)
    .then(() => console.log('Backend is connected to database'))
    .catch(err => console.error('Database connection error', err));

// setting Routes
app.use('/api', authRoutes);

// Starting the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`backend started on port ${PORT}`);
});
