# Weather Forecast Widget

A responsive, interactive weather forecast widget that displays current weather conditions and a 7-day forecast with support for both mock data and live API integration.
## Features
- **Current Weather Display**: Shows today's weather with detailed information
- **7-Day Forecast**: Complete weekly weather outlook with daily details
- **Dual Data Sources**: Switch between mock data (for testing) and live API data
- **Location Selection**: Choose from countries and cities via dropdown menus
- **Temperature Units**: Toggle between Celsius (°C) and Fahrenheit (°F)
- **Dark/Light Mode**: Theme toggle for better accessibility and user preference
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop
- **Interactive UI**: Smooth transitions and hover effects

### Light Mode
The widget features a clean, bright interface with a blue sky background.
### Dark Mode
Switch to dark mode for a sleek nighttime theme with constellation background.

## Technologies Used
- **HTML5**
- **CSS3**: Modern styling with CSS variables, flexbox, and grid
- **JavaScript**
- **Font Awesome**: Icon library for weather conditions and UI elements
- **Open-Meteo API**: Free weather API service
- **Countries Now API**: Country and city data

## File Structure

```
weather_forecast_widget/ # Repository name
├── index.html           # Main HTML structure
├── script.js            # JavaScript functionality
├── style.css            # CSS styling and themes
├── images/
│   ├── blue-sky.jpg                           # Light mode background
│   ├── stars-constellation-universe-twin.jpg  # Dark mode background
|   └── weather-app.png  # favicon  
└── README.md          # Project documentation
```
### Data Source Selection
- **Mock Data**: Uses pre-configured Canadian cities for testing
- **Live API**: Fetches real-time weather data from Open-Meteo

### Location Selection
1. Select your preferred data source (Mock or Live API)
2. Choose a country from the dropdown
3. Select a city from the populated city list
4. Weather data loads automatically

### Temperature Units
- Click the temperature unit button (°F/°C) to toggle between Fahrenheit and Celsius
- All temperature displays update instantly

### Theme Toggle
- Click the moon (🌙) or sun (☀️) button to switch between dark and light modes
- Theme preference affects colors and background images

## API Integration

### Open-Meteo Weather API
- **Geocoding**: https://geocoding-api.open-meteo.com/v1/search  ( Converts city names to latitude/longitude )
- **Forecast**: https://api.open-meteo.com/v1/forecast  ( Retrieves current and daily weather data )

### Countries Now API
- **Endpoint**: https://countriesnow.space/api/v0.1/countries
   ( Provides country and city data for location selection )

## Mock Data

For testing and offline use, the widget includes mock data for Canadian cities:
- Calgary
- Edmonton
- Toronto
- Vancouver

## Weather Conditions

The widget displays various weather conditions with appropriate icons:
- ☀️ Sunny
- ⛅ Partly Cloudy
- ☁️ Cloudy
- 🌧️ Rainy
- ❄️ Snowy
- ⛈️ Thunderstorm

## Responsive Design

The widget adapts to different screen sizes:
- **Desktop (>768px)**: Full horizontal layout
- **Tablet (320px-768px)**: Adjusted layout with stacked elements
- **Mobile (<320px)**: Compact vertical layout optimized for small screens

## Attributions

Altmann, G. (2022, June 7). Stars, constellation, universe [Illustration]. Pixabay. https://pixabay.com/illustrations/stars-constellation-universe-twin-7249785/

uriel. (2020, August 11). Blue sky with white clouds [Photograph]. Unsplash. https://unsplash.com/photos/blue-sky-with-white-clouds-xtgONQzGgOE

Prabowo, A. (n.d.). Weather app icons [Icon set]. Flaticon. https://www.flaticon.com/free-icons/weather-app

CountriesNow. (n.d.). Countries API. https://countriesnow.space/api/v0.1/countries

Open-Meteo. (n.d.). Weather forecast API. https://api.open-meteo.com/v1/forecast

Open-Meteo. (n.d.). Geocoding API. https://geocoding-api.open-meteo.com/v1/search


