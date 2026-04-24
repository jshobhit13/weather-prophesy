export const weatherEmoji = (desc = '') => {
  const d = desc.toLowerCase();
  if (d.includes('thunder'))                        return '⛈️';
  if (d.includes('heavy rain'))                     return '🌧️';
  if (d.includes('rain') || d.includes('drizzle')) return '🌦️';
  if (d.includes('snow') || d.includes('sleet'))   return '❄️';
  if (d.includes('mist') || d.includes('fog') || d.includes('haze')) return '🌫️';
  if (d.includes('overcast'))                       return '☁️';
  if (d.includes('cloud'))                          return '⛅';
  if (d.includes('clear'))                          return '☀️';
  return '🌤️';
};

export const windDir = (deg = 0) => {
  const dirs = ['N','NE','E','SE','S','SW','W','NW'];
  return dirs[Math.round(deg / 45) % 8];
};

export const toTime = (unix) =>
  new Date(unix * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

export const gradient = (desc = '') => {
  const d = desc.toLowerCase();
  if (d.includes('thunder'))                        return ['#1a1a2e','#2d1b4e'];
  if (d.includes('rain') || d.includes('drizzle')) return ['#0d1b2a','#1b3a52'];
  if (d.includes('snow'))                           return ['#1a2535','#2a3f55'];
  if (d.includes('fog') || d.includes('mist'))     return ['#1a1f2e','#2a2f3e'];
  if (d.includes('cloud'))                          return ['#131b2e','#1c2a40'];
  return ['#0f1f3d','#1a3a5c'];
};
// src/services/helpers.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'recentCities';

export const saveCity = async (city) => {
    try {
        let cities = JSON.parse(await AsyncStorage.getItem(KEY)) || [];

        if (!cities.includes(city)) {
            cities.unshift(city);
        }

        if (cities.length > 5) {
            cities.pop();
        }

        await AsyncStorage.setItem(KEY, JSON.stringify(cities));
    } catch (e) {
        console.log(e);
    }
};

export const getRecentCities = async () => {
    try {
        const data = await AsyncStorage.getItem(KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.log(e);
        return [];
    }
};