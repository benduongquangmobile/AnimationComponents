import {useEffect} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import {snapPoint} from 'react-native-redash';

const {width: wWidth, height: wHeight} = Dimensions.get('window');

const aspectRatio = 722 / 368;
const CARD_WIDTH = wWidth - 128;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const duration = 250;
const sideX = (wWidth + CARD_WIDTH) / 2;
const sideY = (wHeight + CARD_HEIGHT) / 2;
const SNAP_POINTS_X = [-sideX, 0, sideX];
const SNAP_POINTS_Y = [-sideY, 0, sideY];

export default function SimulationCard({index = 0, data}) {
  const x = useSharedValue(0);
  const y = useSharedValue(-wHeight);
  const rotateZ = useSharedValue(Math.random() * 20 - 10);
  const scale = useSharedValue(1);
  const theta = -10 + Math.random() * 20;

  useEffect(() => {
    const delay = 1000 + index * duration;
    y.value = withDelay(index * duration, withSpring(0, {duration}));
    rotateZ.value = withDelay(delay, withSpring(theta, {duration}));
  }, [index, rotateZ, theta, y]);

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({translationX, translationY}: any, ctx) => {
      x.value = ctx.x + translationX;
      y.value = ctx.y + translationY;
    },
    onStart: (_, ctx) => {
      ctx.x = x.value;
      ctx.y = y.value;
      scale.value = withSpring(1.1, {duration});
      rotateZ.value = withSpring(0, {duration});
    },
    onEnd: ({velocityX, velocityY}: any) => {
      // x.value = withSpring(0, {velocity: velocityX});
      // y.value = withSpring(0, {velocity: velocityY});

      const destX = snapPoint(x.value, velocityX, SNAP_POINTS_X);
      const destY = snapPoint(y.value, velocityY, SNAP_POINTS_Y);
      x.value = withSpring(destX, {velocity: velocityX});
      y.value = withSpring(destY, {velocity: velocityY});
      scale.value = withSpring(1, {duration});
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {perspective: 1500},
        {rotateX: '30deg'},
        {rotateZ: `${rotateZ.value}deg`},
        {scale: scale.value},
        {translateX: x.value},
        {translateY: y.value},
      ],
    };
  });

  return (
    <View style={styles.container} pointerEvents="box-none">
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[style]}>
          <Image
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_WIDTH * aspectRatio,
            }}
            source={{uri: data.avatar}}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
