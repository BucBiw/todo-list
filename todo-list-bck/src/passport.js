const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy

const appID = '2107368362741206';
const appSecret = '99b8421e4a3bfaa301f55941b20f200d';

const facebookPassportConfig = (port) => {
    return passport.use(
        new FacebookStrategy(
            {
                clientID: appID,
                clientSecret: appSecret,
                callbackURL: `http://localhost:${port}/signin/facebook/callback`,
                profileFields: ['id', 'displayName', 'name', 'email'],
                passReqToCallback: true
            },
            (req, accessToken, refreshToken, profile, done) => {
                try {
                    if(profile){
                        req.user = profile;
                        done(null, profile);
                    }
                } catch (error) {
                    done(error);
                }
            }
        )
    );
}

module.exports = {
    facebookPassportConfig
}