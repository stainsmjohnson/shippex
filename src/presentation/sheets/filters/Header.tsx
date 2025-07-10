import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinkButton } from '../../components';

export const Header = ({
  onCancel,
  onDone,
}: {
  onCancel: () => void;
  onDone: () => void;
}) => {
  return (
    <View style={styles.container}>
      <LinkButton title="Cancel" style={styles.leftAction} onPress={onCancel} />
      <Text style={styles.title}>Filters</Text>
      <LinkButton title="Done" style={styles.rightAction} onPress={onDone} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#EAE7F2',
    justifyContent: 'space-between',
  },
  leftAction: { minWidth: '30%' },
  rightAction: { minWidth: '30%', alignItems: 'flex-end' },
  title: { fontSize: 18, fontWeight: '600', lineHeight: 26 },
});
