import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { makeStyles } from '../../../core/theme/makeStyle';

type ButtonTypes = 'primary' | 'secondary' | 'tertiary' | 'gray';
type ButtonSizes = 'large' | 'medium' | 'small';

type Props = {
  title: string;
  type?: ButtonTypes;
  size?: ButtonSizes;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  icon?: React.ReactNode;
};

const Button = ({
  title,
  type = 'primary',
  size = 'large',
  disabled,
  onPress,
  style,
  loading,
  icon,
}: Props) => {
  const { styles, colors } = useStyles({ type, size });

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={type === 'primary' ? colors.background : colors.primary}
        />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, icon !== undefined && styles.ml12]}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
};
``;

export default Button;

const useStyles = makeStyles<{ type: ButtonTypes; size: ButtonSizes }>(
  ({ colors, params }) => {
    const ButtonSizes: Record<ButtonSizes, number> = {
      large: 56,
      medium: 44,
      small: 36,
    };

    const ButtonBgColors: Record<ButtonTypes, string> = {
      primary: colors.primary,
      secondary: colors.secondary,
      tertiary: colors.background,
      gray: '#EAE7F2',
    };

    const ButtonTextColors: Record<ButtonTypes, string> = {
      primary: colors.background,
      secondary: colors.primary,
      tertiary: colors.primary,
      gray: '#58536E',
    };

    const FontSizes: Record<ButtonSizes, number> = {
      large: 17,
      medium: 16,
      small: 14,
    };

    const FontWeight: Record<ButtonSizes, TextStyle['fontWeight']> = {
      large: '700',
      medium: '400',
      small: '300',
    };

    return {
      button: {
        backgroundColor: params?.type
          ? ButtonBgColors[params?.type]
          : undefined,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderCurve: 'continuous',
        height: params?.size ? ButtonSizes[params?.size] : undefined,
      },
      pressed: {
        opacity: 0.7,
      },
      text: {
        fontSize: params?.size ? FontSizes[params?.size] : undefined,
        fontWeight: params?.size ? FontWeight[params?.size] : undefined,
        color: params?.type ? ButtonTextColors[params?.type] : undefined,
        textAlign: 'center',
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      },
      ml12: { marginLeft: 12 },
    };
  },
);
