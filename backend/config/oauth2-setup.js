const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
    new GoogleStrategy(
        {
            clientID: '1072502706776-7q2svvrdqqi98ibcvng3tb3jfnr23gk0.apps.googleusercontent.com',
            clientSecret: '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',
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
