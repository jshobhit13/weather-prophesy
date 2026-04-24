import React, { useState } from 'react';
import {
  View, TextInput, TouchableOpacity,
  Text, StyleSheet, ActivityIndicator, Keyboard, ScrollView,
} from 'react-native';

const QUICK = ['London', 'Tokyo', 'New York', 'Mumbai', 'Paris', 'Sydney'];

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');

  const submit = () => {
    if (!query.trim()) return;
    Keyboard.dismiss();
    onSearch(query.trim());
  };

  const quick = (city) => {
    setQuery(city);
    Keyboard.dismiss();
    onSearch(city);
  };

  return (
    <View style={styles.wrap}>
      {/* Input row */}
      <View style={styles.row}>
        <Text style={styles.icon}>🔍</Text>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search city…"
          placeholderTextColor="#4a5568"
          returnKeyType="search"
          onSubmitEditing={submit}
          autoCorrect={false}
          autoCapitalize="words"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} style={styles.clearBtn}>
            <Text style={styles.clearTxt}>✕</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.btn, loading && styles.btnDim]}
          onPress={submit}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading
            ? <ActivityIndicator size="small" color="#0d1117" />
            : <Text style={styles.btnTxt}>Search</Text>
          }
        </TouchableOpacity>
      </View>
      {recentCities.map((city, index) => (
    <Text key={index} onPress={() => handleSearch(city)}>
        {city}
    </Text>
))}
      {/* Quick chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
        {QUICK.map((city) => (
          <TouchableOpacity key={city} style={styles.chip} onPress={() => quick(city)} activeOpacity={0.7}>
            <Text style={styles.chipTxt}>{city}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  row: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#161b22', borderWidth: 1, borderColor: '#30363d',
    borderRadius: 12, paddingHorizontal: 12, height: 50, marginBottom: 10,
  },
  icon: { fontSize: 16, marginRight: 8 },
  input: { flex: 1, color: '#e6edf3', fontSize: 15 },
  clearBtn: { padding: 6 },
  clearTxt: { color: '#7d8590', fontSize: 16 },
  btn: {
    backgroundColor: '#58a6ff', borderRadius: 8,
    paddingHorizontal: 16, paddingVertical: 8, minWidth: 72, alignItems: 'center',
  },
  btnDim: { opacity: 0.6 },
  btnTxt: { color: '#0d1117', fontWeight: '700', fontSize: 13 },
  chips: { flexDirection: 'row' },
  chip: {
    borderWidth: 1, borderColor: '#30363d', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 6,
    backgroundColor: '#161b22', marginRight: 8,
  },
  chipTxt: { color: '#7d8590', fontSize: 12 },
});
