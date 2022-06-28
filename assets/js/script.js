const apiKey = "e9ac1b37ce836e9ec26a1e2c38a33248";
const dailyContainer = $("#dailyContainer");
const searchContainer = $("#searchContainer");

function getForecast(longitutde, latitude) {
  console.log(longitutde);
  console.log(latitude);
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${longitutde}&lon=${latitude}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`
  )
    .then(function (response) {
      
    })
}

function getLonLat(city) {
  console.log("dailyForecast");
  console.log(city);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        response.json().then(function (response) {          
          console.log(response.coord.lat);
          console.log(response.coord.lon);
          const longitutde = response.coord.lon;
          const latitude = response.coord.lat;
          getForecast(longitutde, latitude);
        })
      }
    })
};

searchContainer.on("submit", function () {
  event.preventDefault();
  const city = $("#searchCity").val();
  getLonLat(city);
})