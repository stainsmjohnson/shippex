import React from 'react';

export type User = {
  id: number;
  name: string;
  imageUrl: string | null;
};

export type AuthContextType = {
  token: string | null; // Token should not be here, should be stored in TokenManager
  initilized: boolean;
  user: User | null;
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
