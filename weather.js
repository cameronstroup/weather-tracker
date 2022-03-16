currentTime = $("#current-time").text(moment().format("L"));
userInput = $("#user-input").val();
submitBtn = $(".search-city");
cityList = $(".input-group-append");
submitBtn.addEventListener("click", searchCity);

$.ajax(
  "https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}"
).done(function (data) {
  console.log(data);
});

var searchCity = function (event) {
  event.preventDefault();
  console.log(event);
};
