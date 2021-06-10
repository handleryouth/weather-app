//jshint esversion:6
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require("https");
const weather = require(__dirname + "/getWeather.js");


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.set('view engine', 'ejs');
app.engine('html', require("ejs").renderFile);

app.get('/', function(req, res){
  city = "jakarta";
  weather.weatherInfo(req,res, city);
});


app.post("/", function(req,res){
  city = req.body.customCity;
  weather.weatherInfo(req, res, city);
});


app.listen(process.env.PORT || 3000, function() {
  console.log("the server is up and running at 3000");
});
