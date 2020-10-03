import passport from 'passport'; 
import { Strategy as FBStrategy, StrategyOptionWithRequest as FBStrategyOptionWithRequest } from 'passport-facebook';

import { AppRequest } from '../Types/index';

const {FACEBOOK_APP_ID, FACEBOOK_APP_SECRET} = process.env

const FBConfig: FBStrategyOptionWithRequest = {
  clientID: FACEBOOK_APP_ID!,
  clientSecret: FACEBOOK_APP_SECRET!,
  callbackURL: 'http://localhost:4000/auth/facebook/callback',
  passReqToCallback: true
}

export const PassportFB = () =>
  passport.use(
    new FBStrategy(FBConfig, (req, _, __, profile, done) => {
      try {
        if (profile) {
          const request = req as AppRequest
          request.userProfile = profile
          done(null, profile)
        }
      } catch (error) {
        done(error)
      }
    })
  );