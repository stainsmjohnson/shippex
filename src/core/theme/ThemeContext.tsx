import React from 'react';

export const ThemeContext = React.createContext({
  theme: 'light',
  setTheme: (_theme: string) => {},
});
