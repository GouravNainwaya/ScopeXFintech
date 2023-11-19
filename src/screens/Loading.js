import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import CustomAcrivitityIndicator from '../components/CustomAcrivitityIndicator';

function Loading() {
  const navigation = useNavigation();
  const [jsonValue, setJsonValue] = useState(null);

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
    const Hope = async () => {
      try {
        const data = await getData(); // Use await to get the data
        console.log("get dat", data);
        if (data) {
          // Data was successfully retrieved and parsed
          navigation.navigate('HomeScreen');
        } else {
          // Data not found or error occurred
          navigation.navigate('GoogleLogin');
        }
      } catch (error) {
        showToast({type: "error", message: error.message})
        // Handle the error, e.g., show an error message or navigate to a different screen.
      }
    };
    Hope();
  }, []);

  return (
    <View style={{ flex: 1,  }}>
      <CustomAcrivitityIndicator size="large" />
    </View>
  );
}

export default Loading;
