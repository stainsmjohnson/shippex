import {
  Animated,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CrossOutlined, SearchOutlined } from '../../../assets/svgs';

const SearchBar = ({
  value,
  placeholder,
  style,
  onChangeText,
}: {
  value: string;
  placeholder: string;
  style?: ViewStyle;
  onChangeText?: (text: string) => void;
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

  const _handleClear = () => {
    onChangeText?.('');
  };

  return (
    <View
      style={[
        {
          backgroundColor: '#F4F2F8',
          paddingHorizontal: 14,
          borderRadius: 10,
          height: 44,
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: focused ? '#6E91EC' : '#F4F2F8',
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      >
        <SearchOutlined color={focused ? '#6E91EC' : '#A7A3B3'} />
      </View>

      <TextInput
        onFocus={_handleFocus}
        onBlur={_handleBlur}
        value={value}
        style={{
          fontSize: 16,
          flex: 1,
          color: '#2F50C1',
          paddingHorizontal: 8,
        }}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      {!!value && (
        <Pressable
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          onPress={_handleClear}
          hitSlop={5}
        >
          <CrossOutlined />
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
