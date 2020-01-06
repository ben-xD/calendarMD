import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {UserContext} from '../store/Context';
import {GoogleSignin} from '@react-native-community/google-signin';

interface Props {}

const Settings: React.FC<Props> = () => {
  const {setUser, emptyState} = useContext(UserContext);

  const logoutHandler = () => {
    emptyState();
    GoogleSignin.signOut();
  };

  const revokeHandler = () => {
    emptyState();
    GoogleSignin.revokeAccess();
  };

  return (
    <SafeAreaView style={{padding: 8}}>
      <Text h4 style={{marginBottom: 8}}>
        Settings
      </Text>
      {/* TODO delete all state when logging out? */}
      <Button
        containerStyle={styles.buttonContainer}
        title="Log out"
        buttonStyle={[styles.button]}
        onPress={logoutHandler}
      />
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={[styles.button, styles.revokeButton]}
        title="Revoke app permissions"
        onPress={revokeHandler}
      />
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 8,
    marginTop: 0,
  },
  button: {
    height: 48,
  },
  revokeButton: {
    backgroundColor: '#bc0303',
  },
});
