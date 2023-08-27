const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController'); // Update path as needed
const router = express.Router();

// Use the registerOrLogin function for user registration and login
router.post('/registerOrLogin', userController.registerOrLogin);

// OAuth2.0 Google authentication route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// OAuth2.0 Google authentication callback route
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    // Redirect or handle authentication callback
    // For example, you can redirect to a success page or send a JWT token
    res.redirect('/profile');
});

module.exports = router;
