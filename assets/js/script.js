//queryselectors
var button = document.querySelector(".submit");
var searchForm = document.querySelector(".input");
const cityName = document.getElementById("city");
const curDate = document.getElementById("date")
const currentTemp = document.getElementById("temp");
const currentHumid = document.getElementById("humidity");
const currentWind = document.getElementById("wind");
const uvIndex = document.getElementById("UV");
const APIkey = "857149e6cd5b985d6fcc9a8538c6a607";
var fiveForecastEl = document.getElementById("fiveday");
var todayForecast = document.getElementById("today-weather");
var currentDisplayEl = document.getElementById("currentweather");
var latitude = "";
var longitude = "";

//format date




//format

button.addEventListener("click", function (response) {
    //function containing the fetch from API
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchForm.value + "&appid=" + APIkey + "&units=imperial")
        .then(Response => Response.json())
        //.then(data => console.log(data))
        .then(data => {
            //store data in variables
            console.log(data);
            //variables for data
            var todayDate = moment().toDate();
            var todayDateFormatted = moment(todayDate).format("MM/DD/YYYY");
            var city = data["name"];
            var cTemp = data["main"]["temp"];
            var cHumid = data["main"]["humidity"];
            var cWind = data["wind"]["speed"];
            var latitude = data["coord"]["lat"];
            var longitude = data["coord"]["lon"];
            //adding data into elements
            cityName.innerText = city + " (" + todayDateFormatted +")";
            curDate.innerText = todayDateFormatted;
            currentTemp.innerText = "Temp " + cTemp;
            currentHumid.innerText = "Humidity " + cHumid + "%";
            currentWind.innerText = "Wind " + cWind + " MPH";
            $(currentDisplayEl).addClass("todayContainer");
            //date
            fivedayAPI(latitude, longitude)
        })

});
var fivedayAPI = function (latitude, longitude) {
    var oneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial" + "&exclude={part}&appid=" + APIkey;
    //fivedayforecast
    fetch(oneCall)
        .then(Response => Response.json())
        //.then(data=>console.log(data))
        .then(data => {
            //variables for data from onecall
            console.log(data);
            fivedayForecast(data);
        });

}

var fivedayForecast = function (data) {

    for (var i = 1; i < 6; i++) {
        //date and variables [i] = day
        //var date variables and formatting
        var todayDate = moment().toDate();
        var nextDay = moment(todayDate).add([i], "days");
        var nextDayFormatted = moment(nextDay).format("MM/DD/YYYY");
        //forecast variables
        var foreDay = data.daily[i];
        //console.log(foreDay);
        var foreTemp = data.daily[i].temp.day;
        //console.log(foreTemp);
        var foreHumid = data.daily[i].humidity;
        //console.log(foreHumid);
        var foreWind = data.daily[i].wind_speed;

        //create elements to store each individual variable

        var createDivEl = document.createElement("div")
        var createDateEl = document.createElement("h4")
        var createimageEl = document.createElement("img")
        var createTempEl = document.createElement("p")
        var createHumidEl = document.createElement("p")
        var createWindEl = document.createElement("p")
        
        
        //make elements children of row
        fiveForecastEl.appendChild(createDivEl);
        createDivEl.appendChild (createimageEl);
        createDivEl.appendChild(createDateEl);
        createDivEl.appendChild(createTempEl);
        createDivEl.appendChild(createHumidEl);
        createDivEl.appendChild(createWindEl);
        //apply the data to the elements
        createDateEl.innerText = nextDayFormatted;
        //degrees?
        createTempEl.innerText = "Temp " + foreTemp ;
        createHumidEl.innerText = "Humidity " + foreHumid + "%";
        createWindEl.innerText = foreWind + " MPH";
        createimageEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png");

        //add bulma API styling
        $(createDivEl).addClass("column card");
        $(createDateEl).addClass("card-header ");
        $(createTempEl).addClass("card-content");
        $(createHumidEl).addClass("card-content");
        $(createWindEl).addClass("card-content");
    }
}

