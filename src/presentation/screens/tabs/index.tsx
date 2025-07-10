import React from 'react';
import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../profile';
import ScanScreen from '../scan';
import ShipmentsScreen from '../shipments';
import WalletScreen from '../wallet';
import {
  ProfileOutlined,
  ScanOutlined,
  ShipmentsOutlined,
  WalletOutlined,
} from '../../../assets/svgs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StyleSheet, Text } from 'react-native';
import { routes } from '../../../navigator/routes';

const Tab = createBottomTabNavigator();

const TabBarIcons = {
  [routes.SHIPMENTS]: ShipmentsOutlined,
  [routes.SCAN]: ScanOutlined,
  [routes.WALLET]: WalletOutlined,
  [routes.PROFILE]: ProfileOutlined,
};

const TabBarLabels = {
  [routes.SHIPMENTS]: 'Shipments',
  [routes.SCAN]: 'Scan',
  [routes.WALLET]: 'Wallet',
  [routes.PROFILE]: 'Profile',
};

type ScreenOptions = (props: {
  route: RouteProp<ParamListBase, string>;
  navigation: BottomTabNavigationProp<ParamListBase, string, undefined>;
  theme: ReactNavigation.Theme;
}) => BottomTabNavigationOptions;

const screenOptions: ScreenOptions = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ color }: any) => {
    const Icon = TabBarIcons?.[route.name as keyof typeof TabBarIcons];
    return <Icon color={color} />;
  },
  tabBarActiveTintColor: '#2F50C1',
  tabBarInactiveTintColor: '#A7A3B3',
  tabBarLabel: ({ color }) => (
    <Text style={[styles.tabLabel, { color }]}>
      {TabBarLabels[route.name as keyof typeof TabBarIcons]}
    </Text>
  ),
});

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={routes.SHIPMENTS}
      screenOptions={screenOptions}
    >
      <Tab.Screen name={routes.SHIPMENTS} component={ShipmentsScreen} />
      <Tab.Screen name={routes.SCAN} component={ScanScreen} />
      <Tab.Screen name={routes.WALLET} component={WalletScreen} />
      <Tab.Screen name={routes.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabLabel: { fontSize: 11, marginTop: 4 },
});
