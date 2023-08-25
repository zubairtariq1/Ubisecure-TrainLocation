const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile');
    }
);

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', userController.getUserProfile);

module.exports = router;
