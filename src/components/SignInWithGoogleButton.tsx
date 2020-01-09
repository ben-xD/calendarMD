import React from 'react';
import {StyleSheet, TouchableHighlight, View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  loginHandler: () => void;
}

const SignInWithGoogleButton: React.FC<Props> = ({loginHandler}) => {
  return (
    <TouchableHighlight
      underlayColor={'#777777'}
      style={styles.touchable}
      onPress={loginHandler}>
      <View style={styles.container}>
        <AntDesign
          style={styles.icon}
          name="google"
          size={24}
          color={'white'}
        />
        <Text style={styles.text}>Sign in with Google</Text>
      </View>
    </TouchableHighlight>
  );
};

export default SignInWithGoogleButton;

const styles = StyleSheet.create({
  touchable: {
    width: 320,
    height: 70,
    alignSelf: 'center',
    bottom: '8%',
    backgroundColor: '#969696',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
  },
});
