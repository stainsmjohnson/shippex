import { Animated, Easing, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Button from '../../components/Button';
import { routes } from '../../../navigator/routes';
import { makeStyles } from '../../../core/theme';

const PreLoginScreen = ({ navigation }) => {
  const animation = useRef(new Animated.Value(0)).current;

  const { styles } = useStyles();

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [animation]);

  const _handleLogin = () => {
    navigation.navigate(routes.LOGIN);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          flex: 1,
          opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
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
      </Animated.View>
    </View>
  );
};

export default PreLoginScreen;

const useStyles = makeStyles(({ colors }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
}));
