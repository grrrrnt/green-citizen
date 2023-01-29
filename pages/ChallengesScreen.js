import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Alert, ImageBackground, Image  } from 'react-native';
import { ListItem } from "@react-native-material/core";
import React from 'react'
import { Camera } from 'expo-camera'
import { auth, db, storage } from '../firebaseConfig';
import { uploadBytesResumable, ref } from 'firebase/storage';
import {useState} from "react";
import { StatusBar } from 'expo-status-bar'
import {doc, getDoc} from "firebase/firestore";


let camera
export default function ChallengesScreen() {
      const [startCamera, setStartCamera] = React.useState(false)
      const [previewVisible, setPreviewVisible] = React.useState(false)
      const [capturedImage, setCapturedImage] = React.useState(null)
      const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
      const [flashMode, setFlashMode] = React.useState('off')
      const [photoTaken, setPhotoTaken] = React.useState(false)
      const [neighborhood, setNeighborhood] = useState(null)
    
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = getDoc(docRef).then((docSnap)  => {
        if (docSnap.exists()) {
          setNeighborhood(docSnap.data().neighborhood);
        }
      })
    
      const __startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            setCapturedImage(null)
            setPreviewVisible(false)
            setStartCamera(true)
        } else {
          Alert.alert('Access denied')
        }
      }
      const __takePicture = async () => {
        const photo = await camera.takePictureAsync()
        console.log(photo)
        setPreviewVisible(true)
        setCapturedImage(photo)
      }
    
      const __sendPhoto = async () => { 
        setPhotoTaken(true);
        const storageRef = ref(storage, neighborhood + '/' + auth.currentUser.uid + '_' + Date.now() + '.jpg');
        console.log(capturedImage.uri)
        const file = await fetch(capturedImage.uri);
        const bytes = await file.blob();
        uploadBytesResumable(storageRef, bytes).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
      }
    
      const __retakePicture = () => {
        setCapturedImage(null)
        setPreviewVisible(false)
        __startCamera()
      }
    
      const __handleFlashMode = () => {
        if (flashMode === 'on') {
          setFlashMode('off')
        } else if (flashMode === 'off') {
          setFlashMode('on')
        } else {
          setFlashMode('auto')
        }
      }
    
      const __switchCamera = () => {
        if (cameraType === 'back') {
          setCameraType('front')
        } else {
          setCameraType('back')
        }
      }
         
  return (
    <View style={{ flex: 1, backgroundColor: 'white'}}>
  

      <ScrollView 
      style={styles.challengeContainer}>
        <Text style={styles.title}>Transportation</Text>
      
      <View style={styles.challengeList}>
        <ListItem 
              onPress={__startCamera}

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


const CameraPreview = ({ photo, retakePicture, sendPhoto }) => {
      return (
        <View
          style={{
            backgroundColor: 'transparent',
            flex: 1,
            width: '100%',
            height: '100%'
          }}
        >
          <ImageBackground
            source={{ uri: photo && photo.uri }}
            style={{
              flex: 1
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                padding: 15,
                justifyContent: 'flex-end'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <TouchableOpacity
                  onPress={retakePicture}
                  style={{
                    width: 130,
                    height: 40,
    
                    alignItems: 'center',
                    borderRadius: 4
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20
                    }}
                  >
                    Retake
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={sendPhoto}
                  style={{
                    width: 130,
                    height: 40,
                    alignItems: 'center',
                    borderRadius: 4
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20
                    }}
                  >
                    Upload
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      )
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
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    photo: {
      height: 400,
      width: 300,
      resizeMode: 'contain',
      marginTop: 100,
    }

});
