import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ScanScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ScanScreen</Text>
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
