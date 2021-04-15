let now = new Date ();
let currentDate = document.querySelector ("#current-date");
let date = now.getDate ();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septe,ber", "October", "November", "December"];
let month = months[now.getMonth()];
let hour = now.getHours ();
if ( hour<10) {
  hours = `0${hour}`
}
let minutes = now.getMinutes ();
if (minutes < 10) {
  minutes = `0${minutes}`
}
currentDate.innerHTML = `Last updated on ${day}, ${date} ${month} at ${hour}:${minutes}`

function displayForecast () {
  let forecastElement = document.querySelector ("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
  days.forEach(function (day) {
  forecastHTML = forecastHTML + ` 
                    <div class="first-day">
                      <p class="forecast-date">Sun, 28 February</p>
                      <span class="temperature-first-day">
                        <p class="forecast-max-temp">12°</p>
                        |
                        <p class="forecast-min-temp">8°</p>
                      </span>
                    </div>
                  </div>`;
});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function showSearchedCityWeatherResult (response) {
  document.querySelector("#current-temperature-display").innerHTML = `${Math.round(response.data.main.temp)}°`;
  document.querySelector ("#city").innerHTML = response.data.name;
  document.querySelector ("#degree-real-feel").innerHTML = `${Math.round(response.data.main.feels_like)}°`
  document.querySelector ("#humidity-level").innerHTML = `${response.data.main.humidity}%`;
  document.querySelector ("#wind-speed").innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector ("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#icon").setAttribute ("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) 
  document.querySelector("#icon").setAttribute ("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
}

function searchCity (city) {
let apiKey = "5eabfe88b69ebff8b2d2c1968bc189ae";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
console.log(apiUrl)
axios.get(apiUrl).then(showSearchedCityWeatherResult);
}

function handleSubmit (event) {
  event.preventDefault ();
let city = document.querySelector ("#search-box").value;
searchCity (city);
}

document.querySelector ("#search-form").addEventListener ("submit", handleSubmit);


function showMyCurrentLocationWeather(response) {
  document.querySelector("#current-temperature-display").innerHTML = `${Math.round(response.data.main.temp)}°`;
  document.querySelector ("#city").innerHTML = response.data.name;
  document.querySelector ("#degree-real-feel").innerHTML = `${Math.round(response.data.main.feels_like)}°`
  document.querySelector ("#humidity-level").innerHTML = `${response.data.main.humidity}%`;
  document.querySelector ("#wind-speed").innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector ("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#icon").setAttribute ("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) 
  document.querySelector("#icon").setAttribute ("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
}

function searchLocation (position) {
  let apiKey = "5eabfe88b69ebff8b2d2c1968bc189ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showMyCurrentLocationWeather);
}

  function getMyLocation (event) {
    event.preventDefault ();
  navigator.geolocation.getCurrentPosition (searchLocation);
}

  function fahrenheitConvert (event) {
  event.preventDefault ();
  document.querySelector ("#current-temperature-display").innerHTML = `${Math.round((celsiusTemperature * 9) / 5 + 32)}°`;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let fahrenheitLink = document.querySelector ("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", fahrenheitConvert)

  function celsiusConvert (event) {
  event.preventDefault ();
  document.querySelector ("#current-temperature-display").innerHTML = `${Math.round(celsiusTemperature)}°`;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsiusLink = document.querySelector ("#celsius-link");
  celsiusLink.addEventListener("click", celsiusConvert)

  celsiusTemperature = null;

  let myLocationButton = document.querySelector("#my-location-button");
  myLocationButton.addEventListener("click", getMyLocation);

  searchCity ("London");
  displayForecast ();

