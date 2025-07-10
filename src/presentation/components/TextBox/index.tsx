import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
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
  error,
  keyboardType,
  autoCapitalize,
}: {
  value: string;
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  prefix?: string;
  error?: string | null;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
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

  const opacity = focusAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const labelTranslateY = focusAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  });

  return (
    <View style={[styles.container, style]}>
      {!!placeholder && (
        <Animated.Text
          style={[
            styles.label,
            {
              opacity: focusAnimation,
              transform: [{ translateY: labelTranslateY }],
            },
          ]}
          numberOfLines={1}
        >
          {placeholder}
        </Animated.Text>
      )}

      {!!placeholder && (
        <Animated.View style={[styles.placeholder, { opacity }]}>
          <Text style={styles.placeholderText}>{placeholder}</Text>
        </Animated.View>
      )}

      {!!prefix && !!(focused || value) && (
        <View style={styles.prefixContainer}>
          <Text style={styles.prefix}>{prefix}</Text>
          <View style={styles.prefixSeparater} />
        </View>
      )}

      <TextInput
        onFocus={_handleFocus}
        onBlur={_handleBlur}
        value={value}
        style={styles.input}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F2F8',
    paddingHorizontal: 14,
    borderRadius: 10,
    height: 56,
    flexDirection: 'row',
  },
  input: {
    fontSize: 16,
    flex: 1,
    color: '#2F50C1',
    marginTop: 8,
  },
  label: {
    position: 'absolute',
    top: 6,
    left: 14,
    fontSize: 11,
    color: '#58536E',
  },
  placeholder: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 14,
  },
  placeholderText: {
    fontSize: 16,
    color: '#A7A3B3',
  },
  prefixContainer: {
    top: 22,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  prefix: { fontSize: 16, color: '#58536E' },
  prefixSeparater: {
    width: 1,
    height: 16,
    backgroundColor: '#15487633',
    marginHorizontal: 6,
    top: 2,
  },
  error: {
    color: '#EF4444',
    fontSize: 11,
    marginHorizontal: 8,
    marginTop: 4,
    position: 'absolute',
    top: '100%',
  },
});
