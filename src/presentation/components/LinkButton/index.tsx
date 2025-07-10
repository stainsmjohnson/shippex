import React from 'react';
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { makeStyles } from '../../../core/theme';

const LinkButton = ({
  title,
  style,
  onPress,
  icon,
}: {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  icon?: React.ReactNode;
}) => {
  const { styles } = useStyles({ hasIcon: icon !== undefined });
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {icon}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default LinkButton;

const useStyles = makeStyles<{ hasIcon: boolean }>(({ params }) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#2F50C1',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 26,
    marginLeft: params?.hasIcon ? 8 : 0,
  },
}));
