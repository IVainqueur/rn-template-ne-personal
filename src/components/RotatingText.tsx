import { Text } from '@gluestack-ui/themed';
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const RotatingText = () => {
  // Create an animated value
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Define the animation sequence
    Animated.loop(
      Animated.sequence([
        // Rotate to 45 degrees
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        // Rotate back to 0 degrees
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [rotateAnim]);

  // Interpolate the rotation
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '20deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: rotation }] }}>
      <Text fontSize={30} fontWeight={'$bold'}>
        👋
      </Text>
    </Animated.View>
  );
};

export default RotatingText;