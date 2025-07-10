import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

type Props = {
  origin?: boolean;
  rightAlign?: boolean;
  city: string;
  address: string;
};

export const ShipmentLocation = ({
  origin,
  rightAlign,
  city,
  address,
}: Props) => {
  return (
    <View style={[styles.container, rightAlign && styles.rightAlign]}>
      <Text numberOfLines={1} style={styles.label}>
        {origin ? 'Origin' : 'Destination'}
      </Text>
      <Text numberOfLines={1} style={styles.city}>
        {city}
      </Text>
      <Text numberOfLines={1} style={styles.address}>
        {address}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  rightAlign: { alignItems: 'flex-end' },
  label: { fontSize: 11, fontWeight: '400', color: '#2F50C1' },
  city: { fontSize: 16, fontWeight: '400', color: '#000000', lineHeight: 22 },
  address: { fontSize: 13, fontWeight: '300', color: '#58536E' },
});
