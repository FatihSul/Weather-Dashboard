var inputBox = document.querySelector(".city-name-input");
var searchButton = document.querySelector(".search-button");
var currentDay = document.querySelector(".current-day")
var API_KEY = "e9adc8be1d83b270712a9d75850eed96"
var currentTemp = document.querySelector(".current-temp")
var currentWind = document.querySelector(".current-wind")
var currentHumidity = document.querySelector(".current-humidity")
var currentUv = document.querySelector(".current-uv")


function getCurrentWeatherData(){
    var cityName = inputBox.value;
    console.log(cityName)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        currentTemp.innerText = data.main.temp
        currentWind.innerText = data.wind.speed
        currentHumidity.innerText = data.main.humidity
        currentUv.innerText = data
    });

}




















searchButton.addEventListener("click", getCurrentWeatherData)


// e9adc8be1d83b270712a9d75850eed96

// https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}


// take lat&long to get uv https://api.openweathermap.org/data/2.5/onecall?lat=51.5085&lon=-0.1257&exclude=minutely,hourly,alerts&appid={}&units=metric
