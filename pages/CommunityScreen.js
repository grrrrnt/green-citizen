import { StyleSheet, Text, View, Button } from 'react-native';
import { ListItem } from "@react-native-material/core";
import { auth, db } from '../firebaseConfig';
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";


export default function CommunityScreen() {
  const usersRef = collection(db, "users");

  // Create a query against the collection.
  const q = query(usersRef, where("neighborhood", "==", "Fox Point"));

  const neighbors = [];
  let index = 0;

  getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        neighbors[index] = doc.data();
        index += 1;
      });
    console.log(neighbors);
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
      <Text>Community!</Text>
      {/* {
      getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          neighbors[index] = doc.data();
          index += 1;
        });
        console.log(neighbors);
        neighbors.map((item, i) => (
          <ListItem
            key={i}
            title={item.name}
            bottomDivider
          />
        ));
      })
      } */}
    </View>
  );
};