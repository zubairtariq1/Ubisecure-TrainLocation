const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

const app = express();

//requiring passport configs
require('./config/oauth2-setup');

// Middleware to use body-parser and passport
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(passport.initialize());
app.use(cors());

// configuring and creating connection to database

require('dotenv').config();

const dbUserName = process.env.MONGODB_USERNAME
const dbPassword = process.env.MONGODB_PASSWORD
const dbCluster = process.env.MONGODB_CLUSTER

const dbURI = `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}.mongodb.net/`;

mongoose.connect(dbURI)
    .then(() => console.log('Backend is connected to database'))
    .catch(err => console.error('Database connection error', err));

// setting Routes
app.use('/api/auth', authRoutes);

// Starting the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`backend started on port ${PORT}`);
});
