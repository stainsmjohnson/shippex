import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import Button from '../../components/Button';
import { routes } from '../../../navigator/routes';
import { useAuth } from '../../../core/auth';

const Header = () => {
  return (
    <View style={{ padding: 20, alignItems: 'center', flexDirection: 'row' }}>
      <View
        style={{
          width: 20,
          height: 20,
          backgroundColor: 'pink',
          marginRight: 4,
        }}
      />
      <Text style={{ fontSize: 16, lineHeight: 22 }}>Cancel</Text>
    </View>
  );
};

const LoginScreen = ({ navigation }) => {
  const auth = useAuth();

  const _handleLogin = () => {
    auth.login();
  };

  return (
    <View>
      {Platform.OS === 'ios' && (
        <View
          style={{
            width: 36,
            height: 5,
            borderRadius: 10,
            backgroundColor: '#A7A3B3',
            alignSelf: 'center',
            marginTop: 5,
          }}
        />
      )}

      <Header />

      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Login</Text>
      <Text style={{ color: '#A7A3B3', marginTop: 10 }}>
        Please enter your First, Last name and your phone number in order to
        register
      </Text>

      <TextInput placeholder="URL" />
      <TextInput placeholder="Username / Email" />
      <TextInput placeholder="Password" />
      <Button
        title="Login"
        onPress={_handleLogin}
        disabled={false}
        loading={auth.loading}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
