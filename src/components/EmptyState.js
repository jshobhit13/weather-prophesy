import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmptyState({ error }) {
  if (error) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.errIcon}>⚠️</Text>
        <Text style={styles.errTitle}>Oops!</Text>
        <Text style={styles.errMsg}>{error}</Text>
      </View>
    );
  }
  return (
    <View style={styles.wrap}>
      <Text style={styles.icon}>🌍</Text>
      <Text style={styles.title}>Search for a City</Text>
      <Text style={styles.sub}>Type any city name or tap a quick suggestion above.</Text>
      <View style={styles.box}>
        <Text style={styles.hint}>Try: London · Tokyo · New York · Mumbai</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  icon: { fontSize: 64, marginBottom: 16 },
  title: { color: '#e6edf3', fontSize: 22, fontWeight: '700', marginBottom: 8 },
  sub: { color: '#7d8590', fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  box: {
    backgroundColor: '#161b22', borderWidth: 1, borderColor: '#30363d',
    borderRadius: 12, padding: 16,
  },
  hint: { color: '#7d8590', fontSize: 13, textAlign: 'center' },
  errIcon: { fontSize: 52, marginBottom: 12 },
  errTitle: { color: '#f85149', fontSize: 20, fontWeight: '700', marginBottom: 8 },
  errMsg: { color: '#7d8590', fontSize: 14, textAlign: 'center', lineHeight: 22 },
});
