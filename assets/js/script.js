//queryselectors
var button = document.querySelector(".submit");
var searchForm = document.querySelector(".input");
const cityName = document.getElementById("city");
const currentTemp = document.getElementById("tempature");
const currentHumid = document.getElementById("humidity");
const currentWind = document.getElementById("wind");
const uvIndex = document.getElementById("UV");
const APIkey = "857149e6cd5b985d6fcc9a8538c6a607";
var fiveForecast = document.getElementById("5Day");
var todayForecast = document.getElementById("today-weather");
var cTemp = "";
var cHumid = "";
var cWind = "";

button.addEventListener("click", function(response){
//function containing the fetch from API
fetch("https://api.openweathermap.org/data/2.5/weather?q=" +searchForm.value+ "&appid=" + APIkey)
    .then(Response => Response.json())
    .then(data => {
    //store data in variables
    //var city = response.data.name[""];
    cTemp = data["main"]["temp"];
    cHumid = data["main"]["humidity"];
    cWind = data["wind"]["speed"];
    cityName.innerText = city;
    currentTemp.innerText = cTemp;
    currentHumid.innerText = cHumid;
    currentWind.innerText = cWind;
    })
})
