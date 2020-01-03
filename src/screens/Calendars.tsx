import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  CalendarContext,
  UserContext,
  UserContextInterface,
} from '../store/Context';
import {Input, Button, Card} from 'react-native-elements';
import {GoogleAuthenticator} from 'google-calendar-bulk-delete';
import Tabs from '../containers/Tabs';
import Axios from 'axios';
import {GoogleSignin} from '@react-native-community/google-signin';

interface Props {}

const Calendars: React.FC<Props> = ({navigation}) => {
  const [calenderIdInput, setCalenderIdInput] = useState('');
  const [calendars, setCalendars] = useState([]);
  const {user, axiosInstance} = useContext(UserContext);

  const changeCalendar = (calendarId, setCalendarId) => {
    setCalendarId(calendarId);
    navigation.navigate('Events');
  };

  const fetchCalendars = async axiosInstance => {
    try {
      const response = await axiosInstance.get('/users/me/calendarList');
      if (response) {
        console.info({response});
        const calendarsJson = response.data.items;
        setCalendars(calendarsJson);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log({axiosInstance});
    fetchCalendars(axiosInstance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, axiosInstance]);

  // const {user, setUser}: UserContextInterface = React.useContext(UserContext);
  const {
    calendarId,
    setCalendarId,
  }: CalendarContextInterface = React.useContext(CalendarContext);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View>
          <Text>Current calendar ID: {calendarId}</Text>
          <Text>Available calendars on your Google Account:</Text>
          {calendars.map(calendar => (
            <Card title={calendar.summary}>
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
