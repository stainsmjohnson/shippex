import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useTheme } from './useTheme';
import { useMemo } from 'react';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

type BaseColors = {
  primary: string;
  primaryLight: string;

  secondary: string;

  background: string;
  cardBackground: string;

  textPrimary: string;
  textSecondary: string;

  disabled: string;
  border: string;

  success: string;
  warning: string;
  error: string;
  info: string;
};

export const makeStyles = <
  K extends Record<string, any>,
  T extends NamedStyles<T> | NamedStyles<any> = NamedStyles<any>,
>(
  _st: (theme: { colors: BaseColors; params?: K }) => T,
): ((params?: K) => { styles: T; colors: BaseColors; params?: K }) => {
  return (params?: K) => {
    const { colors } = useTheme();

    const styles = useMemo(
      () => StyleSheet.create(_st({ colors, params })),
      [colors, params],
    );

    return { styles, colors, params };
  };
};
