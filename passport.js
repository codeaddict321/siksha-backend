const passport = require('passport');
const PassportUser = require('./models/passportUser');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
    // Store the user's ID in the session
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        // Retrieve user data based on the stored ID
        const user = await PassportUser.findById(id);
       if(user){
       
        done(null,user)
       }
        
    } catch (err) {
        done(err);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if the user already exists in your database
        const existingUser = await PassportUser.findOne({ googleId: profile.id });

        if (existingUser) {
            // User already exists, return the existing user
            console.log('user existed');
            done(null, existingUser);
        } else {
            // User doesn't exist, so create a new user
            const newUser = new PassportUser({
                googleId: profile.id,
                
                // Add other user data as needed
            });

            await newUser.save();
            
            // User created successfully, return the new user
            console.log('user created');
            done(null, newUser);
        }
    } catch (err) {
        done(err);
    }
}));
