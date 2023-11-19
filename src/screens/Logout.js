import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Logout = ({navigation}) => {

    const showToast = ({type, message}) => {
        Toast.show({
          type: type, // or 'error', 'info', 'warning'
          text1: message,
        });
      };

      const signOut = async () => {
        try {
          await GoogleSignin.signOut();
          // Additional cleanup or state changes if needed
        showToast({type: 'success', message: 'User signed out successfully'});
        } catch (error) {
        showToast({type: 'error', message: error});
        }
      };

    const removeValue = async () => {
        try {
          await AsyncStorage.removeItem('my-key');
        showToast({type: 'success', message: 'User Logout Successfully'});
        navigation?.navigate("GoogleLogin")
        } catch (e) {
          console.log('error removeValue', e);
          // remove error
        }
      };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Logout"
          onPress={() => {
            removeValue()
            signOut()
          }}
        />
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({})