import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React, { useRef } from 'react';

const TextBox = ({
  placeholder,
  style,
}: {
  placeholder: string;
  style?: ViewStyle;
}) => {
  const focusAnimation = useRef(new Animated.Value(0)).current;

  const _handleFocus = () => {
    Animated.spring(focusAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const _handleBlur = () => {
    Animated.spring(focusAnimation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      style={[
        {
          backgroundColor: '#F4F2F8',
          paddingHorizontal: 14,
          borderRadius: 10,
          height: 56,
        },
        style,
      ]}
    >
      {!!placeholder && (
        <Animated.Text
          style={{
            position: 'absolute',
            top: 20,
            fontSize: 16,
            left: 14,
            color: '#58536E',
            opacity: focusAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: focusAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -18],
                }),
              },
              {
                translateX: focusAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -6],
                }),
              },
              {
                scale: focusAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.8],
                }),
              },
            ],
          }}
          numberOfLines={1}
        >
          {placeholder}
        </Animated.Text>
      )}

      <TextInput
        onFocus={_handleFocus}
        onBlur={_handleBlur}
        style={{
          fontSize: 16,
          flex: 1,
        }}
        placeholder={placeholder}
      />
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({});
