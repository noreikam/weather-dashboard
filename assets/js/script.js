const apiKey = "e9ac1b37ce836e9ec26a1e2c38a33248";
const currentContainer = $("#currentContainer");
const searchContainer = $("#searchContainer");
const fiveDayContainer = $("#fiveDayContainer");
const fiveDayTitle = $("#fiveDayTitle");
let searchCity = '';

function getForecast(longitude, latitude) {
  console.log(longitude);
  console.log(latitude);
  // api call for weather forecast
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      // break response into objects
      const current = response.current;
      const daily = [];
      for (let i=0; i<5; i++) {
        daily[i] = response.daily[i];
      }
      console.log(current);
      console.log(daily);
      // show city and date
      let today = new Date();
      const cityDiv = $("<h2>")
        .text(searchCity + " (" + today.toDateString() + ")");
      currentContainer.append(cityDiv);
      // append temp
      let tempDiv = $("<p>")
        .text("Temp: " + current.temp + " \u00B0F");
      currentContainer.append(tempDiv);
      // append wind
      let windDiv = $("<p>")
        .text("Wind: " + current.wind_speed + " MPH");
        currentContainer.append(windDiv);
      // append humidity
      let humidityDiv = $("<p>")
        .text("Humidity: " + current.humidity + " %")
        currentContainer.append(humidityDiv);
      // append uv index
      let uvDiv = $("<p>")
        .text("UV Index: " + current.uvi);
      currentContainer.append(uvDiv);

      // daily card
      fiveDayTitle.removeClass("d-none");
      for (let i=0; i<5; i++) {
        let dailyCard = $("<card>")
          .addClass("dailyCard");
        // append date
        today.setDate(today.getDate() + 1);
        let dateDiv = $("<p>")
          .text(today.toDateString());
        dailyCard.append(dateDiv);
        // append temp
        let tempDiv = $("<p>")
          .text("Temp: " + daily[i].temp.day + " \u00B0F");
        dailyCard.append(tempDiv);
        // append wind
        let windDiv = $("<p>")
          .text("Wind: " + daily[i].wind_speed + " MPH");
        dailyCard.append(windDiv);
        // append humidity
        let humidityDiv = $("<p>")
          .text("Humidity: " + daily[i].humidity + " %")
        dailyCard.append(humidityDiv);
        // append card to fiveDayContainer
        fiveDayContainer.append(dailyCard);
      }
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