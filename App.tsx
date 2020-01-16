import React, { useState, useEffect, useCallback } from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { ThemeProvider } from 'react-native-elements';
import Tabs from './src/containers/Tabs';
import Login from './src/screens/Login';
import {
  GoogleSignin,
  User,
  statusCodes,
} from '@react-native-community/google-signin';
import { UserContext, UserContextInterface } from './src/store/Context';
import Axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import NoInternet from './src/screens/NoInternet';

const App = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [internetEnabled, setInternetEnabled] = useState(true);
  const [axiosInstance, setAxiosInstance] = useState<AxiosInstance | undefined>(
    undefined,
  );

  const emptyState = () => {
    setUser(undefined);
    setToken(undefined);
    setAxiosInstance(undefined);
  };

  // const unsubscribe =
  NetInfo.addEventListener(state => {
    if (state.isConnected && !internetEnabled) {
      setInternetEnabled(state.isConnected);
    } else if (!state.isConnected && internetEnabled) {
      setInternetEnabled(state.isConnected);
    }
  });

  const fetchUserFromStorage = useCallback(async () => {
    const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');

    if (userLoggedIn) {
      try {
        const userInfo = await GoogleSignin.signInSilently();
        const { accessToken } = await GoogleSignin.getTokens();
        Axios.interceptors.request.use(config => {
          console.log({ config });
          return config;
        });
        setToken(accessToken);
        setUser(userInfo);
      } catch (error) {
        console.log({ error });
        emptyState();
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('user cancelled the login flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('operation (e.g. sign in) is in progress already');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('play services not available or outdated');
        } else {
          console.log({ error });
        }
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/calendar'],
      webClientId:
        '947382191204-hb3cgjut9fa55la0dkncen2ljnstombr.apps.googleusercontent.com',
      offlineAccess: true,
      iosClientId:
        '947382191204-g0dgrhs41lqrrgig7qq86j0umthnl1qe.apps.googleusercontent.com',
    });
    fetchUserFromStorage();

    // TODO why doesn't this cause re-render?
    // setTimeout(() => {
    //   console.log("post set")
    //   setInternetEnabled(false);
    // }, 5000)
  }, [fetchUserFromStorage]);

  const UserContextValue: UserContextInterface = {
    user,
    setUser,
    axiosInstance,
    setAxiosInstance,
    accessToken: token,
    setToken,
    emptyState,
  };

  const theme = {
    colors: {
      primary: '#FF6B60',
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <NavigationNativeContainer>
        <UserContext.Provider value={UserContextValue}>
          {!internetEnabled ? (
            <NoInternet />
          ) : !loading && !user ? (
            <Login />
          ) : (
                <Tabs />
              )}
        </UserContext.Provider>
      </NavigationNativeContainer>
    </ThemeProvider>
  );
};

export default App;
