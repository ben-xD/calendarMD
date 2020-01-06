import React, {useState, useCallback} from 'react';
import {SafeAreaView, View, Text, ScrollView, StyleSheet} from 'react-native';
import {CalendarContext, UserContext} from '../store/Context';
import {Button} from 'react-native-elements';
import Axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

interface Props {}

const Calendars: React.FC<Props> = ({navigation}) => {
  const [calendars, setCalendars] = useState([]);
  const {setCalendarId, setCalendarName} = React.useContext(CalendarContext);
  const {user, accessToken} = React.useContext(UserContext);

  const changeCalendar = (calendar, setId) => {
    setId(calendar.id);
    setCalendarName(calendar.summary);
    navigation.navigate('Events');
  };

  const memoizedFetchCalendars = useCallback(() => {
    const fetchCalendars = async () => {
      // TODO im making this request all the time? How to refactor instance. Tried for 5 hours
      const headers = {Authorization: `Bearer ${accessToken}`};
      const instance = Axios.create({
        baseURL: 'https://www.googleapis.com/calendar/v3',
        headers,
      });
      try {
        const response = await instance.get('/users/me/calendarList');
        if (response) {
          setCalendars(response.data.items);
        }
      } catch (err) {
        console.log({err});
      }
    };

    if (accessToken) {
      fetchCalendars();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useFocusEffect(memoizedFetchCalendars);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {`Welcome, ${user ? user.user.givenName : ''}`}
            </Text>
            <Text>choose a calendar to search for events to delete:</Text>
          </View>
          {calendars.map(calendar => (
            <Button
              containerStyle={styles.buttonContainer}
              key={calendar.id}
              onPress={() => changeCalendar(calendar, setCalendarId)}
              title={calendar.summary}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Calendars;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  titleContainer: {
    margin: 8,
  },
  title: {
    fontSize: 24,
  },
  calendarsContainer: {
    padding: 8,
  },
  buttonContainer: {
    margin: 8,
    marginTop: 0,
  },
});
