//jshint esversion:6

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require("https");
const fs = require('fs');
const moment = require('moment');
const apikey = fs.readFileSync(__dirname + '/apikey.txt', 'utf-8', (err, data) => {
                  if (err) throw err;
                  console.log(data);});

function convertToF(celsius) {
  let fahrenheit = celsius * 9 / 5 + 32;
  return fahrenheit;
}

function convertToK(celsius) {
  let kelvin = celsius + 273;
  return kelvin;
}


module.exports.weatherInfo = (req, res, city) => {
  let URL = "https://api.openweathermap.org/data/2.5/find?q=" + city + "&units=metric&appid=" + apikey;
  let hourlyURL = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=" + city + "&units=metric&appid=" + apikey;
  let dailyURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&units=metric&cnt=7&appid=" + apikey;


  /*getting the date*/

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;


  let cityName = "";

  /*getting the date*/


  /*current data*/

  let weatherData = "";
  let temperature = "";
  let description = "";
  let icon = "";
  let fahrenheitTemp;
  let kelvinTemp;

  /*current data*/


  /*hourly data*/

  let hourlyList = [];
  let hourlyIcon = [];
  let hourlyTemperature = [];

  /*hourly data*/


  /*daily data*/

  let dailyList = [];
  let dailyIcon = [];
  let dailyTemperature = [];

  /*daily data*/



  console.log(URL);

  https.get(URL, function(response) {
    console.log(response.statusCode);
    let chunks = "";


    response.on("data", function(data) {
      chunks += data;
    });

    response.on("end", function() {
      let weatherData = JSON.parse(chunks);
      try {
        cityName = weatherData.list[0].name;
        temperature = weatherData.list[0].main.temp;
        description = weatherData.list[0].weather[0].description;
        icon = "http://openweathermap.org/img/wn/" + weatherData.list[0].weather[0].icon + "@2x.png";
        fahrenheitTemp = Math.ceil(convertToF(weatherData.list[0].main.temp));
        kelvinTemp = Math.ceil(convertToK(weatherData.list[0].main.temp));
      } catch (e) {
        res.render("error.ejs");
      }

    });

  });

  https.get(hourlyURL, function(response) {
    console.log(response.statusCode);
    let chunks = "";


    response.on("data", function(data) {
      chunks += data;
    });

    response.on("end", function() {
      let weatherData = JSON.parse(chunks);
      for (let i = 0; i < 24; i++) {
        try {
          let hour = weatherData.list[i].dt_txt;
          let temp = weatherData.list[i].main.temp;
          let icon = "http://openweathermap.org/img/wn/" + weatherData.list[i].weather[0].icon + "@2x.png";
          hourlyList.push(hour);
          hourlyIcon.push(icon);
          hourlyTemperature.push(temp);
        } catch (err) {
          break;
        }
      }

    });

  });


  https.get(dailyURL, (response) =>{
    console.log(response.statusCode);
    let chunks = "";

    response.on("data", function(data) {
      chunks += data;
    });


    response.on("end", function(){
      let weatherData = JSON.parse(chunks);
      for (let i = 0; i < weatherData.cnt; i++){
        let date = moment.unix(weatherData.list[i].dt).format("MM-DD-YYYY");
        let temp = weatherData.list[i].temp.max;
        let icon = "http://openweathermap.org/img/wn/" + weatherData.list[i].weather[0].icon + "@2x.png";
        dailyList.push(date);
        dailyIcon.push(icon);
        dailyTemperature.push(temp);
      }
    });
  });


  setTimeout(function() {
    res.render("index.ejs", {
      cityName: cityName,
      temperature: temperature,
      fahrenheit: fahrenheitTemp,
      kelvin: kelvinTemp,
      date: today,
      description: description,
      icon: icon,

      hourlyList: hourlyList,
      hourlyTemperature: hourlyTemperature,
      hourlyIcon: hourlyIcon,

      dailyList : dailyList,
      dailyIcon : dailyIcon,
      dailyTemperature : dailyTemperature


    });
  }, 4000);
};
