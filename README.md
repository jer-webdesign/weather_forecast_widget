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

## Screenshots

### Light Mode
The widget features a clean, bright interface with a blue sky background.

### Dark Mode
Switch to dark mode for a sleek nighttime theme with constellation background.

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS variables, flexbox, and grid
- **Vanilla JavaScript**: No frameworks required
- **Font Awesome**: Icon library for weather conditions and UI elements
- **Open-Meteo API**: Free weather API service
- **Countries Now API**: Country and city data

## File Structure

```
weather-widget/
├── index.html          # Main HTML structure
├── script.js           # JavaScript functionality
├── style.css          # CSS styling and themes
├── images/
│   ├── blue-sky.jpg                           # Light mode background
│   └── stars-constellation-universe-twin.jpg  # Dark mode background
└── README.md          # Project documentation
```

## Setup Instructions

1. **Clone or Download**: Get the project files to your local machine
2. **Background Images**: Add the required background images to the `images/` folder:
   - `blue-sky.jpg` (for light mode)
   - `stars-constellation-universe-twin.jpg` (for dark mode)
3. **Open in Browser**: Launch `index.html` in a modern web browser
4. **No Server Required**: The widget runs entirely in the browser

## Usage

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
- **Geocoding**: https://geocoding-api.open-meteo.com/v1/search
- **Forecast**: https://api.open-meteo.com/v1/forecast
- **Free to use**: No API key required
- **Rate limits**: Reasonable limits for personal use

### Countries Now API
- **Endpoint**: https://countriesnow.space/api/v0.1/countries
- **Purpose**: Provides country and city data for location selection

## Mock Data

For testing and offline use, the widget includes mock data for Canadian cities:
- Calgary
- Edmonton
- Toronto
- Vancouver

Mock data includes realistic weather patterns and randomly generated forecasts.

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
