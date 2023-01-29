import { StyleSheet, Text, View, Button } from 'react-native';

export default function ChallengesScreen() {
  return (
    <View style={{ flex: 1}}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>More ways to be green</Text>
      </View>
      
    </View>
  );
}


const styles = StyleSheet.create({

  titleContainer: {

    marginTop: 75,
    alignItems: 'center',

  },
  title: {
    fontSize: 24,
  }

});
