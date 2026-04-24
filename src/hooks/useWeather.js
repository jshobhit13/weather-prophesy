import { useState, useCallback } from 'react';
import { fetchWeather, fetchForecast, parseForecast } from '../services/weatherApi';

export const useWeather = () => {
  const [current, setCurrent]   = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const search = useCallback(async (city) => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const [cur, fore] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city),
      ]);
      setCurrent(cur);
      setForecast(parseForecast(fore));
    } catch (e) {
      const msg = e.message?.toLowerCase();
      if (msg?.includes('not found') || msg?.includes('404')) {
        setError(`"${city}" not found. Check the spelling.`);
      } else if (msg?.includes('network') || msg?.includes('fetch')) {
        setError('No internet connection.');
      } else {
        setError('Something went wrong. Try again.');
      }
      setCurrent(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }, []);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    setLoading(true);

    try {
        // your API call
    } catch (e) {
        console.log(e);
    }

    setLoading(false);
};

  return { current, forecast, loading, error, search };
};
