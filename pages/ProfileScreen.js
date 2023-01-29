import { StyleSheet, Text, View, Button, Image, Animated } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import {useState} from "react";
import {doc, getDoc} from "firebase/firestore";

export default function ProfileScreen() {

const [name, setName] = useState(null)
const [level, setLevel] = useState(null)
const [neighborhood, setNeighborhood] = useState(null)
const [points, setPoints] = useState(null)

const docRef = doc(db, "users", auth.currentUser.uid);
const docSnap = getDoc(docRef).then((docSnap)  => {
  if(docSnap.exists()){
    console.log(docSnap.data())
    setName(docSnap.data().name);
    setLevel(docSnap.data().level);
    setNeighborhood(docSnap.data().neighborhood);
    setPoints(docSnap.data().points);


    console.log(points);
  }
});


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.profileContainer}>
      <Image
        style={styles.vegetableImage}
        source={require('../assets/potato2.png')}>
      </Image>
      <Text
        style={styles.profileName}>{name}</Text>
      <Text
        style={styles.profileLevel}>Level {level}: Potato</Text>  
      <Text
        style={styles.profileLevel}>Your Neighborhood: {neighborhood}</Text>
      
      </View>
      <View style={styles.aboveBar}>
          <Text>Your Progress:</Text>
          <Text>Green Points: {points}/100</Text>
      </View>
      <View style={styles.container}>

      <View style={styles.progressBar}>
        <Animated.View style={[StyleSheet.absoluteFill, styles.progressBarFill]}/> 
       </View>
      </View>
      <View style={styles.belowBar}>
          <Text>Next Level: Broccoli</Text>
      </View>

      <Button
        onPress={() => signOut(auth)}
        title="Sign Out"
        color="green"
      />

    </View>
    
  );
}

const styles = StyleSheet.create({
  progressBarFill: {
    backgroundColor: 'green',
    width: '10%'
  },

  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  vegetableImage: {
    
    height: 200,
    width: 200,
    resizeMode: 'contain',
    marginTop: 100,

  },
  profileName: {
    marginTop: 25,
    fontSize: 24,

  },
  profileLevel: {
    marginTop: 25,
    fontSize: 24,

  },

  aboveBar: {
    flexDirection: 'row',
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  container: {
    alignItems: 'center',
  },
  progressBar: {
    height: 30,
    width: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5
  },

  belowBar: {
    alignItems: 'flex-end',
    marginRight: 20,
  },

  button: {
    fontSize: 24,
    fontWeight: 'normal',
  },

});