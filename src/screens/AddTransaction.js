
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, TextInput, View, Button } from 'react-native';
import Toast from 'react-native-toast-message';

function AnimatedInput({ value, onChange, placeholder, multiline, ...props }) {
    const [inputHeight, setHeight] = useState(null);
    const [placeholderWidth, setWidth] = useState(null);
    const animation = useRef(new Animated.Value(0)).current;
    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -inputHeight / 2],
    });
    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -placeholderWidth / 4],
    });
    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.5],
    });
    const onFocus = () => animate(1);
    const onBlur = () => !value && animate(0);
    const animate = val => {
        Animated.spring(animation, {
            toValue: val,
            bounciness: 0,
            useNativeDriver: true,
        }).start();
    };
    return (
        <View
            style={styles.inputContainer}
            onLayout={e => !inputHeight && setHeight(e.nativeEvent.layout.height)}>
            <View style={{ height: inputHeight, ...styles.placeholderContainer }}>
                <Animated.Text
                    style={[
                        styles.placeholder,
                        { transform: [{ translateY }, { translateX }, { scale }] },
                    ]}
                    onTextLayout={e =>
                        !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
                    }>
                    {placeholder}
                </Animated.Text>
            </View>
            <TextInput
                style={[
                    styles.input,
                    multiline && { height: 100, textAlignVertical: 'top' },
                ]}
                onFocus={onFocus}
                onBlur={onBlur}
                onChangeText={onChange}
                multiline={multiline}
                {...props}
            />
        </View>
    );
}

const AddTransaction = ({ navigation, route }) => {
    const [sentAmount, setSentAmount] = useState('');
    const [receivedAmount, setReceivedAmount] = useState('');
    const [to, setTo] = useState('');
    const [rate, setRate] = useState('');
    const [completed, setCompleted] = useState(false);
    const [pending, setPending] = useState(false);
    const [issue, setIssue] = useState(false);

    const showToast = ({type, message}) => {
      Toast.show({
        type: type, // or 'error', 'info', 'warning'
        text1: message,
      });
    };
  
    const handleTransactionSubmit = async () => {
      try {
        const response = await axios.post('https://654b68155b38a59f28ef05c2.mockapi.io/scopex/api/Transfers', {
          sent_amount: sentAmount,
          received_amount: receivedAmount,
          to: to,
          rate: rate,
          completed: completed,
          pending: pending,
          issue: issue,
        });
        showToast({ type: "success", message: 'Transaction submitted successfully:'});
        // Handle success, e.g., navigate to another screen
      } catch (error) {
        showToast({ type: "error", message: error });
        // Handle error, e.g., show an error message
      }
    };
  
    const isDataValid = () => {
      if (!sentAmount || !receivedAmount || !to || !rate.toString()) {
        showToast({ type: "error", message: 'Please fill in all fields' });
        return false;
      }
      return true;
    };
  
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <AnimatedInput value={sentAmount} onChange={setSentAmount} placeholder="Sent Amount" keyboardType="numeric"/>
          <AnimatedInput value={receivedAmount} keyboardType="numeric" onChange={setReceivedAmount} placeholder="Received Amount" keyboardType="numeric"/>
          <AnimatedInput value={to} onChange={setTo} placeholder="To" />
          <AnimatedInput value={rate} keyboardType="numeric" onChange={setRate} placeholder="Rate" />
          <AnimatedInput value={completed.toString()} onChange={(value) => setCompleted(value)} placeholder="Completed"  />
          <AnimatedInput value={pending.toString()} onChange={(value) => setPending(value)} placeholder="Pending"  />
          <AnimatedInput value={issue.toString()} onChange={(value) => setIssue(value)} placeholder="Issue"  />
        </ScrollView>
        <Button
          title="Save"
          onPress={() => {
            if (isDataValid()) {
              handleTransactionSubmit();
              navigation.goBack();
            }
          }}
        />
      </View>
    );
  };
  
  export default AddTransaction;


const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#060418'
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#999',
        marginBottom: 25,
    },
    input: {
        paddingHorizontal: 10,
        fontSize: 18,
        padding: 5,
        color: 'white'
    },
    placeholderContainer: {
        position: 'absolute',
        backgroundColor: 'red',
        justifyContent: 'center',
    },
    placeholder: {
        fontSize: 22,
        position: 'absolute',
        marginHorizontal: 5,
        paddingHorizontal: 5,
        // backgroundColor: '#fff',
        color: '#999',
    },
});