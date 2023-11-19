import { StyleSheet, Text, View , Alert} from 'react-native'
import React, { useState, useEffect } from 'react';

import 'expo-dev-client'
import Toast from 'react-native-toast-message';
import Navigation from './src/navigation/Navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {


  return (
    <SafeAreaView style={styles.container}>
    {/* <Provider store={store}> */}
      <Navigation/>
      <Toast />
    {/* </Provider> */}
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});