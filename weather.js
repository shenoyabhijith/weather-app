$(document).ready(function() {

  var api = "https://api.wunderground.com/api/19b1920430424fb2/geolookup/q/";
  var forecast = "https://api.wunderground.com/api/19b1920430424fb2/forecast/q/CA/";
  // determine geo lookup
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude + "\t" + position.coords.longitude);
      api = api + position.coords.latitude + "," + position.coords.longitude + ".json?callback=?";
      console.log(api);
      var $content = $("#cntnt");
      $.getJSON(api, function(weather) {
        $content.append("<h3>airport:"+"<br/>" + weather.location.nearby_weather_stations.airport.station[0].city+"<br/>");
        $content.append("<b>Country</b> :"+ weather.location.country);      

        console.log(weather);
        forecast = forecast+weather.location.city+".json";
        console.log(forecast);
        $.getJSON(forecast,function(foreCast){
          console.log(foreCast)
         var hstTmpF =  foreCast.forecast.simpleforecast.forecastday[0].high.fahrenheit;
          var hstTmpC =foreCast.forecast.simpleforecast.forecastday[0].high.celsius;
          var lstTmpF = foreCast.forecast.simpleforecast.forecastday[0].low.fahrenheit;
          var lstTmpC =  foreCast.forecast.simpleforecast.forecastday[0].low.celsius;
   /*       var HmessageF = "<br/><b>Highest Temparature in fahrenheit</b> :";
          var LmessageF = "<br/><b>Lowest Temparature in fahrenheit</b> :";
          var LmessageC = "<br/><b>Lowest Temparature in celcius:</b>";
          var HmessageC = "<br/><b>Highest Temparature in celcius:</b>"; */
          $content.append("<br/><b>Weather description</b> :" + foreCast.forecast.txt_forecast.forecastday[0].fcttext); 
          $content.append("<br/><b>TIME ZONE</b> :" + foreCast.forecast.simpleforecast.forecastday[0].date.tz_long);   
  /*       $content.append(HmessageF + hstTmpF+"&degF" +HmessageC+hstTmpC+"&degC");        
          $content.append(LmessageF + lstTmpF+"&degF" +LmessageC+lstTmpC+"&degC");    */       
          $("#w-image img").prop("src",foreCast.forecast.txt_forecast.forecastday[0].icon_url);
        });
      });
    });
  }

})