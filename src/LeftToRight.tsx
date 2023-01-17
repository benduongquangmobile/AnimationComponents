import {useState, useEffect} from 'react';
import {View, StyleSheet, Animated, Dimensions, Easing} from 'react-native';

const MovingBox = () => {
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: Dimensions.get('window').width - 100,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.bounce,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.bounce,
        }),
      ]),
    ).start();
  }, [animatedValue]);

  return (
    <View>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    width: 100,
    height: 100,
    left: 0,
    top: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovingBox;
