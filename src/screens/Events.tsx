import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Platform,
  FlatList,
} from 'react-native';
import {CalendarContext, UserContext} from '../store/Context';
import {Button, ListItem, SearchBar} from 'react-native-elements';
import Axios from 'axios';
import NoEvents from '../components/NoEvents';

interface Props {}

const Events: React.FC<Props> = () => {
  const {calendarId} = useContext(CalendarContext);
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

    // TODO navigate to confirmation window
    events.map(event => {
      instance
        .delete(`/calendars/${calendarId}/events/${event.id}`)
        .catch(response => {
          // dispatch an alert/ toast/ notification to user about failed request
          console.log(response);
          fetchEvents();
        });
      setEvents(events => events.filter(e => e.id != event.id));
    });
  };

  return (
    <>
      <SearchBar
        platform={Platform.OS as ('ios' | 'android')}
        placeholder="Maths lectures"
        lightTheme={true}
        onChangeText={value => setSearchString(value)}
        value={searchString}
        onSubmitEditing={fetchEvents}
      />
      {events.length === 0 ? (
        <NoEvents />
      ) : (
        <>
          <FlatList
            data={events}
            renderItem={({item}) => (
              <ListItem
                style={{width: '100%'}}
                key={item.id}
                title={item.summary}
                bottomDivider
                topDivider
              />
            )}
            ListFooterComponent={
              <Button
                containerStyle={styles.buttonContainer}
                onPress={deleteEvents}
                title="Delete events"
              />
            }
          />
        </>
      )}
    </>
  );
};

export default Events;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 8,
    width: '90%',
    alignSelf: 'center',
  },
});
