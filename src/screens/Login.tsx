import React, {useState, useContext} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet} from 'react-native';
import {Card, Text, Header} from 'react-native-elements';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {UserContext} from '../store/Context';

interface Props {}

const Login: React.FC<Props> = () => {
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const {setUser} = useContext(UserContext);

  const loginHandler = async () => {
    try {
      setIsSigninInProgress(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      await AsyncStorage.setItem('userLoggedIn', JSON.stringify(true));
      setUser(userInfo);
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
        <Card>
          <Text style={styles.text}>
            This app lets you delete many events at once on your Google
            Calendar. You need to login with Google to use this app.
          </Text>
          <GoogleSigninButton
            style={styles.signInButton}
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
  signInButton: {
    width: 192,
    height: 48,
  },
});
