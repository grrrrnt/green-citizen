import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { StackScreenProps } from '@react-navigation/stack';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";

const neighborhoods = [
  'College Hill',
  'Downtown',
  'Fox Point',
  'Wayland',
  'Mount Hope',
  'Federal Hill',
  'West End'
];

export default function SignUpScreen({ navigation, route }) {
  const [value, setValue] = React.useState({
    email: '',
    name: '',
    password: '',
    neighborhood: 'College Hill',
  });

  async function addUserToDatabase(uid) {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: value.name,
        email: value.email,
        neighborhood: value.neighborhood,
        level: 1,
        points: 0,
        uid: uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  }

  async function signUp() {
     try {
      await createUserWithEmailAndPassword(auth, value.email, value.password)
        .then(async (userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const uid = user.uid;

          // Add user to database
          await addUserToDatabase(uid);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
      // navigation.navigate('Sign In');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/logo/begreen-word.png')}
      />

      <Text style={styles.title}>Sign up for BeGreen right now:</Text>

      <View style={styles.controls}>
        <Input
          placeholder='Email'
          containerStyle={styles.inputBox}
          value={value.email}
          onChangeText={(text) => {
            setValue({ ...value, email: text });
          }}
          leftIcon={<Icon
            name='envelope'
            color={'#61605e'}
            size={16}
            style={styles.icon}
          />}
        />

        <Input
          placeholder='Name'
          containerStyle={styles.inputBox}
          value={value.name}
          onChangeText={(text) => {
            setValue({ ...value, name: text });
          }}
          leftIcon={<Icon
            name='user-circle'
            color={'#61605e'}
            size={16}
            style={styles.icon}
          />}
        />

        <Input
          placeholder='Password (at least 6 chars)'
          containerStyle={styles.inputBox}
          value={value.password}
          onChangeText={(text) => {
            setValue({ ...value, password: text });
          }}
          secureTextEntry={true}
          leftIcon={<Icon
            name='key'
            color={'#61605e'}
            size={16}
            style={styles.icon}
          />}
        />

        <Text style={styles.text}>
          Your neighborhood:
        </Text>

        <Picker
          selectedValue={value.neighborhood}
          style={styles.picker}
          onValueChange={(text, _) => setValue({ ...value, neighborhood: text })}
        >
          {neighborhoods.map((item, index) => {
            return (<Picker.Item label={item} value={item} key={index}/>) })}
        </Picker>

        <Text style={styles.disclaimer}>
          Already have an account? <Text style={styles.disclaimerLink} onPress={() => navigation.navigate('Log In')}>Log in.</Text>
        </Text>

        <Button
          title={value.email.length > 0 && value.name.length> 0 && value.password.length >= 6 ? "Sign Up" : "Please fill out all fields."}
          buttonStyle={value.email.length > 0 && value.name.length> 0 && value.password.length >= 6 ? styles.buttonActive : styles.buttonInactive}
          onPress={value.email.length > 0 && value.name.length> 0 && value.password.length >= 6 ? signUp : () => {} } />
      </View>
    </View>
  );
}

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
