import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, SafeAreaView, Animated, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import { UserContext } from '../store/Context';
import styled from 'styled-components/native';

interface Props { }

const Login: React.FC<Props> = () => {
  const { setUser, setToken } = useContext(UserContext);
  const [signinInProgress, setSigninInProgress] = useState(false);
  const [opacity] = useState(new Animated.Value(0));

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

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <ImageBackground
      style={[styles.image]}
      source={require('../../assets/img/bed-coffee.jpg')}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Animated.View style={[styles.headerContainer, { opacity }]}>
            <Title style={{ fontSize: 48, color: 'orange' }}>BED!</Title>
            <Title style={{ marginBottom: 12 }}>Bulk event deleter</Title>
          </Animated.View>
          <View style={styles.buttonContainer}>
            <GoogleSigninButton
              style={styles.button}
              onPress={loginHandler}
              size={GoogleSigninButton.Size.Wide}
              disabled={signinInProgress}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '15%',
  },
  headerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 16,
    paddingHorizontal: 32,
  },
  image: {
    height: '100%',
    width: '100%',
    flex: 1,
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

const Title = styled.Text`
  font-size: 24;
  text-align: center;
  font-weight: 100;
  font-family: McLaren-Regular;
  color: grey;
`;
