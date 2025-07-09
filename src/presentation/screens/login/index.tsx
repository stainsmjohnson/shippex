import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import Button from '../../components/Button';
import { routes } from '../../../navigator/routes';
import { useAuth } from '../../../core/auth';
import { TextBox } from '../../components';
import { useTheme } from '../../../core/theme';

const Header = () => {
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
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
  const { colors } = useTheme();

  const _handleLogin = () => {
    auth.login();
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}
    >
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

      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Login</Text>
        <Text style={{ color: '#A7A3B3', marginTop: 10, marginBottom: 6 }}>
          Please enter your First, Last name and your phone number in order to
          register
        </Text>

        <TextBox placeholder="URL" style={{ marginTop: 32 }} />
        <TextBox placeholder="Username / Email" style={{ marginTop: 32 }} />
        <TextBox placeholder="Password" style={{ marginTop: 32 }} />
      </View>
      <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
        <Button
          title="Login"
          onPress={_handleLogin}
          disabled={false}
          loading={auth.loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
