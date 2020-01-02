import React, {useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import {StyleSheet} from 'react-native';
import {Button, Card, Text, Header} from 'react-native-elements';

interface Props {}

const Login: React.FC<Props> = () => {
  return (
    <>
      <Header
        centerComponent={{text: 'BED', style: {color: 'white', fontSize: 24}}}
      />
      <View style={styles.container}>
        <Text h3 style={styles.header}>
          Bulk event deleter for Google Calendar
        </Text>
        <Card>
          <Text style={styles.text}>
            This app lets you delete many events at once on your Google
            Calendar. You need to login with Google to use this app.
          </Text>
        </Card>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontWeight: '100',
    textAlign: 'center',
  },
  text: {
    marginBottom: 16,
  },
});
