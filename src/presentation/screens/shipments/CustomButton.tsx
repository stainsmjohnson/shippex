import React from 'react';
import { Text, ViewStyle, TouchableOpacity, StyleProp } from 'react-native';
import { makeStyles } from '../../../core/theme';

type Props = {
  title: string;
  color?: string;
  icon?: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export const CustomButton = ({
  title,
  color = '#6E91EC',
  icon,
  onPress,
  style,
}: Props) => {
  const { styles } = useStyles({ hasIcon: icon !== undefined, bgColor: color });

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {icon}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles<{ hasIcon: boolean; bgColor: string }>(
  ({ params }) => ({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 10,
      backgroundColor: params?.bgColor,
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      color: '#fff',
      marginLeft: params?.hasIcon ? 8 : 0,
    },
  }),
);
