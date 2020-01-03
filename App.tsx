import React, {useState, useEffect} from 'react';
import {NavigationNativeContainer} from '@react-navigation/native';

import {ThemeProvider} from 'react-native-elements';
import Tabs from './src/containers/Tabs';
import Login from './src/screens/Login';
import {GoogleSignin} from '@react-native-community/google-signin';
import {UserContext} from './src/store/Context';

const App = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/calendar'],
      webClientId:
        '947382191204-hb3cgjut9fa55la0dkncen2ljnstombr.apps.googleusercontent.com',
      offlineAccess: true,
      iosClientId:
        '947382191204-g0dgrhs41lqrrgig7qq86j0umthnl1qe.apps.googleusercontent.com',
    });

    // try to read token from asyncstorage
  }, []);

  return (
    <ThemeProvider>
      <NavigationNativeContainer>
        <UserContext.Provider value={{user, setUser}}>
          {!user ? <Login /> : <Tabs />}
        </UserContext.Provider>
      </NavigationNativeContainer>
    </ThemeProvider>
  );
};

export default App;
