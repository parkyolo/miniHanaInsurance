// const express = require("express");
// const server = express();

// server.use(express.static(__dirname + "/script"));

// server.use((req, res, next) => {
//   //config
//   res.setHeader('Content-Type', 'text/javascript');
//   next();
// });

// server.get("/", (req, res) => {
//   res.status(200).sendFile(__dirname + "/signup.html");
// });

// server.listen(3000, () => {
//   console.log("The server is running on Port 3000");
// });


// var fs=require('fs');
// var express=require('express');
// var app=express();
// var http=require('http');

// app.use('/miniHanaInsurance/src/script/signupPage',express.static(__dirname+'/miniHanaInsurance/src/script/signupPage'))
// var server=http.createServer(app).listen(3000,function(){
//   console.log("server is running")
// });


// app.get('/', function(req,res){
//  fs.read
//   fs.readFile('signup.html',function(error,data){
//   res.end(data)
//   })
// })