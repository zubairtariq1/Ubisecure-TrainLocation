const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: String, // OAuth2.0 Google ID
    username: String,
    email: String,
    password: String, // Hashed password
});

module.exports = mongoose.model('User', userSchema);
