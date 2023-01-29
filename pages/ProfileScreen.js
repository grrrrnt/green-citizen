import { StyleSheet, Text, View, Button, Image, Animated } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.profileContainer}>
      <Image
        style={styles.vegetableImage}
        source={require('../assets/potato2.png')}>
      </Image>
      <Text
        style={styles.profileName}>Test User</Text>
      <Text
        style={styles.profileLevel}>Level 1: Potato</Text>  
      
      </View>
      <View style={styles.aboveBar}>
          <Text>Your Progress:</Text>
          <Text>10%</Text>
      </View>
      <View style={styles.container}>

      <View style={styles.progressBar}>
        <Animated.View style={[StyleSheet.absoluteFill, styles.progressBarFill]}/> 
       </View>
      </View>
      <View style={styles.belowBar}>
          <Text>Next Level: Broccoli</Text>
      </View>

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

});