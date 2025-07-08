import React from 'react';
import { ThemeContext } from './ThemeContext';

import { lightTheme } from './themes';

const getTheme = (theme: string) => {
  // For now, we only have a light theme
  switch (theme) {
    case 'light':
      return lightTheme;
    default:
      return lightTheme;
  }
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return getTheme(context.theme);
};
