import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, OAuthProvider, signInWithCredential } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAUEhrmZ9GJ1-8yafXrg2RJyuUPL-khuuo',
  authDomain: 'scopex-fintech-18997.firebaseapp.com',
  projectId: 'scopex-fintech-18997',
  storageBucket: 'scopex-fintech-18997.appspot.com',
  messagingSenderId: '892019028563',
  appId: '1:892019028563:web:b0de634a51b76c052ecca6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const credential = await OAuthProvider.credentialFromResult(await signInWithPopup(auth, provider));
    const userCredential = await signInWithCredential(auth, credential);

    // The signed-in user info
    const user = userCredential.user;
    console.log(user);
  } catch (error) {
    console.error('Google Sign-In Error:', error.message);
  }
};

const App = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={signInWithGoogle}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4285F4', // Google Blue
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF', // White
    fontSize: 16,
  },
});

export default App;
