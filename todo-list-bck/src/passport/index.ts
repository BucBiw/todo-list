import passport from 'passport'; 
import { Strategy as FBStrategy, StrategyOptionWithRequest as StrategyOptionWithRequest } from 'passport-facebook';

const {FACEBOOK_APP_ID, FACEBOOK_APP_SECRET} = process.env

// const PassportFB = () => {
//   passport.use(
//     new FBStrategy({
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: 'http://localhost:4000/auth/facebook/callback',
//       passReqToCallback: true
//     }, (req, _, __, profile, done) => {
//         try {
//           if (profile) {
//             req.userProfile = profile;
//             done(null, profile);
//           }
//         } catch (error) {
//           done(error);
//         }
//     })
// );
// }