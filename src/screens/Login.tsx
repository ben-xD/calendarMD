import React, { useState, useContext } from 'react';
import { View, SafeAreaView, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import { UserContext } from '../store/Context';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';


interface Props { }

const Login: React.FC<Props> = () => {
  const { setUser, setToken } = useContext(UserContext);
  const [signinInProgress, setSigninInProgress] = useState(false);

  const loginHandler = async () => {
    try {
      setSigninInProgress(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { accessToken } = await GoogleSignin.getTokens();
      setToken(accessToken);
      setSigninInProgress(false);
      await AsyncStorage.setItem('userLoggedIn', JSON.stringify(true));
      setUser(userInfo);
    } catch (error) {
      // setInternetEnabled passed into login, change it here. (add retry)
      setSigninInProgress(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log({ error });
      }
    }
  };

  return (
    <LinearGradient style={styles.container} colors={['#FF6B60', '#FFB528', '#FFB528']}>
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        <View style={[styles.headerContainer]}>
          <Subtitle style={{ fontSize: 40, color: 'white' }}>CalendarMD</Subtitle>
          <Subtitle style={{ marginBottom: 12, color: 'white' }}>mass deleter</Subtitle>
        </View>
        <Image style={styles.logo} source={require('../../assets/img/logo.png')}></Image>
        <View style={styles.buttonContainer}>
          <GoogleSigninButton
            style={styles.button}
            onPress={loginHandler}
            size={GoogleSigninButton.Size.Wide}
            disabled={signinInProgress}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    borderRadius: 16,
    marginTop: 32,
    paddingHorizontal: 32,
  },
  image: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  logo: {
    margin: 32,
    width: 300,
    height: 300
  },
  buttonContainer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '10%',
  },
  button: {
    width: 250,
    height: 65,
  },
});

const Subtitle = styled.Text`
  font-size: 24;
  text-align: center;
  font-weight: 100;
  font-family: Roboto;
  color: grey;
`;
