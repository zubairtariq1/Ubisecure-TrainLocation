const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

require('dotenv').config();

const googleClientID = process.env.GOOGLE_CLIENTID;
const googleClientSecret = process.env.GOOGLE_CLIENTSEC;

passport.use(
    new GoogleStrategy(
        {
            clientID: googleClientID,
            clientSecret: googleClientSecret,
            callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if the user already exists in your database
                const existingUser = await User.findOne({ googleId: profile.id });

                if (existingUser) {
                    // If user exists, return the user
                    done(null, existingUser);
                } else {
                    // If user doesn't exist, create a new user
                    const newUser = new User({
                        googleId: profile.id,
                        username: profile.displayName,
                        email: profile.emails[0].value,
                    });

                    await newUser.save();
                    done(null, newUser);
                }
            } catch (error) {
                done(error, false);
            }
        }
    )
);
