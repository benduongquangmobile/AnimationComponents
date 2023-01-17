import {useEffect, useCallback, useImperativeHandle, forwardRef} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MAX_TRANSLATION_Y = -SCREEN_HEIGHT + 50;

export default forwardRef(function BottomSheet({children}, ref) {
  const translationY = useSharedValue(0);
  const context = useSharedValue(0);

  useImperativeHandle(
    ref,
    () => ({
      scrollTo,
    }),
    [scrollTo],
  );

  const scrollTo = useCallback(destination => {
    'worklet';
    translationY.value = withSpring(destination, {damping: 50});
  }, []);

  useEffect(() => {
    translationY.value = withSpring(-SCREEN_HEIGHT / 3, {damping: 50});
  }, [translationY]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {
        y: translationY.value,
      };
    })
    .onUpdate(e => {
      translationY.value = e.translationY + context.value.y;
      translationY.value = Math.max(translationY.value, -SCREEN_HEIGHT + 50);
    })
    .onEnd(() => {
      if (translationY.value > -SCREEN_HEIGHT / 3) {
        scrollTo(0);
      } else if (
        translationY.value < -SCREEN_HEIGHT / 3 &&
        translationY.value > -SCREEN_HEIGHT / 1.5
      ) {
        scrollTo(-SCREEN_HEIGHT / 3);
      } else if (translationY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATION_Y);
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translationY.value,
      [MAX_TRANSLATION_Y + 50, MAX_TRANSLATION_Y],
      [25, 5],
      Extrapolate.CLAMP,
    );

    return {
      borderRadius,
      transform: [{translateY: translationY.value}],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.line} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'red',
    top: SCREEN_HEIGHT,
    position: 'absolute',
    borderRadius: 20,
  },
  line: {
    width: 50,
    height: 5,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
});
