import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'; // Import the icon library
import TranscationsHistory from '../screens/TranscationsHistory';
import AllUsers from '../screens/AllUsers';
import AddTransaction from '../screens/AddTransaction';
import Loading from '../screens/Loading';
import GoogleLogin from '../screens/GoogleLogin';
import Logout from '../screens/Logout';
import AntDesign from '@expo/vector-icons/AntDesign';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'TranscationsHistory') {
          iconName = focused ? '' : '';
          return  <AntDesign name={"wallet"} size={size} color={color} />
        } else if (route.name === 'AllUsers') {
          iconName = focused ? 'user' : 'user';
          return  <AntDesign name={iconName} size={size} color={color} />
        }else if (route.name === 'Logout') {
            iconName = focused ? 'log-out' : 'log-out-outline';
            return  <Ionicons name={iconName} size={size} color={color} />;
          }
        // Return the icon component with the appropriate name
        
      },
    })}
  >
    <Tab.Screen name="TranscationsHistory" component={TranscationsHistory} />
    <Tab.Screen name="AllUsers" component={AllUsers} />
    <Tab.Screen name="Logout" component={Logout} />
  </Tab.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" options={{headerShown: false}} component={Home} />
        <Stack.Screen name="AddTransaction" options={{headerShown: false}} component={AddTransaction} />
        <Stack.Screen name="GoogleLogin" options={{headerShown: false}} component={GoogleLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})