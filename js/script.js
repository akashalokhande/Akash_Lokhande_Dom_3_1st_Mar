document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "5c6486ba9e4745bfbc32fe27376d80af";
  const openWeatherMapApiKey = "2886594badf27c473324ac12be74ba1f";

  const fetchDataBtn = document.getElementById("fetchDataBtn");
  const mapElement = document.getElementById("map");
  const weatherDataElement = document.getElementById("weatherData");

  fetchDataBtn.addEventListener("click", function () {
    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        const { latitude, longitude } = data;
        console.log(latitude,longitude);
        document.getElementById("spinner").style.display = "inline-block";
        document.getElementById("fetchDataBtn").style.display = "none";
      
        mapElement.innerHTML = `<iframe class="map" src="https://maps.google.com/maps?q=${latitude}, ${longitude}&output=embed" width="350" height="200" frameborder="0" style="border:0"></iframe>`;

        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherMapApiKey}`
        );
      })
      .then((response) => response.json())
      .then((weatherData) => {
        console.log(weatherData.main.temp);

        const { main, wind, name, coord, timezone } = weatherData;
        console.log(weatherData);
        const currentWeather = `
        <h2>Wheather Data</h2>
        <div class="whether_parameter">
                <p>Location: ${name}</p>
                <p><span>Lat: ${
                  coord.lat
                }</span> <span class="long_span">Long: ${coord.lon}</span></p>
        <p>TimeZone: ${timezone}</p>
        <p>Temperature: ${(main.temp - 273.15).toFixed(2)} °C</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Pressure: ${main.pressure} "Hg</p>
        <p>Feels Like: ${main.feels_like} °C</p>
        </div>
        `;
        

        weatherDataElement.innerHTML = currentWeather;
        document.getElementById(
          "lat-long"
        ).innerHTML = `<p><span>Lat: ${coord.lat}</span> <span class="long_span">Long: ${coord.lon}</span></p>`;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        spinner.style.display = "none";
      });
  });
});
