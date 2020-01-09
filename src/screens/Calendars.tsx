import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {CalendarContext, UserContext} from '../store/Context';
import Axios from 'axios';
import {ListItem} from 'react-native-elements';

interface Props {}

const Calendar = ({calendar, changeCalendar}) => {
  const {id, summary} = calendar;
  return (
    <ListItem
      title={summary}
      bottomDivider
      chevron
      onPress={() => changeCalendar(calendar)}
    />
  );
};

const Calendars: React.FC<Props> = ({navigation}) => {
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(true);
  const {setCalendarId, setCalendarName} = React.useContext(CalendarContext);
  const {user, accessToken} = React.useContext(UserContext);

  const changeCalendar = calendar => {
    setCalendarId(calendar.id);
    setCalendarName(calendar.summary);
    navigation.navigate('Events');
  };

  useEffect(() => {
    let isCancelled = false;
    const source = Axios.CancelToken.source();

    const fetchCalendars = async () => {
      setLoading(true);

      const headers = {Authorization: `Bearer ${accessToken}`};
      const instance = Axios.create({
        baseURL: 'https://www.googleapis.com/calendar/v3',
        headers,
      });
      try {
        const response = await instance.get('/users/me/calendarList', {
          cancelToken: source.token,
        });
        if (!isCancelled && response) {
          setCalendars(response.data.items);
        }
      } catch (err) {
        console.log({err});
      }
      setLoading(false);
    };

    if (accessToken) {
      fetchCalendars();
    }
    return () => {
      isCancelled = true;
      source.cancel('Cancel it');
    };
  }, [accessToken]);

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {`Welcome, ${user ? user.user.givenName : ''}`}
        </Text>
        <Text>choose a calendar to edit.</Text>
      </View>
      <FlatList
        style={{height: '100%'}}
        data={calendars}
        keyExtractor={calendar => calendar.id}
        renderItem={({item}) => (
          <Calendar calendar={item} changeCalendar={changeCalendar} />
        )}
      />
    </SafeAreaView>
  );
};

export default Calendars;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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
