import React, {useState} from 'react';
import {NavigationNativeContainer} from '@react-navigation/native';

import {ThemeProvider} from 'react-native-elements';
import Tabs from './src/containers/Tabs';
import Login from './src/screens/Login';

const App = () => {
  const [user, setUser] = useState(undefined);

  return (
    <ThemeProvider>
      <NavigationNativeContainer>
        {!user ? <Login /> : <Tabs />}
      </NavigationNativeContainer>
    </ThemeProvider>
  );
};

export default App;
