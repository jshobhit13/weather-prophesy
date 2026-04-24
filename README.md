# Weather Prophesy

A dark-themed mobile weather app built with React Native and Expo. Search any city and get real-time current conditions along with a 5-day forecast.

> Live demo coming soon | [GitHub Repo](https://github.com/jshobhit13/weather-prophesy)

---

## Features

- Search weather for any city worldwide
- Current temperature, feels like, min and max
- Humidity, wind speed and direction, visibility
- Sunrise and sunset times
- 5-day forecast with daily high and low
- Background color changes based on weather condition
- Pull to refresh
- Error messages for invalid city or no internet
---


## Getting Started

**Requirements**

- Node.js v18 or above
- Expo Go app on your Android or iOS device

**Steps**

```bash
# Clone the repo
git clone https://github.com/jshobhit13/weather-prophesy.git
cd weather-prophesy

# Install dependencies
npm install

# Start the app
npx expo start --clear
```

Scan the QR code in your terminal using Expo Go on your phone.

---

## API Key Setup

This app uses the [OpenWeatherMap API](https://openweathermap.org/api) (free tier).

1. Sign up at [openweathermap.org](https://openweathermap.org)
2. Copy your API key from the dashboard
3. Create a `.env` file in the root folder
4. Add this line:

```
EXPO_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

The `.env` file is listed in `.gitignore` and will not be pushed to GitHub. Anyone cloning this repo needs to create their own.

---

## Project Structure

```
weather-prophesy/
├── App.js
├── app.json
├── package.json
├── babel.config.js
├── .env
├── .gitignore
└── src/
    ├── screens/
    │   └── HomeScreen.js
    ├── components/
    │   ├── SearchBar.js
    │   ├── CurrentWeather.js
    │   ├── ForecastRow.js
    │   └── EmptyState.js
    ├── hooks/
    │   └── useWeather.js
    └── services/
        ├── weatherApi.js
        └── helpers.js
```

---

## Built With

| Technology | Version | Purpose |
|---|---|---|
| React Native | 0.74 | Mobile UI framework |
| Expo | 51 | Build and development toolchain |
| expo-linear-gradient | latest | Weather-based background gradients |
| react-native-safe-area-context | latest | Safe area handling |
| OpenWeatherMap API | Free tier | Weather and forecast data |

---

## Planned Improvements

- [ ] Web version using React and Vite, deployed on Vercel
- [ ] Auto-detect current location on app open
- [ ] Hourly forecast using OWM 3-hour interval data
- [ ] Save favourite cities with AsyncStorage
- [ ] UV index and air quality via One Call API
- [ ] Light and dark theme toggle
- [ ] Animated weather icons

---

## How It Works

All API calls and state are managed inside a single custom hook called `useWeather`. The components are purely presentational and only handle what they display.

Two OpenWeatherMap endpoints are used:
- `/weather` for current conditions
- `/forecast` for 5-day data, which gets aggregated into daily highs and lows inside `helpers.js`

The background gradient is picked by mapping OWM weather condition codes (clear, clouds, rain, thunderstorm, snow, etc.) to a color palette defined in `helpers.js`.

---

## Known Limitations

- Free tier API allows 60 calls per minute
- The 5-day forecast is built from 3-hour intervals, not a true daily endpoint
- No offline caching, so nothing loads without internet

---

## License

MIT

---

## Author

**Shobhit Jain**  
B.Tech Computer Science, Galgotias University  
[GitHub](https://github.com/jshobhit13)
