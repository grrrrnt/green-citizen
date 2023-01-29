import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { ListItem } from "@react-native-material/core";




export default function ChallengesScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white'}}>

      <ScrollView 
      style={styles.challengeContainer}>
        <Text style={styles.title}>Transportation</Text>
      
      <View style={styles.challengeList}>
        <ListItem 
              title="Go for a walk (10 points)" 
              secondaryText="Earn 10 points by going for just a 15 minute walk outside"
              
        />
        <ListItem 
              title="Cycle to work (20 points)" 
              secondaryText="Switch out your driving commute to work with a bicycle ride and earn 20 points"     
        />
        <ListItem 
              title="Utilise public transit (20 points)"
              secondaryText="Cut down on carbon emissions by getting around on public transportation"       
        />       
      </View>

      <Text style={styles.title}>Comsumer Habits</Text>
      <View style={styles.challengeList}>
        <ListItem 
              title="Use a reusable grocery bag (10 points)" 
              secondaryText="Tell the cashier no to both paper and plastic and earn yourself 10 points"
              
        />
        <ListItem 
              title="Paper straw (10 points)" 
              secondaryText="Sip your iced coffee with a paper straw for 10 points "     
        />
        <ListItem 
              title="Buy from sustainable brands (20 points)"
              secondaryText="Support eco-friendly brands for your next purchase"       
        /> 
        <ListItem 
              title="Buy used clothes (20 points)"
              secondaryText="Buying used clothes helps reduce carbon emissions in the environment"       
        />        
      </View>


      <Text style={styles.title}>Diet</Text>
      <View style={styles.challengeList}>
        <ListItem 
              title="Purchase organic products (20 points)" 
              secondaryText="Buying organic products protects the environment"
              
        />
       
      </View>




      </ScrollView>
      


    </View>
  );
}


const styles = StyleSheet.create({

  challengeContainer: {
      paddingTop: 10,

  },
  title: {
    fontSize: 24,
    marginLeft: 10,
    paddingBottom: 5,
    color: 'green'

  },
  challengeList: {
      paddingBottom: 10,
  },

});
