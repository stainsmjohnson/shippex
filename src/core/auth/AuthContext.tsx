import React from 'react';

type User = {
  id: number;
  name: string;
};

export type AuthContextType = {
  token: string | null; // Token should not be here, should be stored in TokenManager
  initilized: boolean;
  user: any;
  loading: boolean;
  error: any;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  initialize: () => Promise<User | null>;
};

export const AuthContext = React.createContext<AuthContextType>({
  token: null,
  user: null,
  initilized: false,
  loading: false,
  error: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  initialize: async () => null,
});
