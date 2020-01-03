import React, {useContext, useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {CalendarContext, UserContext} from '../store/Context';
import {Card} from 'react-native-elements';

interface Props {}

const Events: React.FC<Props> = () => {
  const {calendarId} = useContext(CalendarContext);
  const {googleApi} = useContext(UserContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // googleApi
    console.log({calendarId});
    // make requests for events

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView>
      <View>
        {events.map(event => (
          <Card title={'Hello card'}>
            <Text>{'Event contents.'}</Text>
          </Card>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Events;
