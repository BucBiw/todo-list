const passport = require('passport');
const jwt = require('jsonwebtoken');
const FacebookStrategy = require('passport-facebook').Strategy

const User = require('../models/user.model');

const facebookPassportConfig = () => {
    return passport.use(
        new FacebookStrategy(
            {
                clientID: '895031030904400',
                clientSecret: '7c4cad79db29be5a8dac1ea6d19e26f9',
                callbackURL: 'http://localhost:5000/auth/facebook/callback',
                profileFields: ['id', 'displayName', 'name'],
                passReqToCallback: true,
            },
            async (req, accessToken, refreshToken, profile, done) => {
                try {
                    if (profile) {
                        req.user;
                        done(null, profile);
                    }
                } catch (error) {
                    done(error);
                }
            }
        )
    );
}

module.exports = facebookPassportConfig;