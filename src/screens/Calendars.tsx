import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, View, Text, ScrollView, StyleSheet} from 'react-native';
import {CalendarContext, UserContext} from '../store/Context';
import {Button, Card} from 'react-native-elements';
import {GoogleSignin} from '@react-native-community/google-signin';
import Axios from 'axios';

interface Props {}

const Calendars: React.FC<Props> = ({navigation}) => {
  const [calendars, setCalendars] = useState([]);
  const {calendarId, setCalendarId} = React.useContext(CalendarContext);

  const changeCalendar = (calendarId, setCalendarId) => {
    setCalendarId(calendarId);
    navigation.navigate('Events');
  };

  useEffect(() => {
    fetchCalendars();
  }, []);

  const fetchCalendars = async () => {
    // TODO im making this request all the time? How to refactor instance. Tried for 5 hours
    const {accessToken} = await GoogleSignin.getTokens();
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
      console.log(err);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View>
          <Text>
            {calendarId === ''
              ? 'No calendar set'
              : `Current calendar ID: ${calendarId}`}
          </Text>
          <Text>Available calendars on your Google Account:</Text>
          {calendars.map(calendar => (
            <Card key={calendar.id} title={calendar.summary}>
              <Text>{calendar.id}</Text>
              <Button
                onPress={() => changeCalendar(calendar.id, setCalendarId)}
                title="Select events"
              />
            </Card>
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
});
