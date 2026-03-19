import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { MotiView } from 'moti';
import Animated, { 
  useSharedValue, 
  useAnimatedProps, 
  withRepeat, 
  withTiming,
  interpolate
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface BlobProps {
  gradient: [string, string];
  size?: number;
  style?: any;
}

export default function Blob({ gradient, size = 300, style }: BlobProps) {
  const animation = useSharedValue(0);

  useEffect(() => {
    animation.value = withRepeat(
      withTiming(1, { duration: 8000 }),
      -1,
      true
    );
  }, []);

  const animatedProps = useAnimatedProps(() => {
    // Basic morphing logic using arc interpolation
    const r = size / 2;
    const morph = interpolate(animation.value, [0, 1], [0.8, 1.2]);
    const d = `M${r},${r/5} 
               C${r*1.5 * morph},${r/5} ${r*1.8},${r*0.5} ${r*1.8},${r} 
               S${r*1.5},${r*1.8 * morph} ${r},${r*1.8} 
               S${r/5},${r*1.5} ${r/5},${r} 
               S${r/2},${r/5} ${r},${r/5} Z`;
    return { d };
  });

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={gradient[0]} />
            <Stop offset="100%" stopColor={gradient[1]} />
          </LinearGradient>
        </Defs>
        <AnimatedPath animatedProps={animatedProps} fill="url(#grad)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
