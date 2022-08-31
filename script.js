var inputBox = document.querySelector(".city-name-input");
var searchButton = document.querySelector(".search-button");
var currentDay = document.querySelector(".current-day")
var API_KEY = "d91f911bcf2c0f925fb6535547a5ddc9"
var currentDate = document.querySelector(".current-date")
var currentImage = document.querySelector(".current-image")
var currentTemp = document.querySelector(".current-temp")
var currentWind = document.querySelector(".current-wind")
var currentHumidity = document.querySelector(".current-humidity")
var currentUv = document.querySelector(".current-uv")
var cardDeck = document.querySelector(".card-deck")

function getCurrentWeatherData(){
    var cityName = inputBox.value;
    console.log(cityName)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        currentDate.innerText = `${cityName} ${timeConvert(data.dt)}`
        currentImage.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
        currentTemp.innerText = `${data.main.temp} °F`
        currentWind.innerText = `${data.wind.speed} MPH`
        currentHumidity.innerText = `${data.main.humidity} %`
        futureForcast(data.coord.lat, data.coord.lon);
    });

}

function futureForcast(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
    console.log(data)
    showWeather(data);
    })
    
}

function showWeather(data){
    cardDeck.innerHTML = ""
    currentUv.innerText = `UV index: ${data.daily[0].uvi}`

    for (let i = 1; i < 6; i++) {
        var cardContainer = document.createElement("div")
        var cardDate = document.createElement("h5")
        var cardImage = document.createElement("img")
        var cardTemp = document.createElement("p")
        var cardWind = document.createElement("p")
        var cardHumidity = document.createElement("p")

        cardDate.textContent = `Date: ${timeConvert(data.daily[i].dt)}`
        cardImage.src = `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`
        cardTemp.textContent = `Temp: ${data.daily[i].temp.day} °F`
        cardWind.textContent = `Wind speed: ${data.daily[i].wind_speed} MPH`
        cardHumidity.textContent = `Humidity: ${data.daily[i].humidity} %`

        cardContainer.classList.add("card", "card-body")

        cardContainer.append(cardDate, cardImage, cardTemp, cardWind, cardHumidity)
        cardDeck.append(cardContainer)

    }
}

function timeConvert(date){
    return new Date(date*1000).toLocaleDateString("en-US");
}


function searchHistory(){
    var searchInput = document.getElementById(inputBox).value;

    localStorage.setItem(searchInput);

    console.log(localStorage)
}


















searchButton.addEventListener("click", getCurrentWeatherData)


// e9adc8be1d83b270712a9d75850eed96

// https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}


// take lat&long to get uv https://api.openweathermap.org/data/2.5/onecall?lat=51.5085&lon=-0.1257&exclude=minutely,hourly,alerts&appid={}&units=metric
