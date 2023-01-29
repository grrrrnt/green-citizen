import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/logo/begreen-logo-with-word.png')}
      />
      <Button
        style={styles.button}
        onPress={() => navigation.navigate('Log In', {name: 'Jane'})}
        title="Log In"
        color="green"
      />
      <Button
        onPress={() => navigation.navigate('Sign Up', {name: 'Jane'})}
        title="Sign Up"
        color="green"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  button: {
    fontSize: 24,
    fontWeight: 'normal',
  },
});