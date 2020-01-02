import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

interface Props {}

const Events: React.FC<Props> = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Events go here.</Text>
      </View>
    </SafeAreaView>
  );
};

export default Events;
