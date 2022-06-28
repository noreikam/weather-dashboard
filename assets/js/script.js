const apiKey = "e9ac1b37ce836e9ec26a1e2c38a33248";
const dailyContainer = $("#dailyContainer");
const searchContainer = $("#searchContainer");
let searchCity = '';

function getForecast(longitude, latitude) {
  console.log(longitude);
  console.log(latitude);
  // api call for weather forecast
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`
  )
    .then(function (response) {
      console.log("forecast as response");
      console.log(response);
      return response.json();
    })
    .then(function (response) {
      // break response into objects
      const current = response.current;
      console.log(current);
      // show city and date
      let date = new Date();
      const cityDiv = $("<h2>")
        .text(searchCity + " (" + date.toDateString() + ")");
      dailyContainer.append(cityDiv);
      // append temp
      let tempDiv = $("<p>")
        .text("Temperature: " + current.temp + " \u2103F");
      dailyContainer.append(tempDiv);
      // append wind
      let windDiv = $("<p>")
        .text("Wind: " + current.wind_speed + " MPH");
        dailyContainer.append(windDiv);
      // append humidity
      let humidityDiv = $("<p>")
        .text("Humidity: " + current.humidity + " %")
        dailyContainer.append(humidityDiv);
      // append uv index
      let uvDiv = $("<p>")
        .text("UV Index: " + current.uvi);
      dailyContainer.append(uvDiv);

    })

}

function getLonLat(city) {
  console.log("dailyForecast");
  console.log(city);
  searchCity = city;
  // api call for longitude and latitude
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        response.json().then(function (response) {          
          console.log("lat" + response.coord.lat);
          console.log("long" + response.coord.lon);
          const longitude = response.coord.lon;
          const latitude = response.coord.lat;
          getForecast(longitude, latitude);
        })
      }
    })
};

searchContainer.on("submit", function () {
  event.preventDefault();
  const city = $("#searchCity").val();
  getLonLat(city);
})