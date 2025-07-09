import React from 'react';
import { AuthContext, AuthContextType, User } from './AuthContext';

const TempToken = 'uhkdhakjshdakjhsdkjabsdabsjdhajksdbaskd';
const TempUser: User = {
  id: 1,
  name: 'John Doe',
  imageUrl: 'https://randomuser.me/api/portraits/women/80.jpg',
};

//Temp
const SecureStorage = {
  getItem: (key: string): Promise<string | null> => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (key === 'token') {
          resolve(TempToken);
        } else if (key === 'user') {
          resolve(JSON.stringify(TempUser));
        } else {
          resolve(null);
        }
      }, 1000);
    });
  },
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
      }, 1500),
    );
  };

  const login = () => {
    setLoading(true);
    setTimeout(() => {
      setUser(TempUser);
      setIsLoggedIn(true);
      setLoading(false);
    }, 2000);
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
