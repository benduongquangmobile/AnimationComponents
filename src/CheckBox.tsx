import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';

export const RadioButton = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [scale] = useState(new Animated.Value(0));

  const handlePress = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (isChecked) {
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scale, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  const animatedStyle = {
    transform: [{scale}],
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.circle}>
          <Animated.View style={[styles.innerCircle, [animatedStyle]]} />
        </View>
        <Text style={styles.text}>RadioButton</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  circle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  text: {marginLeft: 10},
});
