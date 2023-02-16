import {PureComponent} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Svg, {Circle, Defs, LinearGradient, Stop} from 'react-native-svg';
import Animated, {Value, sub} from 'react-native-reanimated';

const {width} = Dimensions.get('window');
const size = width - 32;
const strokeWidth = 50;
const radius = size / 2 - strokeWidth / 2;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface SliderProps {}

export default function Slider(props: SliderProps) {
  const circrumference = radius * Math.PI * 2;
  const strokeDashoffset = sub(circrumference, (radius * Math.PI) / 2);
  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
            <Stop offset="0" stopColor="#f7b733" stopOpacity="1" />
            <Stop offset="1" stopColor="#f5d346" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <AnimatedCircle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          stroke="url(#gradient)"
          fill="white"
          {...{strokeWidth, strokeDashoffset}}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
