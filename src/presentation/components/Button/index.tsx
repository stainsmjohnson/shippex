import { ActivityIndicator, Pressable, Text } from 'react-native';
import React from 'react';
import { makeStyles } from '../../../core/theme/makeStyle';

type Props = {
  title: string;
  type?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
  onPress?: () => void;
  style?: object;
  loading?: boolean;
};

const Button = ({
  title,
  type = 'primary',
  disabled,
  onPress,
  style,
  loading,
}: Props) => {
  const { styles, colors } = useStyles({ type });

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
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
};
``;

export default Button;

const useStyles = makeStyles<{ type: 'primary' | 'secondary' | 'tertiary' }>(
  ({ colors, params }) => ({
    button: {
      backgroundColor:
        params?.type === 'primary'
          ? colors.primary
          : params?.type === 'secondary'
          ? colors.secondary
          : colors.background,
      paddingVertical: 16,
      borderRadius: 10,
      alignItems: 'center',
      borderCurve: 'continuous',
    },
    pressed: {
      opacity: 0.7,
    },
    text: {
      fontSize: 16,
      fontWeight: '700',
      color:
        params?.type === 'primary'
          ? colors.background
          : params?.type === 'secondary'
          ? colors.primary
          : colors.primary,
      textAlign: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  }),
);
