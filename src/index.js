function formatDate(date) {
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#time-now");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "Hello";
  forecastElement.innerHTML =
    forecastHTML +
    `
             <div class="row">
              <div class="col-2">
                <div class="weather-forecast-date">Sunday</div>
                <img
                  src="http://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width="36"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-max">18°</span>
                  <span class="weather-forescast-min">12°</span>
                </div>
              </div>
            </div>`;
}

function displayWeatherCondition(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "6d68aadfacdd4f5163bc273049a0cf2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

let form = document.querySelector("#location-form");
form.addEventListener("submit", handleSubmit);

function convertToC(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let temperature = tempElement.innerHTML;
  temperature = Number(temperature);
  tempElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToC);

function searchLocation(position) {
  let apiKey = "6d68aadfacdd4f5163bc273049a0cf2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToF(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let temperature = tempElement.innerHTML;
  temperature = Number(temperature);
  tempElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let FahrenheitLink = document.querySelector("#fahrenheit-link");
FahrenheitLink.addEventListener("click", convertToF);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Denver");
displayForecast();
