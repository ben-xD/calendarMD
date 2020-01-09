import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

interface Props {}

const NoEvents: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lottie}
        resizeMode="cover"
        autoPlay
        loop
        speed={0.5}
        source={require('../../animations/5066-meeting-and-stuff.json')}
      />
      <Text style={styles.text}>{'Search for events to delete.'}</Text>
    </View>
  );
};

export default NoEvents;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  lottie: {
    position: 'relative',
    alignItems: 'center',
    paddingHorizontal: 0,
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'McLaren-Regular',
    fontSize: 24,
    fontWeight: '100',
    paddingHorizontal: 32,
    flex: 1,
  },
});
