import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { weatherEmoji } from '../services/helpers';

export default function ForecastRow({ data }) {
  if (!data || data.length === 0) return null;
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>5-Day Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((day, i) => (
          <View key={day.date} style={[styles.tile, i === 0 && styles.tileFirst]}>
            <Text style={[styles.day, i === 0 && styles.dayFirst]}>
              {i === 0 ? 'Tmrw' : day.day}
            </Text>
            <Text style={styles.icon}>{weatherEmoji(day.desc)}</Text>
            <Text style={styles.temp}>{day.temp}°C</Text>
            <Text style={styles.hi}>↑{day.high}°</Text>
            <Text style={styles.lo}>↓{day.low}°</Text>
            <Text style={styles.hum}>💧{day.humidity}%</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, marginBottom: 32 },
  title: {
    color: '#7d8590', fontSize: 11, fontWeight: '600',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10,
  },
  tile: {
    backgroundColor: '#161b22', borderWidth: 1, borderColor: '#30363d',
    borderRadius: 14, padding: 14, alignItems: 'center',
    minWidth: 88, marginRight: 8,
  },
  tileFirst: { borderColor: 'rgba(88,166,255,0.4)', backgroundColor: '#0f1f3d' },
  day: { color: '#7d8590', fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  dayFirst: { color: '#58a6ff' },
  icon: { fontSize: 28, marginVertical: 6 },
  temp: { color: '#e6edf3', fontSize: 16, fontWeight: '700' },
  hi: { color: '#e3b341', fontSize: 11, marginTop: 4 },
  lo: { color: '#58a6ff', fontSize: 11, marginTop: 2 },
  hum: { color: '#7d8590', fontSize: 10, marginTop: 4 },
});
