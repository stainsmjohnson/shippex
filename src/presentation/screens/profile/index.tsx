import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from '../../components';
import { useAuth } from '../../../core/auth';

const ProfileScreen = () => {
  const { user, logout, loading } = useAuth();

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        {!!user?.imageUrl && (
          <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
        )}
        <Text style={styles.name}>{user?.name}</Text>
      </View>
      <Button
        title="Logout"
        type="secondary"
        style={styles.cta}
        onPress={logout}
        loading={loading}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
    marginBottom: 16,
  },
  name: { fontWeight: '600', fontSize: 18 },
  cta: { alignSelf: 'stretch' },
});
