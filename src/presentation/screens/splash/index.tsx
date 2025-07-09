import { Animated, useWindowDimensions } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { makeStyles } from '../../../core/theme/makeStyle';
import * as LogoParts from './LogoParts';

const SplashScreen = () => {
  const window = useWindowDimensions();
  const animation = useRef(new Animated.Value(0)).current;

  const { styles, colors } = useStyles();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        delay: 500,
        toValue: 2,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animation]);

  const initialScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
    extrapolate: 'clamp',
  });

  const topMovement = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [0, -window.height / 2],
    extrapolate: 'clamp',
  });

  const bottomMovement = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [0, -window.height / 2],
    extrapolate: 'clamp',
  });

  const bottomTranslationX = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const bottomScale = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [1, 20],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: animation.interpolate({
            inputRange: [0, 1.6, 2],
            outputRange: [colors.background, colors.background, colors.primary],
            extrapolate: 'clamp',
          }),
        },
      ]}
    >
      <Animated.View
        style={{
          transform: [{ scale: initialScale }],
        }}
      >
        <Animated.View
          style={{
            transform: [
              { translateY: bottomMovement },
              { translateX: bottomTranslationX },
              { scale: bottomScale },
            ],
          }}
        >
          <LogoParts.Upper />
        </Animated.View>
        <Animated.View
          style={{
            marginTop: 1,
            transform: [
              { translateX: topMovement },
              { translateY: topMovement },
            ],
          }}
        >
          <LogoParts.Lower />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default SplashScreen;

const useStyles = makeStyles(({ colors }) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}));
