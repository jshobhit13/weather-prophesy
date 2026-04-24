const API_KEY = 'efa43d0cbf2793a0b4f576493db17704';
const BASE = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = async (city) => {
  const res = await fetch(`${BASE}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'City not found');
  return data;
};

export const fetchForecast = async (city) => {
  const res = await fetch(`${BASE}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Forecast unavailable');
  return data;
};

export const parseForecast = (data) => {
  const daily = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    const hour = parseInt(item.dt_txt.split(' ')[1]);
    if (!daily[date] || Math.abs(hour - 12) < Math.abs(parseInt(daily[date].dt_txt.split(' ')[1]) - 12)) {
      daily[date] = item;
    }
  });
  const today = new Date().toISOString().split('T')[0];
  return Object.entries(daily)
    .filter(([d]) => d > today)
    .slice(0, 5)
    .map(([date, item]) => ({
      date,
      day: new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' }),
      temp: Math.round(item.main.temp),
      high: Math.round(item.main.temp_max),
      low: Math.round(item.main.temp_min),
      desc: item.weather[0].description,
      humidity: item.main.humidity,
    }));
};
