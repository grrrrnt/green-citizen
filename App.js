import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import HomeScreen from './pages/HomeScreen';
import ChallengesScreen from './pages/ChallengesScreen';
import CommunityScreen from './pages/CommunityScreen';
import ProfileScreen from './pages/ProfileScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import LogInScreen from './pages/LogInScreen';
import SignUpScreen from './pages/SignUpScreen';

import { useAuthentication } from './utils/hooks/useAuthentication';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Log In" component={LogInScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function UserStack() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator> */}
        <MyTabs />
      {/* </Stack.Navigator> */}
    </NavigationContainer>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-home'
            : 'ios-home';
        } else if (route.name === 'Challenges') {
          iconName = focused ? 'ios-flash' : 'ios-flash';
        }
        else if (route.name === 'Leaderboard') {
          iconName = focused ? 'ios-trophy' : 'ios-trophy';
        }
        else if (route.name === 'Profile') {
          iconName = focused ? 'ios-person' : 'ios-person';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'green',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen name="Leaderboard" component={CommunityScreen}/>
      <Tab.Screen name="Profile" component={ProfileScreen}/>
    </Tab.Navigator>
  );
}

export default function App() {
  const { user } = useAuthentication();
  return user ? <UserStack /> : <AuthStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    alignItems: 'center',
    justifyContent: 'center',
  },
});
