import { StyleSheet, Text, View, Button } from 'react-native';
import { ListItem } from "@react-native-material/core";



export default function ChallengesScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white'}}>
      <View style={styles.challengeContainer}>
        <Text style={styles.title}>Transportation</Text>
      <>
        <ListItem title="List Item" />
        <ListItem title="List Item" />
        <ListItem title="List Item" />
      </>



      </View>


    </View>
  );
}


const styles = StyleSheet.create({

  challengeContainer: {

    marginTop: 75,
    marginLeft: 20,

  },
  title: {
    fontSize: 24,
  }

});
