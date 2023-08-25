const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for initiating Google OAuth2 authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after successful Google OAuth2 authentication
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile'); // Redirect to profile page
    }
);

// Route for user registration via registration form
router.post('/register', userController.registerUser);

module.exports = router;
