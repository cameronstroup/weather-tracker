// eventListenrs

submitBtn = $(".search-city");
cityList = $(".input-group-append");
currentTime = moment().format("L");

$(document).ready(function () {
  $("#current-time").text(moment().format("L"));

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
  $(".temp").text("Tempeture: " + data.main.temp + "°F");
  $(".wind").text("Wind Speed: " + data.wind.speed + "MPH");
  $(".icon0").attr(
    "src",
    "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
  );
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
    "&units=imperial" +
    "&appid=37e6dcaaa7be78a19d983eb490d52ae4";
  console.log(latApi);
  fetch(latApi).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      $(".index").text("UVI Index:" + data.current.uvi);
      console.log(data);

      if (data.current.uvi < 2) {
        $(".index")
          .text("       " + data.current.uvi)
          .removeClass()
          .addClass("safe");
      } else if ("    " + data.current.uvi > 3 && data.current.uvi < 6) {
        $(".index")
          .text("    " + data.current.uvi)
          .removeClass()
          .addClass("medium");
      } else {
        $(".index")
          .text("    " + data.current.uvi)
          .removeClass()
          .addClass("danger");
      }

      for (i = 1; i < 6; i++) {
        // $("#currentDay" + [i])
        //   .text(data.daily[i].dit * 1000)
        //   .toLocaleDateString("en-Us");
        $("#icon" + [i]).attr(
          "src",
          "http://openweathermap.org/img/wn/" +
            data.daily[i].weather[0].icon +
            ".png"
        );
        $("#temp" + [i]).text(data.daily[i].temp.day + "°F");
        $("#wind" + [i]).text(data.daily[i].wind_speed + "MPH");
        $("#humidity" + [i]).text(data.daily[i].humidity + "%");
      }
    });
  });
};
