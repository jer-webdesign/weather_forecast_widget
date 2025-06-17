/**
 * Weather Forecast Widget
 * -----------------------
 * A JavaScript script for an interactive widget that displays today’s weather and a 7-day forecast.
 * You can switch between mock test data and live data from the Open-Meteo API.
 *
 * Supported Features:
 * - Country and city dropdowns
 * - °C / °F toggle
 * - Dark mode toggle
 * - Mock or live data switch
 *
 * APIs Used:
 * - Geocoding: converts city names to coordinates
 * - Forecast: gets weather data
 * - Country/City list: fills dropdowns
 *
 * Mock Mode:
 * - Generates fake weather data for Canadian cities
 * - Useful for testing without internet
 *
 * The UI updates when users change location, units, data source, or theme.
 **/

// Get all HTML elements
const countrySelect = document.getElementById("country-select");
const citySelect = document.getElementById("city-select");
const forecastGrid = document.getElementById("forecast-grid");
const currentContent = document.getElementById("current-content");
const dataSourceSelect = document.getElementById("data-source-select");
const tempUnitButton = document.getElementById("temperature-unit-button");
const darkModeButton = document.getElementById("dark-mode-button");

// Initial Settings 
let unit = "celsius"; // default temperature unit
let darkMode = false; // dark mode toggle
let useMockData = true; // use fake data by default
let selectedCoords = { lat: 51.0447, lon: -114.0719 }; // default to Calgary

// Mock Data for Canada
const mockLocation = {
  country: "Canada",
  cities: ["Calgary", "Edmonton", "Toronto", "Vancouver"],
  coords: {
    Calgary: { lat: 51.0447, lon: -114.0719 },
    Edmonton: { lat: 53.5461, lon: -113.4938 },
    Toronto: { lat: 43.65107, lon: -79.347015 },
    Vancouver: { lat: 49.2827, lon: -123.1207 },
  },
  mockData: {
    Calgary: { temperature: 18, windspeed: 12 },
    Edmonton: { temperature: 10, windspeed: 15 },
    Toronto: { temperature: 22, windspeed: 9 },
    Vancouver: { temperature: 16, windspeed: 11 },
  },
};

// Date to local ISO date string "YYYY-MM-DD"
function toLocalISODate(date) {
  return date.getFullYear() + "-" +
    String(date.getMonth() + 1).padStart(2, "0") + "-" +
    String(date.getDate()).padStart(2, "0");
}

// Generate 7-day mock weather for a city
function generateMockDaily(city) {
  const baseTemp = mockLocation.mockData[city].temperature;
  return {
    time: [...Array(7)].map((_, i) => toLocalISODate(new Date(Date.now() + i * 86400000))),
    temperature_2m_max: Array(7).fill().map(() => baseTemp + Math.floor(Math.random() * 5)),
    temperature_2m_min: Array(7).fill().map(() => baseTemp - Math.floor(Math.random() * 5)),
    wind_speed_10m_max: Array(7).fill().map(() => 10 + Math.floor(Math.random() * 5)),
    wind_gusts_10m_max: Array(7).fill().map(() => 20 + Math.floor(Math.random() * 10)),
    relative_humidity_2m_mean: Array(7).fill().map(() => 50 + Math.floor(Math.random() * 10)),
    apparent_temperature_max: Array(7).fill().map(() => baseTemp + Math.floor(Math.random() * 3)),
    precipitation_probability_mean: Array(7).fill().map(() => Math.floor(Math.random() * 50)),
    precipitation_sum: Array(7).fill().map(() => Math.floor(Math.random() * 10)),
    weathercode: Array(7).fill().map(() => [0, 1, 2, 3, 61, 71, 95][Math.floor(Math.random() * 7)]),
  };
}

// Show °C or °F based on current unit
function getTempUnitSymbol() {
  return unit === "celsius" ? "°C" : "°F";
}

// Return condition name and icon based on weather code
function getWeatherCondition(code, large = false) {
  const sizeClass = large ? "current-weather-icon" : "weather-icon";
  let condition, icon;
  switch (code) {
    case 0:
      condition = 'Sunny';
      icon = `<i class="fas fa-sun ${sizeClass}" style="color: #f9d71c;"></i>`;
      break;
    case 1:
    case 2:
      condition = 'Partly Cloudy';
      icon = `<i class="fas fa-cloud-sun ${sizeClass}" style="color: #fbbf24;"></i>`;
      break;
    case 3:
      condition = 'Cloudy';
      icon = `<i class="fas fa-cloud ${sizeClass}" style="color:rgb(172, 195, 220);"></i>`;
      break;
    case 61:
      condition = 'Rainy';
      icon = `<i class="fas fa-cloud-showers-heavy ${sizeClass}" style="color:rgb(13, 100, 240);"></i>`;
      break;
    case 71:
      condition = 'Snowy';
      icon = `<i class="fas fa-snowflake ${sizeClass}" style="color: #bae6fd;"></i>`;
      break;
    case 95:
      condition = 'Thunderstorm';
      icon = `<i class="fas fa-bolt ${sizeClass}" style="color: #facc15;"></i>`;
      break;
    default:
      condition = 'Cloudy';
      icon = `<i class="fas fa-cloud ${sizeClass}" style="color:rgb(172, 195, 220);"></i>`;
  }
  return { condition, icon };
}

// UI Button Event Listeners
// Toggle °C/°F button
tempUnitButton.onclick = () => {
  unit = unit === "celsius" ? "fahrenheit" : "celsius";
  tempUnitButton.textContent = unit === "celsius" ? "°F" : "°C";
  fetchWeather(); // reload weather with new unit
};

// Toggle dark/light mode
darkModeButton.onclick = () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark", darkMode);
  darkModeButton.textContent = darkMode ? "☀️" : "🌙";
};

// Switch between mock and live data
dataSourceSelect.onchange = () => {
  useMockData = dataSourceSelect.value === "mock";
  loadLocations(); // re-load country/city options
};

// Load Country & City Dropdowns 
async function loadLocations() {
  countrySelect.innerHTML = "";
  citySelect.innerHTML = "";

  if (useMockData) {
    // Use mock data for Canada only
    const opt = document.createElement("option");
    opt.value = mockLocation.country;
    opt.textContent = mockLocation.country;
    countrySelect.appendChild(opt);

    // Add mock cities
    mockLocation.cities.forEach(city => {
      const cityOpt = document.createElement("option");
      cityOpt.value = city;
      cityOpt.textContent = city;
      citySelect.appendChild(cityOpt);
    });

    // When a city is selected, load its mock data
    citySelect.onchange = () => {
      const city = citySelect.value;
      selectedCoords = mockLocation.coords[city];
      mockData = {
        current_weather: mockLocation.mockData[city],
        daily: generateMockDaily(city),
      };
      fetchWeather();
    };

    // Trigger default selection (Calgary)
    countrySelect.onchange = () => citySelect.onchange();
    countrySelect.value = "Canada";
    citySelect.value = "Calgary";
    citySelect.onchange();

  } else {
    // Fetch countries and cities from API
    const res = await fetch("https://countriesnow.space/api/v0.1/countries");
    const data = await res.json();

    data.data.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.country;
      opt.textContent = c.country;
      countrySelect.appendChild(opt);
    });

    // When country is selected, load its cities
    countrySelect.onchange = () => {
      const selected = data.data.find(d => d.country === countrySelect.value);
      citySelect.innerHTML = "";
      selected?.cities?.forEach(city => {
        const opt = document.createElement("option");
        opt.textContent = city;
        citySelect.appendChild(opt);
      });
      citySelect.onchange();
    };

    // When city is selected, get its coordinates
    citySelect.onchange = async () => {
      const city = citySelect.value;
      const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
      const geoData = await geo.json();
      if (geoData.results?.length) {
        selectedCoords = {
          lat: geoData.results[0].latitude,
          lon: geoData.results[0].longitude
        };
        fetchWeather(); // get weather for selected city
      }
    };

    // Default selection
    countrySelect.value = "Canada";
    countrySelect.onchange();
  }
}

// Calculate feels-like manually using temperature, humidity, and wind speed
function calculateFeelsLike(tempC, windKmh, humidity) {
  const windMs = windKmh / 3.6;
  return (
    tempC +
    0.33 * humidity / 100 * 6.105 *
    Math.exp(17.27 * tempC / (237.7 + tempC)) -
    0.7 * windMs -
    4.0
  ).toFixed(1);
}

// Fetch & Display Weather Data 
async function fetchWeather() {
  const w = useMockData ? mockData : await fetchLiveWeather();
  const date = new Date(w.daily.time[0] + "T00:00:00");

  const temp = w.current_weather.temperature;
  const wind = w.current_weather.windspeed;
  const humidity = w.daily.relative_humidity_2m_mean[0]; // estimate for today
  const feelsLike = calculateFeelsLike(temp, wind, humidity);

  // Display current weather
  const { condition, icon } = getWeatherCondition(w.daily.weathercode[0], true);
  currentContent.innerHTML = `
    <section class="weather-icon-condition">
      <h3>${date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</h3>
      <p>${icon}<br><strong>${condition}</strong></p>
    </section>
    <section id="current-temperature">
      <p><strong>${w.current_weather.temperature}${getTempUnitSymbol()}</strong></p>
    </section>
    <section class="current-wind-humidity-feels-like">
      <p><i class="fa-solid fa-wind"></i> Wind: ${w.current_weather.windspeed} km/h</p>
      <p><i class="fa-solid fa-tint"></i> Humidity: ${w.daily.relative_humidity_2m_mean[0]}%</p>
      <p><i class="fa-solid fa-temperature-high"></i> Feels Like: ${feelsLike}${getTempUnitSymbol()}</p>  
    </section > `;

  // Display 7-day forecast
  forecastGrid.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const d = new Date(w.daily.time[i] + "T00:00:00");
    const { condition, icon } = getWeatherCondition(w.daily.weathercode[i]);
    const max = w.daily.temperature_2m_max[i];
    const min = w.daily.temperature_2m_min[i];
    const avg = Math.round((max + min) / 2);

    const card = document.createElement("div");
    card.className = "weather-content";
    card.innerHTML = `
      <section class="weather-forecast" >
        <strong>${d.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" })}</strong>
        <div class="avg-icon-row">${icon}<p>${avg}${getTempUnitSymbol()}</p></div>
        <p><strong>${condition}</strong></p>
        <p>H: ${max}${getTempUnitSymbol()}</p>
        <p>L: ${min}${getTempUnitSymbol()}</p> 
        <p><i class="fa-solid fa-wind"></i> Wind: ${w.daily.wind_speed_10m_max[i]} km/h</p>
        <p><i class="fa-solid fa-wind"></i> Gust: ${w.daily.wind_gusts_10m_max[i]} km/h</p>
        <p><i class="fa-solid fa-tint"></i> Humidity: ${w.daily.relative_humidity_2m_mean[i]}%</p>
        <p><i class="fa-solid fa-cloud-rain"></i> P.O.P: ${w.daily.precipitation_probability_mean[i]}%</p>
        ${w.daily.precipitation_sum[i] > 0 ? `<p><i class="fa-solid fa-cloud-showers-heavy"></i> Rain: ${w.daily.precipitation_sum[i]} mm</p>` : ""}
      </section > `;
    forecastGrid.appendChild(card);
  }
}

// Fetch Live Weather from Open-Meteo API 
async function fetchLiveWeather() {
  const { lat, lon } = selectedCoords;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_mean,precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max,relative_humidity_2m_mean,apparent_temperature_max` +
    `&current_weather=true` + `&temperature_unit=${unit}&wind_speed_unit=kmh&timezone=auto`;
  const res = await fetch(url);
  return res.json();
}

// Start the App
loadLocations();