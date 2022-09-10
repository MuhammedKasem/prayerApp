import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  let [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.aladhan.com/v1/timingsByCity?city=Henderson&country=United%20States&method=2s', { method: 'GET', mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data['data']);
      })
      .catch(err => {
        console.error(err)
        data = null;
      });
  }, [])

  function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1);  // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }
  return (data ?
    <View style={styles.container}>
      <View style={styles.prayerWrapper}>
      <Text>{data.date.gregorian.weekday.en}</Text>
      <Text>{tConvert(data.timings.Fajr)}</Text>
      </View>
      <StatusBar style="auto" />
    </View> : <Text></Text>
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
