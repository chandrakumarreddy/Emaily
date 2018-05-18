const express=require('express');
const app=express();

app.get('',(req,res)=>{
	res.send('index page');
});

app.listen(process.env.PORT || 5000,(err,res)=>{
	if(err){
		console.log('error');
	}else{
		console.log('connected');
	}
});