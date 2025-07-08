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
import { ThemeProvider } from '../core/theme/ThemeProvider';
import { routes } from './routes';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName={routes.SPLASH}
          screenOptions={{ headerShown: false }}
        >
          <RootStack.Screen name={routes.SPLASH} component={SplashScreen} />

          <RootStack.Screen name={routes.TABS} component={TabsScreen} />
          <RootStack.Screen name={routes.PROFILE} component={ProfileScreen} />
          <RootStack.Screen name={routes.SCAN} component={ScanScreen} />
          <RootStack.Screen
            name={routes.SHIPMENTS}
            component={ShipmentsScreen}
          />
          <RootStack.Screen name={routes.WALLET} component={WalletScreen} />

          <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <RootStack.Screen name={routes.LOGIN} component={LoginScreen} />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default RootNavigator;
