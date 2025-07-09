import { ActivityIndicator, Pressable, Text } from 'react-native';
import React from 'react';
import { makeStyles } from '../../../core/theme/makeStyle';

type Props = {
  type?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
  onPress?: () => void;
  style?: object;
  loading?: boolean;
};

const IconButton = ({
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
        <Text style={styles.text}></Text>
      )}
    </Pressable>
  );
};
``;

export default IconButton;

const useStyles = makeStyles<{ type: 'primary' | 'secondary' | 'tertiary' }>(
  ({ colors, params }) => ({
    button: {
      backgroundColor:
        params?.type === 'primary'
          ? colors.primary
          : params?.type === 'secondary'
          ? colors.secondary
          : colors.background,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
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
