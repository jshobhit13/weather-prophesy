import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { weatherEmoji, windDir, toTime, gradient } from '../services/helpers';

export default function CurrentWeather({ data }) {
  if (!data) return null;

  const desc     = data.weather[0].description;
  const temp     = Math.round(data.main.temp);
  const feels    = Math.round(data.main.feels_like);
  const tMin     = Math.round(data.main.temp_min);
  const tMax     = Math.round(data.main.temp_max);
  const humidity = data.main.humidity;
  const wind     = Math.round(data.wind.speed * 3.6);
  const wDir     = windDir(data.wind?.deg ?? 0);
  const vis      = Math.round((data.visibility ?? 10000) / 1000);
  const sunrise  = toTime(data.sys.sunrise);
  const sunset   = toTime(data.sys.sunset);
  const location = `${data.name}, ${data.sys.country}`;
  const colors   = gradient(desc);

  return (
    <View style={styles.wrap}>
      {/* Hero */}
      <LinearGradient colors={colors} style={styles.hero} start={{x:0,y:0}} end={{x:1,y:1}}>
        <Text style={styles.location}>📍 {location}</Text>
        <Text style={styles.emoji}>{weatherEmoji(desc)}</Text>
        <View style={styles.tempRow}>
          <Text style={styles.temp}>{temp}</Text>
          <Text style={styles.unit}>°C</Text>
        </View>
        <Text style={styles.desc}>{desc.charAt(0).toUpperCase() + desc.slice(1)}</Text>
        <Text style={styles.minmax}>↑ {tMax}°  ↓ {tMin}°</Text>
      </LinearGradient>

      {/* Stats */}
      <View style={styles.grid}>
        <Stat icon="💧" label="Humidity"   value={`${humidity}%`} />
        <Stat icon="💨" label="Wind"       value={`${wind} km/h ${wDir}`} />
        <Stat icon="🌡️" label="Feels Like" value={`${feels}°C`} />
        <Stat icon="👁️" label="Visibility" value={`${vis} km`} />
        <Stat icon="🌅" label="Sunrise"    value={sunrise} />
        <Stat icon="🌇" label="Sunset"     value={sunset} />
      </View>
    </View>
  );
}

function Stat({ icon, label, value }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, marginTop: 8 },
  hero: {
    borderRadius: 20, padding: 24, alignItems: 'center',
    marginBottom: 12, borderWidth: 1, borderColor: 'rgba(88,166,255,0.15)',
  },
  location: { color: '#58a6ff', fontSize: 14, fontWeight: '600', marginBottom: 4 },
  emoji: { fontSize: 70, marginVertical: 8 },
  tempRow: { flexDirection: 'row', alignItems: 'flex-start' },
  temp: { color: '#e6edf3', fontSize: 80, fontWeight: '200', lineHeight: 88 },
  unit: { color: '#7d8590', fontSize: 28, marginTop: 16 },
  desc: { color: '#a0aec0', fontSize: 16, marginTop: 4, textTransform: 'capitalize' },
  minmax: { color: '#7d8590', fontSize: 14, marginTop: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  stat: {
    width: '31%', backgroundColor: '#161b22', borderWidth: 1,
    borderColor: '#30363d', borderRadius: 12, padding: 12, alignItems: 'center',
  },
  statIcon: { fontSize: 22, marginBottom: 4 },
  statLabel: { color: '#7d8590', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
  statValue: { color: '#e6edf3', fontSize: 13, fontWeight: '600', marginTop: 2, textAlign: 'center' },
});
