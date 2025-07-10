import React from 'react';
import { AuthContext, AuthContextType, User } from './AuthContext';
import * as AuthService from '../../services/auth';

//Temp
const SecureStorage = {
  getItem: (_key: string): Promise<string | null> => {
    return new Promise(resolve => {
      setTimeout(() => {
        // if (key === 'token') {
        //   resolve(TempToken);
        // } else if (key === 'user') {
        //   resolve(JSON.stringify(TempUser));
        // } else {
        resolve(null);
        // }
      }, 1000);
    });
  },
  setItem: (_key: string, _value: string) => {},
  multiRemove: (...keys: string[]): void => {
    keys.forEach(key => {
      console.log(`Removed ${key} from secure storage`);
    });
  },
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState<string | null>(null);
  const [initilized, setInitilized] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const initilizeAuth = async () => {
    setLoading(true);
    await new Promise(resolve =>
      setTimeout(async () => {
        const _token = await SecureStorage.getItem('token');
        const _user = await SecureStorage.getItem('user');
        if (_token) {
          setToken(_token as string);
        }
        if (_user) {
          setUser(JSON.parse(_user) as User);
        }
        setLoading(false);
        setInitilized(true);
        resolve(_user ? user : null);
      }, 500),
    );
  };

  const login = async (
    url: string,
    usernameOrEmail: string,
    password: string,
  ) => {
    setLoading(true);

    const [failure, data] = await AuthService.login(
      url,
      usernameOrEmail,
      password,
    );

    if (failure) {
      setError(failure.message);
      setLoading(false);
      return;
    }

    setError(null);
    setToken(data.token);
    setUser(data.user);
    setIsLoggedIn(true);
    setLoading(false);

    SecureStorage.setItem('user', data.user);
    SecureStorage.setItem('token', data.token);
  };

  const logout = () => {
    SecureStorage.multiRemove('token', 'user');
    setUser(null);
    setIsLoggedIn(false);
    setToken(null);
    setError(null);
    setLoading(false);
  };

  const value: AuthContextType = {
    token,
    user,
    loading,
    error,
    isLoggedIn,
    initilized,
    login,
    logout,
    initialize: initilizeAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
