import React from 'react';
import {StyleSheet, ActivityIndicator, View} from 'react-native';

interface Props {}

const Loading: React.FC<Props> = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
