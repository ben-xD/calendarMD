import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, View, Text, ScrollView, StyleSheet} from 'react-native';
import {CalendarContext, UserContext} from '../store/Context';
import {Button, Card} from 'react-native-elements';
import {GoogleSignin} from '@react-native-community/google-signin';
import Axios from 'axios';

interface Props {}

const Calendars: React.FC<Props> = ({navigation}) => {
  const [calendars, setCalendars] = useState([]);
  const {setCalendarId, setCalendarName} = React.useContext(CalendarContext);
  const {user} = React.useContext(UserContext);

  const changeCalendar = (calendar, setId) => {
    setId(calendar.id);
    setCalendarName(calendar.summary);
    navigation.navigate('Events');
  };

  useEffect(() => {
    fetchCalendars();
  }, [navigation, user]);

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
          <View>
            <Card>
              <Text
                style={{
                  fontSize: 16,
                }}>
                {`Hi ${
                  user ? user.user.givenName : ''
                }, choose a calendar to search for events to delete:`}
              </Text>
            </Card>
          </View>
          <Card>
            {calendars.map(calendar => (
              <Button
                style={{margin: 5}}
                key={calendar.id}
                onPress={() => changeCalendar(calendar, setCalendarId)}
                title={calendar.summary}
              />
            ))}
          </Card>
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
