import { View, Text, FlatList, StyleSheet, Image, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';


const TranscationsHistory = ({navigation}) => {
    const [apiData, setApiData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const showToast = ({type, message}) => {
      Toast.show({
        type: type, // or 'error', 'info', 'warning'
        text1: message,
      });
    };

    const fetchTransactonsHistory = async() => {
      try {
      axios
        .get('https://654b68155b38a59f28ef05c2.mockapi.io/scopex/api/Transfers')
        .then(response => {
          setApiData(response.data);
          setIsLoading(false); // Set loading to false after data is fetched
        showToast({ type: "success", message: 'Transaction History Fetched successfully:'});
        })
        .catch(error => {
          showToast({ type: "error", message: error });
          setIsLoading(false); // Set loading to false in case of an error
        });
      } catch (error) {
        showToast({ type: "error", message: error });
      }
    }


    useFocusEffect(
      React.useCallback(() => {
        // This code will run when the screen gains focus after navigation.
        // Call your function here.
        fetchTransactonsHistory();
      }, [fetchTransactonsHistory])
    );

    const renderItem = ({ item }) => (
        <View style={styles.transactionItem}>
          <Image source={{ uri: item.avatar ? item.avatar : 'https://th.bing.com/th/id/OIP.JRSzELnbypn-2cAL7BwUSQAAAA?w=168&h=176&c=7&r=0&o=5&dpr=1.8&pid=1.7' }} style={styles.avatar} />
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionText}>To: {item.to}</Text>
            <Text style={styles.transactionText}>Amount Sent: ${item.sent_amount}</Text>
            <Text style={styles.transactionText}>Amount Received: ${item.received_amount}</Text>
            <Text style={styles.transactionText}>Completed: {item.completed ? 'Yes' : 'No'}</Text>
            <Text style={styles.transactionText}>Pending: {item.pending ? 'Yes' : 'No'}</Text>
            <Text style={styles.transactionText}>Issue: {item.issue ? 'Yes' : 'No'}</Text>
          </View>
        </View>
      );
    
      return (
        <View style={styles.container}>
          <FlatList
            data={apiData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        <Button
          title="Add Transaction"
          onPress={() => {
            navigation?.navigate("AddTransaction")
          }}
        />
        </View>
      );
}

export default TranscationsHistory

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#28251E',
    //   backgroundColor: '',
    },
    transactionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'black',
      borderRadius: 8,
      marginBottom: 8,
      padding: 16,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
    },
    transactionDetails: {
      flex: 1,
    },
    transactionText: {
      fontSize: 15,
      marginBottom: 4,
      color: 'white',
    //   width: '100%'
    },
  });
  