import React from 'react';
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

type BottomSheetProps = {
  children?: React.ReactNode;
};

type BottomSheetRef = {
  scrollTo?: () => void;
};

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MAX_TRANSLATION_Y = -SCREEN_HEIGHT + 50;

export default forwardRef<BottomSheetRef, BottomSheetProps>(
  function BottomSheet({children}, ref) {
    const num = SCREEN_HEIGHT / 1.5;
    const translationY = useSharedValue(-SCREEN_HEIGHT / 3);
    const context = useSharedValue({y: 0});

    const scrollTo = useCallback(
      (destination: number) => {
        translationY.value = withSpring(destination, {damping: 50});
      },
      [translationY],
    );

    useEffect(() => {
      if (translationY.value === 0) {
        translationY.value = withSpring(-SCREEN_HEIGHT / 3, {damping: 50});
      }
    }, [translationY]);

    useImperativeHandle(ref, () => ({scrollTo}), [scrollTo]);

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
          translationY.value > -num
        ) {
          scrollTo(-SCREEN_HEIGHT / 3);
        } else if (translationY.value < -num) {
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
        top: SCREEN_HEIGHT,
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
  },
);

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'red',
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
