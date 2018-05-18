const passport=require('passport');
const mongoose=require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User=mongoose.model('users');
const keys=require('../config/keys'); 
passport.serializeUser(function(user, done) {
    done(null, user.id); 
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});




passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleSecret,
    callbackURL: "/auth/google/callback",
    proxy:"true"
  },(accessToken, refreshToken, profile, done)=> {
  	User.findOne({googleId:profile.id}).then(existingUser=>{
  		if(existingUser){
  			done(null,existingUser);
  		}else{
			new User({googleId:profile.id}).save().then(user=>{
				done(null,user);
			});
  		}
  	})
  }
));