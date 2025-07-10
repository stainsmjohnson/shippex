import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../core/theme';
import { IconButton } from '../../components';
import { BellOutlined, Logo } from '../../../assets/svgs';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../../navigator/routes';

export const Header = React.memo(
  ({ imageUrl, name }: { imageUrl: string | null; name: string | null }) => {
    const navigation = useNavigation();
    const { colors } = useTheme();

    const _showProfile = () => {
      navigation.navigate(routes.PROFILE);
    };

    return (
      <View>
        <View style={styles.topHeader}>
          {imageUrl ? (
            <Pressable onPress={_showProfile}>
              <Image source={{ uri: imageUrl }} style={styles.avatar} />
            </Pressable>
          ) : null}
          <Logo color={colors.primary} width={92} />
          <IconButton type="secondary" icon={<BellOutlined />} />
        </View>
        <View style={styles.welcome}>
          <Text>Hello,</Text>
          <Text style={styles.user}>{name ?? 'User'}</Text>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  topHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcome: { paddingHorizontal: 16, paddingVertical: 12 },
  user: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
});
