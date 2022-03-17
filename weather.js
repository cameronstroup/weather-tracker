submitBtn = $(".search-city");
cityList = $(".input-group-append");

$(document).ready(function () {
  currentTime = $("#current-time").text(moment().format("L"));

  $(".search-city").on("click", getCity);
});

var apiUv = function (lat,lon) {
    var latapi=
}

var searchCity = function (data) {
  //   event.preventDefault();
  //   searchCity = console.log(event);
  console.log(data);

  $(".city-name").text(data.name);
  $(".temp").text(data.main.temp + "°F");
  $(".wind").text(data.wind.speed + "MPH");
  $(".humidity").text(data.name);

  apiUv(data.lat, data.lon);
};
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
