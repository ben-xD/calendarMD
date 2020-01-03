import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {CalendarContext, UserContext} from '../store/Context';
import {Input, Button} from 'react-native-elements';
import {GoogleAuthenticator} from 'google-calendar-bulk-delete';
import Tabs from '../containers/Tabs';

interface Props {}

const Calendars: React.FC<Props> = () => {
  const getCalendars = calendarId => {
    console.log(`yay ${calendarId}`);
    // why can't i import my GoogleAuthenticator in here.
    // TODO use GoogAuth custom lib :D
    // GoogleAuthenticator.
  };

  useEffect(() => {
    // TODO make request for calendars, and display them.
  }, []);

  const [calenderIdInput, setCalenderIdInput] = useState('');

  const changeCalendarInputHandler = calendarId => {};

  const submitChangeCalendar = (calendarId, setCalendarId) => {
    setCalenderIdInput();
  };

  return (
    <UserContext.Consumer>
      {({user}) => (
        <SafeAreaView>
          <ScrollView style={styles.container}>
            <CalendarContext.Consumer>
              {value => (
                <View>
                  <Text>{JSON.stringify(user)}</Text>
                  <Text>Current calendar ID: {value.calendarId}</Text>
                  <Input
                    placeholder="CalendarID"
                    onChangeText={textInput => setCalenderIdInput(textInput)}
                  />
                  <Button
                    title="Get calendars"
                    onPress={() => value.setCalendarId(calenderIdInput)}
                  />
                </View>
              )}
            </CalendarContext.Consumer>
          </ScrollView>
        </SafeAreaView>
      )}
    </UserContext.Consumer>
  );
};

export default Calendars;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
