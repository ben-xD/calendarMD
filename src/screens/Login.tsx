import React, {useEffect, useState, useContext} from 'react';
import {View, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet} from 'react-native';
import {Button, Card, Text, Header} from 'react-native-elements';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {UserContext} from '../store/Context';
import Axios from 'axios';

interface Props {}

const Login: React.FC<Props> = () => {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const {axiosInstance, setAxiosInstance, setUser, user} = useContext(
    UserContext,
  );

  const prepareAxios = async () => {
    // TODO im making this request all the time?
    const {accessToken} = await GoogleSignin.getTokens();
    const headers = {Authorization: `Bearer ${accessToken}`};
    const instance = Axios.create({
      baseURL: 'https://www.googleapis.com/calendar/v3',
      headers,
    });
    setAxiosInstance(instance);
  };

  const loginHandler = async () => {
    // const userCredentialString = await AsyncStorage.getItem('userCredentials');
    // if (userCredentialString) {
    //   setUser(JSON.parse(userCredentialString));
    // }
    setIsSigninInProgress(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo);
      setIsSigninInProgress(false);
      await AsyncStorage.setItem('userCredentials', JSON.stringify(userInfo));
      await prepareAxios();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <>
      <Header
        centerComponent={{
          text: 'BED',
          style: {color: 'white', fontSize: 24},
        }}
      />
      <View style={styles.container}>
        <Text h3 style={styles.header}>
          Bulk event deleter for Google Calendar
        </Text>
        <Card dividerStyle={{alignItems: 'center'}}>
          <Text style={styles.text}>
            This app lets you delete many events at once on your Google
            Calendar. You need to login with Google to use this app.
          </Text>
          <Text>User: {JSON.stringify(user)}</Text>
          <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={loginHandler}
            disabled={isSigninInProgress}
          />
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
