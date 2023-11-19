import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {
    GoogleSigninButton,
    GoogleSignin,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import { SafeAreaView } from 'react-native-safe-area-context';

const GoogleLogin = ({navigation}) => {
    const [userInfo, setUserInfo] = useState(null);

//     "createdAt": "2023-11-08T05:42:28.107Z",
//     "name": "Ken Zulauf",
//     "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/654.jpg",
//     "email_verified": false,
//     "kyc": true,
//     "email": "Lauriane67@gmail.com",
//     "id": "1"
//   },


    const handleUserSubmit = async (data) => {
        console.log("data", data);
        const payload = {
            avatar: data?.photo,
            name: data?.name,
            email: data?.email,
            id: data?.id,
            createdAt: new Date()
          }

          console.log("payload", payload);
        try {
          const response = await axios.post('https://654b68155b38a59f28ef05c2.mockapi.io/scopex/api/users', payload);
          showToast({ type: "success", message: 'User Created successfully:'});
          // Handle success, e.g., navigate to another screen
        } catch (error) {
          showToast({ type: "error", message: error });
          // Handle error, e.g., show an error message
        }
      };
    // const navigation = useNavigation(); // Initialize navigation

    const showToast = ({type, message}) => {
        Toast.show({
          type: type, // or 'error', 'info', 'warning'
          text1: message,
        });
      };

        // Define a getData function as an asynchronous function to correctly handle AsyncStorage
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key'); // Use await to wait for the result
      if (value !== null) {
        const parsedData = JSON.parse(value);
        return parsedData; // Return the parsed data
      } else {
        return null; // Return null if data is not found
      }
    } catch (error) {
      showToast({type: "error", message: error.message})
      // console.error('Error while reading or parsing data:', error);
      return null; // Return null on error
    }
  };
  
    useEffect(() => {
      GoogleSignin.configure({
        webClientId:
          '892019028563-3k3dmhhvhsfcch607fns6quh9lp5snip.apps.googleusercontent.com',
      });
    }, []);
  
    const signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        console.log('first');
        const usrInfo = await GoogleSignin.signIn();
        setUserInfo(usrInfo);
        // Navigate to the "NearByHospitals" screen upon successful login
        await storeData(usrInfo);
        const data = await getData(); // Use await to get the data
        await handleUserSubmit(data?.user)
        showToast({ type: "success", message: 'successful login'});
        navigation.navigate('HomeScreen');
        // navigation.navigate('NearByHospitals');
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // Handle when the user cancelled the login flow
          showToast({ type: "error", message: 'Sign-in cancelled by user' });
          console.log();
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // Handle when an operation (e.g., sign in) is already in progress
          showToast({ type: "error", message: 'Sign-in operation already in progress' });
          Alert.alert(
            'Sign-In in Progress',
            'A sign-in operation is already in progress. Please wait or cancel it.'
          );
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // Handle when Play Services are not available or outdated
          showToast({ type: "error", message: 'Play Services are not available or outdated' });
          console.log('');
        } else {
          showToast({ type: "error", message: 'Google Sign-In Error:' });
          Alert.alert(
            'Sign-In Failed',
            'A non-recoverable sign-in failure occurred. Please try again.'
          );
        }
      }
    };

  const storeData = async (value) => {
    console.log("value", value);
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('my-key', jsonValue);
      // alert("succedssd storeData login")
    } catch (e) { 
      console.log("er storeData login", e);
      // saving error
    }
  };
  
  console.log('sdfsdf', JSON.stringify(userInfo?.user, null, 2));

  // console.log('fds', email, pas/);

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
export default GoogleLogin;
