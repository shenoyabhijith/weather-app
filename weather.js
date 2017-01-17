$(document).ready(function () {

  var api = "https://api.wunderground.com/api/19b1920430424fb2/conditions/forecast/alert/q/";
  var forecast = 'https://api.wunderground.com/api/19b1920430424fb2/forecast/q/';
  // determine geo lookup

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position.coords.latitude + "\t" + position.coords.longitude);
      api = api + position.coords.latitude + "," + position.coords.longitude + ".json?callback=?";
      console.log(api);
      var $content = $("#cntnt");
      $.getJSON(api, function (weather) {
        console.log(weather);
        var temp = weather.current_observation.temp_c ;
        $("#w-image img").prop("src", weather.forecast.txt_forecast.forecastday[0].icon_url);
        $content.append("<h4> " +temp + "°</h4>");
        $content.append("<h3>" + weather.current_observation.observation_location.full + "</h3>");
        $content.append("<h3>" + weather.current_observation.display_location.state_name + "</h3>");
        $content.append(weather.forecast.txt_forecast.forecastday[0].fcttext);
        console.log(weather);
 if(temp<30){
   var imgUrl = "https://s29.postimg.org/i2drvpck7/Cold_Weather_Backgrounds_Cold_weather_in_the_par.jpg";
   document.body.style.backgroundImage = 'url(' + imgUrl + ')';
 }
  
      })
    })
  }

})