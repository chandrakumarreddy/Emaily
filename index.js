const express=require('express');
const mongoose=require('mongoose');
const cookieSession = require('cookie-session');
const passport=require('passport');
require('./models/User');
require('./services/passport');
const keys=require('./config/keys');
const app=express();
mongoose.connect(keys.monogoClient);

app.use(cookieSession({
  keys: [keys.cookie_key],
  maxAge: 30 * 24 * 60 * 60 * 1000 
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{
	res.send('index page');
});

require('./routes/authRoutes')(app);

app.listen(process.env.PORT || 5000,(err,res)=>{
	if(err){
		console.log('error');
	}else{
		console.log('connected');
	}
});