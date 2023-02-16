import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';

export const Dropdown = () => {
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  const toggleDropdown = () => {
    setDropdownVisibility(!isDropdownVisible);
    Animated.timing(animatedValue, {
      toValue: isDropdownVisible ? 0 : 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const dropdownHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <View>
      <TouchableOpacity onPress={toggleDropdown}>
        <Text>Toggle Dropdown</Text>
      </TouchableOpacity>
      <Animated.View
        style={{
          height: dropdownHeight,
          position: 'absolute',
          top: 20,
          backgroundColor: 'red',
        }}>
        <Text>This is the dropdown content</Text>
      </Animated.View>
    </View>
  );
};

export default Dropdown;
