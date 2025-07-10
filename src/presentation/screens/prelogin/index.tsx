import { Animated, Easing, useWindowDimensions, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Button from '../../components/Button';
import { routes } from '../../../navigator/routes';
import { makeStyles } from '../../../core/theme';
import { Logo } from '../../../assets/svgs';
import { useNavigation } from '@react-navigation/native';

const PreLoginScreen = () => {
  const navigation = useNavigation();
  const dims = useWindowDimensions();
  const animation = useRef(new Animated.Value(0)).current;

  const { styles } = useStyles();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [animation]);

  const _handleLogin = () => {
    navigation.navigate(routes.LOGIN);
  };

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.flex, { opacity, transform: [{ translateY }] }]}
      >
        <View style={styles.content}>
          <Logo width={dims.width * 0.7} />
        </View>
        <Button title="Login" type="tertiary" onPress={_handleLogin} />
      </Animated.View>
    </View>
  );
};

export default PreLoginScreen;

const useStyles = makeStyles(({ colors }) => ({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
