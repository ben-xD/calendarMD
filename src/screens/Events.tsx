import React, {useContext, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {CalendarContext, UserContext} from '../store/Context';
import {Card, Button, ListItem, SearchBar} from 'react-native-elements';
import Axios from 'axios';

interface Props {}

const Events: React.FC<Props> = () => {
  const {calendarId, calendarName} = useContext(CalendarContext);
  const {accessToken} = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [searchString, setSearchString] = useState('');

  const fetchEvents = async () => {
    // TODO im making this request all the time? How to refactor instance. Tried for 5 hours
    const headers = {Authorization: `Bearer ${accessToken}`};
    const instance = Axios.create({
      baseURL: 'https://www.googleapis.com/calendar/v3',
      headers,
    });

    try {
      const response = await instance.get(
        `/calendars/${calendarId}/events?q=${searchString}`,
      );
      if (response) {
        console.log({response});
        setEvents(response.data.items);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEvents = async () => {
    // const {accessToken} = await GoogleSignin.getTokens();
    const headers = {Authorization: `Bearer ${accessToken}`};
    const instance = Axios.create({
      baseURL: 'https://www.googleapis.com/calendar/v3',
      headers,
    });

    events.map(event => {
      try {
        instance.delete(`/calendars/${calendarId}/events/${event.id}`);
        setEvents(events => events.filter(e => e.id != event.id))
      } catch (err) {
        // store errors, and display at the end
        console.log(err);
      }
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {events.length > 5 ? (
            <Card containerStyle={{backgroundColor: '#999999'}}>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  fontStyle: 'italic',
                  color: 'white',
                }}>
                Scroll to the bottom to delete all.
              </Text>
            </Card>
          ) : (
            <></>
          )}
          <Card>
              
              <Text style={{
                fontSize: 24,
                textAlign: 'center',
              }}>
              {calendarId == "" ? "set calendar at Calendars tab" : `Calendar: ${calendarName}`}
              </Text>
          </Card>
        </View>
        <SearchBar
          placeholder="Dinner with Elon Musk"
          lightTheme={true}
          onChangeText={value => setSearchString(value)}
          value={searchString}
        />
        <Button
          containerStyle={styles.buttonContainer}
          onPress={fetchEvents}
          title="Search for events"
        />
        {events.map(event => (<ListItem key={event.id} title={event.summary} />))}
        {events.length === 0 ? (
          <Text>No events</Text>
        ) : (
          <Button
            containerStyle={styles.buttonContainer}
            onPress={deleteEvents}
            title="Delete events"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Events;

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 8,
  },
});
