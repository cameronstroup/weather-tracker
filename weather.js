// eventListenrs

submitBtn = $(".search-city");
cityList = $(".input-group-append");

$(document).ready(function () {
  currentTime = $("#current-time").text(moment().format("L"));

  $(".search-city").on("click", getCity);
});

// This function pulls the data from the API
var getCity = function (user) {
  // format the github api url
  currentCity = $(".user-input1").val().trim();
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    currentCity +
    "&units=imperial" +
    "&appid=37e6dcaaa7be78a19d983eb490d52ae4";

  // make a get request to url
  fetch(apiUrl).then(function (response) {
    console.log(response);
    response.json().then(function (data) {
      //   console.log(data);
      searchCity(data);
    });
  });
};
var searchCity = function (data) {
  //   event.preventDefault();
  //   searchCity = console.log(event);
  console.log(data);

  $(".city-name").text(data.name);
  $(".temp").text(data.main.temp + "°F");
  $(".wind").text(data.wind.speed + "MPH");

  var lon = data.coord.lon;
  var lat = data.coord.lat;
  apiUv(lat, lon);
};
var apiUv = function (lat, lon) {
  console.log(lat, lon);
  var latApi =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=hourly,daily&appid=37e6dcaaa7be78a19d983eb490d52ae4";
  console.log(latApi);
  fetch(latApi).then(function (data) {
    console.log(data);
  });
  //   $(".index").text(data.name);
};
