document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city').value;
    const searchUrl = `https://www.metaweather.com/api/location/search/?query=${city}`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(locations => {
            if (locations.length === 0) {
                document.getElementById('weatherInfo').innerHTML = `<p>City not found. Please try again.</p>`;
                return;
            }
            const woeid = locations[0].woeid;
            const weatherUrl = `https://www.metaweather.com/api/location/${woeid}/`;
            return fetch(weatherUrl);
        })
        .then(response => response ? response.json() : null)
        .then(data => {
            if (!data) return;
            const today = data.consolidated_weather[0];
            document.getElementById('weatherInfo').innerHTML = `
                <h2>Weather in ${data.title}</h2>
                <p><strong>Temperature:</strong> ${today.the_temp.toFixed(1)} °C</p>
                <p><strong>Condition:</strong> ${today.weather_state_name}</p>
                <p><strong>Humidity:</strong> ${today.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${today.wind_speed.toFixed(1)} mph</p>
            `;
        })
        .catch(() => {
            document.getElementById('weatherInfo').innerHTML = `<p>Error retrieving weather data. Please try again later.</p>`;
        });
});