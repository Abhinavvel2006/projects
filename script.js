const apiKey = "//your api code";

    async function getWeather() {
      const location = document.getElementById("locationInput").value;
      if (!location) return;
      console.log("Location:", location);


      const url = `http://api.weatherapi.com/v1/current.json?key=06a371bd722349aebed171747252509&q=London&aqi=yes`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        const current = data.current;
        const locationData = data.location;
        const forecastData = data.forecast.forecastday;

        // Auto theme switch (day/night)
        const isDay = current.is_day === 1;
        document.body.className = isDay ? "light" : "dark";

        document.getElementById("weather").innerHTML = `
          <h3>${locationData.name}, ${locationData.country}</h3>
          <img src="https:${current.condition.icon}" alt="${current.condition.text}">
          <p>${current.condition.text}</p>
          <p>🌡 Temp: ${current.temp_c}°C (Feels ${current.feelslike_c}°C)</p>
          <p>💧 Humidity: ${current.humidity}%</p>
          <p>🌬 Wind: ${current.wind_kph} kph</p>
        `;

        let forecastHTML = "<h4>3-Day Forecast</h4>";
        forecastData.forEach(day => {
          forecastHTML += `
            <div class="day">
              <p>${day.date}</p>
              <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
              <p>${day.day.avgtemp_c}°C</p>
            </div>
          `;
        });
        document.getElementById("forecast").innerHTML = forecastHTML;

      } catch (error) {
        document.getElementById("weather").innerHTML = `<p style="color:red;">❌ Location not found!</p>`;
        document.getElementById("forecast").innerHTML = "";
      }
    }
