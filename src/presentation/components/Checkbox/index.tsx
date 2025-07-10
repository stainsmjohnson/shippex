import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
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
  style?: StyleProp<ViewStyle>;
}) => {
  const color = disabled ? '#A7A3B3' : checked ? '#2F50C1' : '#757281';
  return (
    <Pressable onPress={onSelect} disabled={disabled} style={styles.container}>
      <View
        style={[
          styles.box,
          checked && styles.boxChecked,
          disabled && styles.boxDisabled,
          style,
        ]}
      >
        {checked && <CheckMarkFilled color={color} />}
      </View>
      {!!label && <Text style={styles.label}>Mark All</Text>}
    </Pressable>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  box: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#757281',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxChecked: {
    borderColor: '#2F50C1',
    backgroundColor: '#D9E6FD',
  },
  boxDisabled: {
    borderColor: '#A7A3B3',
    backgroundColor: '#CDCAD9',
  },
  label: { marginLeft: 8, color: '#2F50C1', fontSize: 18 },
});
