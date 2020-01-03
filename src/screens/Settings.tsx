import React, {useContext} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import {Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {UserContext} from '../store/Context';

interface Props {}

const Settings: React.FC<Props> = () => {
  const {setUser} = useContext(UserContext);

  const logoutHandler = () => {
    setUser(undefined);
    AsyncStorage.removeItem('userCredentials');
  };

  return (
    <SafeAreaView>
      <Button title="Log out" onPress={logoutHandler} />
    </SafeAreaView>
  );
};

export default Settings;
