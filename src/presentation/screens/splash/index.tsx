import { View, Animated, useWindowDimensions, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { makeStyles } from '../../../core/theme/makeStyle';
import Button from '../../components/Button';
import { routes } from '../../../navigator/routes';

const SplashScreen = ({ navigation }) => {
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
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animation]);

  const initialScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1.5],
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
    outputRange: [1, 5],
    extrapolate: 'clamp',
  });

  const _handleLogin = () => {
    navigation.navigate(routes.LOGIN);
  };

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
            width: 50,
            height: 50,
            backgroundColor: colors.primary,
            transform: [
              { translateX: topMovement },
              { translateY: topMovement },
            ],
          }}
        />
        <Animated.View
          style={{
            width: 50,
            height: 50,
            backgroundColor: colors.primary,
            marginTop: 10,
            transform: [
              { translateY: bottomMovement },
              { translateX: bottomTranslationX },
              { scale: bottomScale },
            ],
          }}
        />
      </Animated.View>

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 24,
          paddingVertical: 32,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>SHIPPEX</Text>
        </View>
        <Button title="Login" type="tertiary" onPress={_handleLogin} />
      </View>
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
