var inputBox = document.querySelector(".city-name-input");
var searchButton = document.querySelector(".search-button");
var currentDay = document.querySelector(".current-day");
var API_KEY = "d91f911bcf2c0f925fb6535547a5ddc9";
var currentDate = document.querySelector(".current-date");
var currentImage = document.querySelector(".current-image");
var currentTemp = document.querySelector(".current-temp");
var currentWind = document.querySelector(".current-wind");
var currentHumidity = document.querySelector(".current-humidity");
var currentUv = document.querySelector(".current-uv");
var cardDeck = document.querySelector(".card-deck");
var searchArray = JSON.parse(localStorage.getItem("History")) || [];
var searchHistoryButtonContainer = document.querySelector("#searchHistory");

onLoad();

function onLoad() {
  if (searchArray) {
    historyBtn();
  }
}

function historyBtn() {
  searchHistoryButtonContainer.innerHTML = "";
  for (var i = searchArray.length - 1; i >= 0; i--) {
    var historyBtn = document.createElement("button");
    historyBtn.textContent = searchArray[i];
    historyBtn.setAttribute("class", 'historyBtn');
    historyBtn.setAttribute("value", searchArray[i]);
    historyBtn.onclick = historyBtnClick;
    searchHistoryButtonContainer.append(historyBtn);
  }
}

function historyBtnClick(e) {
  getCurrentWeatherData(e.target.value);
}

function userInput() {
  var cityName = inputBox.value;
  getCurrentWeatherData(cityName);

  inputBox.value = "";
}

// uses the city name search to fetch the data for the current day
function getCurrentWeatherData(cityName) {
  console.log(cityName);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      currentDate.innerText = `${cityName} ${timeConvert(data.dt)}`;
      currentImage.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      currentTemp.innerText = `${data.main.temp} °F`;
      currentWind.innerText = `${data.wind.speed} MPH`;
      currentHumidity.innerText = `${data.main.humidity} %`;
      futureForcast(data.coord.lat, data.coord.lon);
      searchHistory(cityName);
    });
}

// after the tcurrent day search is done the futureForcast is called to collect the data for the upcoming days
function futureForcast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showWeather(data);
    });
}

//showWeather shows the weather data for the next 5 days
function showWeather(data) {
  //clears the upcoming 5-day cards
  cardDeck.innerHTML = "";
  //dislays the UV for the current day

  currentUv.innerText = `UV index: ${data.daily[0].uvi}`;


  //adjusts the color of the uv based on value
  document.getElementById("current-uv").style.color = "";
  if (data.daily[0].uvi > 8) {
    document.getElementById("current-uv").style.color = "red";
  } else if (2 < data.daily[0].uvi > 8) {
    document.getElementById("current-uv").style.color = "yellow";
  } else {
    document.getElementById("current-uv").style.color = "green";
  }

  //for loop to create the individual html elements for the upcoming 5 days as well as the information to populate each section
  for (let i = 1; i < 6; i++) {
    var cardContainer = document.createElement("div");
    var cardDate = document.createElement("h5");
    var cardImage = document.createElement("img");
    var cardTemp = document.createElement("p");
    var cardWind = document.createElement("p");
    var cardHumidity = document.createElement("p");

    cardDate.textContent = `Date: ${timeConvert(data.daily[i].dt)}`;
    cardImage.src = `https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;
    cardTemp.textContent = `Temp: ${data.daily[i].temp.day} °F`;
    cardWind.textContent = `Wind speed: ${data.daily[i].wind_speed} MPH`;
    cardHumidity.textContent = `Humidity: ${data.daily[i].humidity} %`;

    cardContainer.classList.add("card", "card-body");

    cardContainer.append(cardDate, cardImage, cardTemp, cardWind, cardHumidity);
    cardDeck.append(cardContainer);
  }
}

// converts the date from unix to our regular format

function timeConvert(date) {
  return new Date(date * 1000).toLocaleDateString("en-US");
}

//search history
function searchHistory(city) {
  if (searchArray.indexOf(city) === -1) {
    searchArray.push(city);
  }

  localStorage.setItem("History", JSON.stringify(searchArray));
  console.log(searchArray);
  historyBtn();
}

searchButton.addEventListener("click", userInput);
