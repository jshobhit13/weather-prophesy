<div align="center">

# 🌩️ Weather Prophesy

**A sleek, dark-themed mobile weather app built with React Native & Expo**

Search any city worldwide and get real-time current conditions along with a 5-day forecast — all wrapped in a beautiful dark UI.

[Getting Started](#-getting-started) · [Docker Setup](#-docker-setup) · [API Configuration](#-api-configuration) · [Architecture](#-architecture) · [Roadmap](#-roadmap)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **City Search** | Look up weather for any city worldwide |
| 🌡️ **Current Conditions** | Temperature, feels like, daily high & low |
| 💧 **Detailed Metrics** | Humidity, wind speed & direction, visibility |
| 🌅 **Sun Times** | Sunrise and sunset for any location |
| 📅 **5-Day Forecast** | Daily high/low outlook for the week ahead |
| 🎨 **Dynamic Backgrounds** | Gradient changes based on live weather conditions |
| 🔄 **Pull to Refresh** | Refresh data with a simple swipe |
| ⚠️ **Error Handling** | Clear feedback for invalid cities or no connectivity |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React Native](https://reactnative.dev/) | 0.74 | Cross-platform mobile UI framework |
| [Expo](https://expo.dev/) | 51 | Build toolchain & development environment |
| [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) | latest | Weather-responsive background gradients |
| [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) | latest | Safe area inset handling for all devices |
| [OpenWeatherMap API](https://openweathermap.org/api) | Free Tier | Real-time weather & forecast data |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **Expo Go** app on your [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS](https://apps.apple.com/app/expo-go/id982107779) device

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/jshobhit13/weather-prophesy.git
cd weather-prophesy

# 2. Install dependencies
npm install

# 3. Configure your API key (see API Configuration below)

# 4. Start the development server
npx expo start --clear
```

Scan the QR code displayed in your terminal using the **Expo Go** app on your phone.

---

## 🔑 API Configuration

This app uses the [OpenWeatherMap API](https://openweathermap.org/api) 

1. Sign up at [openweathermap.org](https://openweathermap.org)
2. Navigate to your dashboard and copy your API key
3. Create a `.env` file in the project root
4. Add the following line:

```env
EXPO_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

> **Note:** Free tier allows up to 60 API calls per minute.

---

## 🐳 Docker Setup

Docker support is included for running the Expo development server in a containerized environment — ideal for CI pipelines or team onboarding without local Node.js setup.

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed and running
- [Docker Compose](https://docs.docker.com/compose/) (included with Docker Desktop)

### Project Structure

```
weather-prophesy/
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .env                  ← your API key goes here
└── ...
```

### Dockerfile

```dockerfile
# syntax=docker/dockerfile:1
FROM node:18-alpine

WORKDIR /app

# Install Expo CLI globally
RUN npm install -g expo-cli

# Copy dependency manifests first (layer caching)
COPY package*.json ./
RUN npm install

# Copy rest of the source
COPY . .

EXPOSE 8081 19000 19001 19002

CMD ["npx", "expo", "start", "--tunnel", "--clear"]
```

### docker-compose.yml

```yaml
version: "3.9"

services:
  weather-prophesy:
    build: .
    container_name: weather-prophesy-dev
    ports:
      - "8081:8081"     # Metro bundler
      - "19000:19000"   # Expo DevTools
      - "19001:19001"
      - "19002:19002"
    env_file:
      - .env
    volumes:
      - .:/app
      - /app/node_modules   # Preserve container's node_modules
    stdin_open: true
    tty: true
```

### .dockerignore

```
node_modules
.expo
.env
*.log
```

### Running with Docker

```bash
# Build and start the container
docker compose up --build

# Run in detached (background) mode
docker compose up --build -d

# View logs
docker compose logs -f

# Stop the container
docker compose down
```

Once running, scan the QR code from the terminal output with **Expo Go** on your phone.

> **Tip:** Use the `--tunnel` flag (already set in the Dockerfile) so Expo Go on your physical device can connect to the containerized server over the internet without needing to be on the same network.

---

## 🏗️ Architecture

All API calls and state are managed inside a single custom hook — **`useWeather`**. Components are purely presentational and only handle rendering.

```
src/
├── hooks/
│   └── useWeather.js      # All API logic & state management
├── components/
│   ├── CurrentWeather.js  # Current conditions card
│   ├── ForecastCard.js    # Single forecast day card
│   └── SearchBar.js       # City search input
└── helpers.js             # Gradient mapping & forecast aggregation
```

### API Endpoints Used

| Endpoint | Purpose |
|---|---|
| `/weather` | Fetches real-time current conditions |
| `/forecast` | Returns 3-hour interval data, aggregated into daily highs/lows in `helpers.js` |

The background gradient is determined by mapping OpenWeatherMap condition codes (`clear`, `clouds`, `rain`, `thunderstorm`, `snow`, etc.) to a curated color palette defined in `helpers.js`.

---

## 📋 Known Limitations

- Free tier API is capped at **60 calls per minute**
- The 5-day forecast is derived from **3-hour interval data**, not a native daily endpoint
- **No offline caching** — an active internet connection is required
- Docker + Expo tunnel requires a stable internet connection for QR code scanning

---

## 🗺️ Roadmap

- [ ] Web version with React + Vite, deployed on Vercel
- [ ] Auto-detect current location on app open
- [ ] Hourly forecast using OWM 3-hour interval data
- [ ] Save favourite cities with AsyncStorage
- [ ] UV index and air quality via One Call API
- [ ] Light and dark theme toggle
- [ ] Animated weather icons
- [ ] Offline caching with local storage

---

## 👤 Author

Shobhit Jain
B.Tech Computer Science · Galgotias University

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Made with ☁️ and ☕ by Shobhit Jain

</div>
