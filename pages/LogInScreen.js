import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { auth } from '../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// import { Button, InputField, ErrorMessage } from '../components';


export default function LogInScreen({ navigation, route }) {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  });

  async function logIn() {
    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  return (
    <View style={styles.container}>
    <Image
      style={styles.logo}
      source={require('../assets/logo/begreen-word.png')}
    />

    <Text style={styles.title}>Log in to BeGreen right now:</Text>

    <View style={styles.controls}>
      <Input
        placeholder='Email'
        containerStyle={styles.inputBox}
        value={value.email}
        onChangeText={(text) => {
          setValue({ ...value, email: text, error: '' });
        }}
        leftIcon={<Icon
          name='envelope'
          color={'#61605e'}
          size={16}
          style={styles.icon}
        />}
      />

      <Input
        placeholder='Password'
        containerStyle={styles.inputBox}
        value={value.password}
        onChangeText={(text) => {
          setValue({ ...value, password: text, error: '' });
        }}
        secureTextEntry={true}
        leftIcon={<Icon
          name='key'
          color={'#61605e'}
          size={16}
          style={styles.icon}
        />}
      />

      <Button
        title={value.email.length > 0 && value.password.length > 0 ? "Log In" : "Please fill out all fields."}
        buttonStyle={value.email.length > 0 && value.password.length > 0 ? styles.buttonActive : styles.buttonInactive}
        onPress={value.email.length > 0 && value.password.length > 0 ? logIn : () => {} } />

      {value.error.length > 0 ? <Text style={styles.error}>{value.error}</Text> : null}
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 20,
  },

  inputBox: {
    height: 50,
    width: 300,
    marginTop: 5,
  },

  icon: {
    marginRight: 10,
  },

  buttonActive: {
    width: 300,
    marginTop: 10,
    backgroundColor: 'green',
  },

  buttonInactive: {
    width: 300,
    marginTop: 10,
    backgroundColor: 'gray',
  },

  picker: {
    width: 300,
    height: 200,
  },

  text: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'normal',
  },

  disclaimer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'normal',
  },

  disclaimerLink: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'green',
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});