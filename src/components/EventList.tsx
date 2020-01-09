import React from 'react';
import NoEvents from './NoEvents';
import {Button, ListItem} from 'react-native-elements';
import {FlatList} from 'react-native';
import {StyleSheet} from 'react-native';

interface Props {}

const EventList: React.FC<Props> = ({events, deleteEvents}) => {
  return events.length === 0 ? (
    <NoEvents />
  ) : (
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
  );
};

export default EventList;

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 8,
    paddingHorizontal: 8,
    alignSelf: 'center',
    width: '100%',
  },
});
