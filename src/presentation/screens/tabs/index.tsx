import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { routes } from '../../../navigator/routes';
import ProfileScreen from '../profile';
import ScanScreen from '../scan';
import ShipmentsScreen from '../shipments';
import WalletScreen from '../wallet';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={routes.SHIPMENTS}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name={routes.SHIPMENTS} component={ShipmentsScreen} />
      <Tab.Screen name={routes.SCAN} component={ScanScreen} />
      <Tab.Screen name={routes.WALLET} component={WalletScreen} />
      <Tab.Screen name={routes.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
