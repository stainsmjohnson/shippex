import { Platform, SafeAreaView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { useAuth } from '../../../core/auth';
import { LinkButton, TextBox } from '../../components';
import { makeStyles } from '../../../core/theme';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftOutlined } from '../../../assets/svgs';
import {
  isValidEmail,
  isValidPassword,
  isValidURL,
  isValidUsername,
} from '../../../utils/validations';

type ErrorType = {
  url: string | null;
  username: string | null;
  password: string | null;
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const auth = useAuth();
  const { styles } = useStyles();

  const [url, setUrl] = useState('');
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ErrorType>({
    url: null,
    username: null,
    password: null,
  });

  useEffect(() => {
    setErrors(pre => ({ ...pre, url: null }));
  }, [url]);

  useEffect(() => {
    setErrors(pre => ({ ...pre, username: null }));
  }, [usernameOrEmail]);

  useEffect(() => {
    setErrors(pre => ({ ...pre, password: null }));
  }, [password]);

  const _validate = () => {
    let _errors: ErrorType = { url: null, username: null, password: null };

    if (!url || !isValidURL('https://' + url)) {
      _errors.url = 'Enter valid url!';
    }

    if (
      !usernameOrEmail ||
      !(isValidEmail(usernameOrEmail) || isValidUsername(usernameOrEmail))
    ) {
      _errors.username = 'Enter valid username or email address!';
    }

    if (!password || !isValidPassword(password)) {
      _errors.password = password ? 'Invalid password!' : 'Enter password!';
    }

    setErrors(_errors);
    return Object.values(_errors).some(value => !!value);
  };

  const _handleLogin = () => {
    const error = _validate();
    if (error) return;

    auth.login(url, usernameOrEmail, password);
  };

  return (
    <SafeAreaView style={styles.screen}>
      {Platform.OS === 'ios' && <View style={styles.handle} />}

      <View style={styles.content}>
        <LinkButton
          title="Cancel"
          onPress={navigation.goBack}
          icon={<ChevronLeftOutlined />}
        />
        <Text style={styles.title}>Login</Text>
        <Text style={styles.desc}>
          Please enter your First, Last name and your phone number in order to
          register
        </Text>

        <TextBox
          placeholder="URL"
          style={styles.mt32}
          value={url}
          onChangeText={setUrl}
          prefix="https://"
          error={errors.url}
          keyboardType="url"
          autoCapitalize="none"
        />
        <TextBox
          placeholder="Username / Email"
          style={styles.mt32}
          value={usernameOrEmail}
          onChangeText={setUsernameOrEmail}
          error={errors.username}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextBox
          placeholder="Password"
          style={styles.mt32}
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          autoCapitalize="none"
          secureTextEntry
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.error}>{auth.error}</Text>
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

const useStyles = makeStyles(({ colors }) => ({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 10,
    backgroundColor: '#A7A3B3',
    alignSelf: 'center',
    marginTop: 5,
  },
  content: { flex: 1, paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 12 },
  desc: { color: '#A7A3B3', marginTop: 10, marginBottom: 6 },
  mt32: { marginTop: 32 },
  footer: { paddingHorizontal: 16, paddingVertical: 24 },
  error: { marginVertical: 12, color: '#EF4444' },
}));
