import { Platform, SafeAreaView, Text, View } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import { useAuth } from '../../../core/auth';
import { LinkButton, TextBox } from '../../components';
import { makeStyles } from '../../../core/theme';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftOutlined } from '../../../assets/svgs';

const LoginScreen = () => {
  const navigation = useNavigation();
  const auth = useAuth();
  const { styles } = useStyles();

  const [url, setUrl] = useState('');
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

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
        />
        <TextBox
          placeholder="Username / Email"
          style={styles.mt32}
          value={usernameOrEmail}
          onChangeText={setUsernameOrEmail}
        />
        <TextBox
          placeholder="Password"
          style={styles.mt32}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.footer}>
        <Button
          title="Login"
          onPress={auth.login}
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
}));
