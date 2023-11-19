import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

const random = () => (parseInt(Math.random() * 255));
const randomColor = () => 'rgb(' + random() + ',' + random() + ',' + random() + ')'
const Dim = 60;

const CustomAcrivitityIndicator = () => {
  const color1 = useRef(randomColor());
  const color2 = useRef(randomColor());
  const color3 = useRef(randomColor());
  const color4 = useRef(randomColor());
  const color5 = useRef(randomColor());
  const animation = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation.current, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, []);

  const angle = animation.current.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '72deg', '360deg']
  });
  const angle0 = animation.current.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '144deg', '360deg']
  });
  const angle1 = animation.current.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '216deg', '360deg']
  });
  const angle2 = animation.current.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '288deg', '360deg']
  });
  const angle3 = animation.current.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '360deg', '360deg']
  });
  const outerAngle = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg']
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ width: Dim, height: Dim, transform: [{ rotate: outerAngle }] }}>
        <Animated.View style={{ ...styles.item, transform: [{ rotate: angle3 }] }}>
          <View style={{ ...styles.innerItem, backgroundColor: color1.current }}></View>
        </Animated.View>
        <Animated.View style={{ ...styles.item, transform: [{ rotate: angle2 }] }}>
          <View style={{ ...styles.innerItem, backgroundColor: color2.current }}></View>
        </Animated.View>
        <Animated.View style={{ ...styles.item, transform: [{ rotate: angle1 }] }}>
          <View style={{ ...styles.innerItem, backgroundColor: color3.current }}></View>
        </Animated.View>
        <Animated.View style={{ ...styles.item, transform: [{ rotate: angle0 }] }}>
          <View style={{ ...styles.innerItem, backgroundColor: color4.current }}></View>
        </Animated.View>
        <Animated.View style={{ ...styles.item, transform: [{ rotate: angle }] }}>
          <View style={{ ...styles.innerItem, backgroundColor: color5.current }}></View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    width: Dim,
    height: Dim,
    borderWidth: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    justifyContent: 'center'
  },
  innerItem: {
    height: 10,
    width: 10,
    borderRadius: 10
  }
});

export default CustomAcrivitityIndicator;
