import React from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  StatusBar, RefreshControl, ActivityIndicator,
} from 'react-native';
import { saveCity, getRecentCities } from '../services/helpers';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import CurrentWeather from '../components/CurrentWeather';
import ForecastRow from '../components/ForecastRow';
import EmptyState from '../components/EmptyState';
import { useWeather } from '../hooks/useWeather';
const [recentCities, setRecentCities] = useState([]);

export default function HomeScreen() {
  const { current, forecast, loading, error, search } = useWeather();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      <View style={styles.header}>
        <Text style={styles.title}>🌤️ Weather</Text>
        <Text style={styles.sub}>Real-time forecasts</Text>
      </View>

      <SearchBar onSearch={search} loading={loading} />

      {loading && !current ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#58a6ff" />
          <Text style={styles.loadTxt}>Fetching weather…</Text>
        </View>
      ) : current ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => search(current.name)}
              tintColor="#58a6ff"
            />
          }
        >
          <CurrentWeather data={current} />
          <View style={{ height: 12 }} />
          <ForecastRow data={forecast} />
        </ScrollView>
      ) : (
        <EmptyState error={error} />
      )}
    </SafeAreaView>
  );
}
{loading && <Text>Loading...</Text>}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0d1117' },
  header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  title: { color: '#e6edf3', fontSize: 26, fontWeight: '800' },
  sub: { color: '#7d8590', fontSize: 13, marginTop: 1 },
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadTxt: { color: '#7d8590', fontSize: 14 },
});

const handleSearch = async (city) => {
    await saveCity(city);
    fetchWeather(city); // your existing function
};

useEffect(() => {
    const loadCities = async () => {
        const cities = await getRecentCities();
        setRecentCities(cities);
    };

    loadCities();
}, []);