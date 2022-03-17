$(document).ready(function () {
  currentTime = $("#current-time").text(moment().format("L"));
  submitBtn = $(".search-city");
  cityList = $(".input-group-append");

  $(".search-city").on("click", searchCity);
});

var getCity = function (user) {
  // format the github api url
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    currentCity +
    "&appid=37e6dcaaa7be78a19d983eb490d52ae4";

  // make a get request to url
  fetch(apiUrl).then(function (response) {
    console.log(response);
    response.json().then(function (data) {
      console.log(data);
    });
  });
};

var searchCity = function (event) {
  event.preventDefault();
  searchCity = console.log(event);
  currentCity = $(".user-input1").val();
  getCity();
  if (currentCity) {
    getUserRepos(username);
    nameInputEl.value = "";
  }
};
