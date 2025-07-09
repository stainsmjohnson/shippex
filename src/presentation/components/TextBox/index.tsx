import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const TextBox = ({
  value,
  placeholder,
  style,
  onChangeText,
  secureTextEntry = false,
  prefix,
}: {
  value: string;
  placeholder: string;
  style?: ViewStyle;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  prefix?: string;
}) => {
  const [focused, setFocused] = useState(false);
  const focusAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(focusAnimation, {
      toValue: focused || value ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [focused, value, focusAnimation]);

  const _handleFocus = useCallback(() => {
    setFocused(true);
  }, [setFocused]);

  const _handleBlur = useCallback(() => {
    setFocused(false);
  }, [setFocused]);

  return (
    <View
      style={[
        {
          backgroundColor: '#F4F2F8',
          paddingHorizontal: 14,
          borderRadius: 10,
          height: 56,
          flexDirection: 'row',
        },
        style,
      ]}
    >
      {!!placeholder && (
        <Animated.Text
          style={{
            position: 'absolute',
            top: 6,
            left: 14,
            fontSize: 11,
            color: '#58536E',
            opacity: focusAnimation,
            transform: [
              {
                translateY: focusAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10, 0],
                }),
              },
            ],
          }}
          numberOfLines={1}
        >
          {placeholder}
        </Animated.Text>
      )}

      {!!placeholder && (
        <Animated.View
          style={{
            flex: 1,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            height: 56,
            paddingHorizontal: 14,
            opacity: focusAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: '#A7A3B3',
            }}
          >
            {placeholder}
          </Text>
        </Animated.View>
      )}

      {!!prefix && !!(focused || value) && (
        <View
          style={{
            top: 22,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 16, color: '#58536E' }}>{'https://'}</Text>
          <View
            style={{
              width: 1,
              height: 16,
              backgroundColor: '#15487633',
              marginHorizontal: 6,
              top: 2,
            }}
          />
        </View>
      )}

      <TextInput
        onFocus={_handleFocus}
        onBlur={_handleBlur}
        value={value}
        style={{
          fontSize: 16,
          flex: 1,
          color: '#2F50C1',
          marginTop: 8,
        }}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({});
