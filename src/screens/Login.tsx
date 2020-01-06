import React, {useState, useContext} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {UserContext} from '../store/Context';

interface Props {}

const Login: React.FC<Props> = () => {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const {setUser, setToken} = useContext(UserContext);

  const loginHandler = async () => {
    try {
      setIsSigninInProgress(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {accessToken} = await GoogleSignin.getTokens();
      setUser(userInfo);
      setToken(accessToken);
      await AsyncStorage.setItem('userLoggedIn', JSON.stringify(true));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log({error});
      }
    }
    setIsSigninInProgress(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>BED</Text>
        <Text style={[styles.header, {fontSize: 24, fontStyle: 'italic'}]}>
          Bulk event deleter
        </Text>
      </View>
      <Text style={[styles.text, {fontWeight: '800', fontStyle: 'italic'}]}>
        3 steps:
      </Text>
      <Text style={styles.text}>1. Select calendar</Text>
      <Text style={styles.text}>2. Search events</Text>
      <Text style={styles.text}>3. Delete</Text>
      <GoogleSigninButton
        style={styles.signInButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={loginHandler}
        disabled={isSigninInProgress}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: '100%',
  },
  cardContainer: {
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: 16,
  },
  header: {
    fontWeight: '100',
    fontSize: 48,
    textAlign: 'center',
  },
  text: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: '400',
  },
  signInButton: {
    width: '95%',
    height: '10%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 16,
  },
});
