import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { CheckMarkFilled } from '../../../assets/svgs';

const Checkbox = ({
  checked,
  label,
  onSelect,
  disabled,
  style,
}: {
  checked: boolean;
  label?: string;
  disabled?: boolean;
  onSelect: () => void;
  style?: ViewStyle;
}) => {
  return (
    <Pressable
      onPress={onSelect}
      disabled={disabled}
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <View
        style={[
          {
            width: 16,
            height: 16,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: '#757281',
            backgroundColor: '#FFF',
            justifyContent: 'center',
            alignItems: 'center',
          },

          checked && {
            borderColor: '#2F50C1',
            backgroundColor: '#D9E6FD',
          },
          disabled && {
            borderColor: '#A7A3B3',
            backgroundColor: '#CDCAD9',
          },
          style,
        ]}
      >
        {checked && (
          <CheckMarkFilled
            color={disabled ? '#A7A3B3' : checked ? '#2F50C1' : '#757281'}
          />
        )}
      </View>
      {!!label && (
        <Text style={{ marginLeft: 8, color: '#2F50C1', fontSize: 18 }}>
          Mark All
        </Text>
      )}
    </Pressable>
  );
};

export default Checkbox;

const styles = StyleSheet.create({});
