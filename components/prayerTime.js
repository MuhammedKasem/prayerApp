import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

const PrayerTime = () => {
  let [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.aladhan.com/v1/timingsByCity?city=Rocky Mount&country=United%20States&method=2s', { method: 'GET', mode: 'cors' })
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
  return (
    data ?
      <View style={styles.container}>
        <View style={styles.Header}>
          <Text style={styles.sectionTitle}>Prayer Times</Text>
          <Text style={styles.date}>{data.date.gregorian.weekday.en}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.timeTxt}>Fajr: </Text>
          <Text style={styles.time}>{tConvert(data.timings.Fajr)}</Text>
          <Text style={styles.timeTxt}>Dhuhr: </Text>
          <Text style={styles.time}>{tConvert(data.timings.Dhuhr)}</Text>
          <Text style={styles.timeTxt}>Asr:</Text>
          <Text style={styles.time}>{tConvert(data.timings.Asr)}</Text>
          <Text style={styles.timeTxt}>Maghrib:</Text>
          <Text style={styles.time}>{tConvert(data.timings.Maghrib)}</Text>
          <Text style={styles.timeTxt}>Isha:</Text>
          <Text style={styles.time}>{tConvert(data.timings.Isha)}</Text>
        </View>
        <StatusBar style="auto" />
      </View> : <Text></Text>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 30,
    borderRadius: 40,
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Header: {
    flex: 'column',
    padding: 20,
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 20,
    borderColor: 'gold',
  },
  item: {
    padding: 15,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  time: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'gold',
    marginTop: 20,
  },
  timeTxt: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  date: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default PrayerTime
