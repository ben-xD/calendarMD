import React, {useContext, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {CalendarContext, UserContext} from '../store/Context';
import {Card, Button, Input} from 'react-native-elements';
import {GoogleSignin} from '@react-native-community/google-signin';
import Axios from 'axios';

interface Props {}

const Events: React.FC<Props> = () => {
  const {calendarId, calendarName} = useContext(CalendarContext);
  const [events, setEvents] = useState([]);
  const [searchString, setSearchString] = useState('');

  const fetchEvents = async () => {
    // TODO im making this request all the time? How to refactor instance. Tried for 5 hours
    const {accessToken} = await GoogleSignin.getTokens();
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
    const {accessToken} = await GoogleSignin.getTokens();
    const headers = {Authorization: `Bearer ${accessToken}`};
    const instance = Axios.create({
      baseURL: 'https://www.googleapis.com/calendar/v3',
      headers,
    });

    // do a deep copy, not just a reference
    const workingSet = events;
    let deletedEventIds = [];
    workingSet.map(event => {
      try {
        console.log(`Deleting ${event.id}`);
        instance.delete(`/calendars/${calendarId}/events/${event.id}`);
      } catch (err) {
        console.log(err);
      }
      deletedEventIds.push(event.id);
      console.log(
        `deleted ${event.id}, deleted events: ${JSON.stringify(
          deletedEventIds,
        )}`,
      );
    });
    console.log('deleted');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Card>
            <Text
              style={{
                fontSize: 24,
                textAlign: 'center',
              }}>
              {`Calendar: ${calendarName}`}
            </Text>
          </Card>
        </View>
        <Text />
        <Input
          placeholder="Dinner with Elon Musk"
          onChangeText={value => setSearchString(value)}
        />
        <Button onPress={fetchEvents} title="Search for events" />
        {events.length > 5 ? (
          <Card>
            <Text
              style={{
                fontSize: 16,
              }}>
              Scroll down to find delete button! The more events you wanna
              delete, the harder you gotta work! (A security feature!)
            </Text>
          </Card>
        ) : (
          <></>
        )}
        {events.map(event => (
          <Card key={event.id} title={event.summary}>
            <Text>Date: {event.start.dateTime}</Text>
          </Card>
        ))}
        {events.length == 0 ? <Text>No events</Text> : <></>}
        <Button onPress={deleteEvents} title="Delete events" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Events;
