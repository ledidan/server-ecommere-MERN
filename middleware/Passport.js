const User = require("../models/UserModel");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CLIENT_ID =
  "765367477045-7m3jo7bsvkrf0bianke1u242p7htpeb3.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

// ------- GOOGLE AUTH ---------
const googleAuth = passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our db
      User.findOrCreate(
        {
          name: profile.displayName,
          googleId: profile.id,
        },
        (err, user) => {
          return done(err, user);
        }
      );
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = googleAuth;
