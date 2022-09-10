import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PrayerTime from "./components/prayerTime"

export default function App() {
  return (
    <View style={styles.container}>
      <PrayerTime />
      <StatusBar style="auto" />
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prayerWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  }
});
