import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../presentation/screens/splash';
import LoginScreen from '../presentation/screens/login';
import TabsScreen from '../presentation/screens/tabs';
import ProfileScreen from '../presentation/screens/profile';
import ScanScreen from '../presentation/screens/scan';
import ShipmentsScreen from '../presentation/screens/shipments';
import WalletScreen from '../presentation/screens/wallet';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="Splash" component={SplashScreen} />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Tabs" component={TabsScreen} />
        <RootStack.Screen name="Profile" component={ProfileScreen} />
        <RootStack.Screen name="Scan" component={ScanScreen} />
        <RootStack.Screen name="Shipments" component={ShipmentsScreen} />
        <RootStack.Screen name="Wallet" component={WalletScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
