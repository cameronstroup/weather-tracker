// eventListenrs

submitBtn = $(".search-city");
cityList = $(".input-group-append");
currentTime = moment().format("L");
$(".search-city").on("click", getCity);

$(document).ready(function () {
  $("#current-time").text(moment().format("L"));

  $(".search-city").on("click", getCity);
  $("#clearHistory").on("click", clearHistory);
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

  putInLocalStorage(currentCity);

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
  $(".history").removeClass("hide");
  $("#current-time").removeClass("hide");
  $(".forcast").removeClass("hide");
  $(".hideday").removeClass("hide");
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

      if (data.current.uvi < 3) {
        $(".index")
          .text("    UV: Index   " + data.current.uvi)
          .removeClass()
          .addClass("safe");
      } else if (data.current.uvi > 3 && data.current.uvi < 6) {
        $(".index")
          .text("UV: Index    " + data.current.uvi)
          .removeClass()
          .addClass("medium");
      } else {
        $(".index")
          .text(" UV: Index" + data.current.uvi)
          .removeClass()
          .addClass("danger");
      }

      for (i = 1; i < 6; i++) {
        $("#icon" + [i]).attr(
          "src",
          "http://openweathermap.org/img/wn/" +
            data.daily[i].weather[0].icon +
            ".png"
        );
        $("#temp" + [i]).text("Temp:" + data.daily[i].temp.day + "°F");
        $("#wind" + [i]).text("Wind :" + data.daily[i].wind_speed + "MPH");
        $("#humidity" + [i]).text("Humidity" + data.daily[i].humidity + "%");
        $("#currentDay" + [i]).text(
          new Date(data.daily[i].dt * 1000).toLocaleDateString("en-US")
        );
      }
    });
  });
};
// Declares localCityArray in global variable
const localCityArray = [];

// Pulls in previous searches from localStorage
// let previousSearch = JSON.parse(localStorage.getItem("searches"));

// Removes any null results stored in localStorage

function putInLocalStorage(city) {
  localCityArray.push(city);
  localStorage.setItem("searchHistory", JSON.stringify(localCityArray));

  renderSearchHistory();
}
function pullFromLocalStorage() {
  var storageHistory = localStorage.getItem("searchHistory");
  if (storageHistory) {
    localCityArray = JSON.parse(storageHistory);
  }
  renderSearchHistory();
}
var clearHistory = function () {
  localCityArray = [];
  renderSearchHistory();
};

function renderSearchHistory() {
  for (i = 0; i < localCityArray.length; i++) {
    var button = document.createElement("button");
    button.textContent = localCityArray[i];
    // button.setAttribute("dataSearch", localCityArray[i]);
    button.classList.add("search-city");
    $(".list-group").append(button);
    // $(".list-group").remove();
  }
}

pullFromLocalStorage();

// if (previousSearch !== null) {
//   for (let i = 0; i < previousSearch.length; i++) {
//     if (previousSearch[i] === null) {
//       previousSearch.splice(i, i + 1);
//     } else {
//       // Populates localCityArray to publish previous search buttons
//       localCityArray.push(previousSearch[i]);
//     }
//   }
// }
