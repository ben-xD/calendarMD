import React from 'react';
import {SafeAreaView, View, Text, TextInput} from 'react-native';
import Context from '../store/Context';
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

  return (
    <SafeAreaView>
      <View>
        <Context.Consumer>
          {value => (
            <View>
              <Text>{value.calendarId}</Text>
              <Input
                placeholder="CalendarID"
                onChangeText={t => value.setCalendarId(t)}
              />
              <Button
                title="Get calendars"
                onPress={() => getCalendars(value.calendarId)}
              />
            </View>
          )}
        </Context.Consumer>
      </View>
    </SafeAreaView>
  );
};

export default Calendars;
