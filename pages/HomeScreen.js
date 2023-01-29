import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import { Camera } from 'expo-camera'
import { auth, db, storage } from '../firebaseConfig';
import { uploadBytes, ref } from 'firebase/storage';

const prompts = [
  'Walk or cycle to school/work today.',
  'Use a reusable water bottle.',
  'Eat a plant-based meal.',
  'Use a reusable bag.',
  'Encourage a friend to go green.',
  'Attend a beach cleanup.',
  'Grow a plant.',
  'Recycle a plastic bottle.',
  'Use a reusable straw.',
];

let camera
export default function App() {
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState(null)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = React.useState('off')
  const [photoTaken, setPhotoTaken] = React.useState(false)

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    if (status === 'granted') {
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
    setPhotoTaken(true)
    handleSubmit(photo);
    const storageRef = ref(storage,  + '_' + Date.now() + '.jpg');
    uploadBytes(storageRef, photo.uri).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]

    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
        });
      }
    );
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
    <View style={styles.container}>
      {startCamera ? (
        photoTaken ? (
          <View
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 28
              }}
            >
              {prompts[Math.floor(Math.random() * prompts.length)]}
            </Text>
            <Image
              style={{
                width: '30%',
                height: '30%'
              }}
              source={{uri:capturedImage.uri}}
            />
          </View>
        ) : (
            <View
              style={{
                flex: 1,
                width: '100%'
              }}
            >
              {previewVisible && capturedImage ? (
                <CameraPreview photo={capturedImage} sendPhoto={__sendPhoto} retakePicture={__retakePicture} />
              ) : (
                <Camera
                  type={cameraType}
                  flashMode={flashMode}
                  style={{ flex: 1 }}
                  ref={(r) => {
                    camera = r
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      width: '100%',
                      backgroundColor: 'transparent',
                      flexDirection: 'row'
                    }}
                  >
                    <View
                      style={{
                        position: 'absolute',
                        left: '5%',
                        top: '10%',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <TouchableOpacity
                        onPress={__handleFlashMode}
                        style={{
                          backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                          borderRadius: '50%',
                          height: 25,
                          width: 25
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20
                          }}
                        >
                          ⚡️
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={__switchCamera}
                        style={{
                          marginTop: 20,
                          borderRadius: '50%',
                          height: 25,
                          width: 25
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20
                          }}
                        >
                          {cameraType === 'front' ? '🤳' : '📷'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        flexDirection: 'row',
                        flex: 1,
                        width: '100%',
                        padding: 20,
                        justifyContent: 'space-between'
                      }}
                    >
                      <View
                        style={{
                          alignSelf: 'center',
                          flex: 1,
                          alignItems: 'center'
                        }}
                      >
                        <TouchableOpacity
                          onPress={__takePicture}
                          style={{
                            width: 70,
                            height: 70,
                            bottom: 0,
                            borderRadius: 50,
                            backgroundColor: '#fff'
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </Camera>
              )}
            </View>
        )
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff'
          }}
        >
          <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 28
              }}
            >
              {prompts[Math.floor(Math.random() * prompts.length)]}
            </Text>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              onPress={__startCamera}
              style={{
                width: 130,
                borderRadius: 4,
                backgroundColor: '#14274e',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 16,
                  textAlign: 'center'
                }}
              >
                Take a picture
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
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
})

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