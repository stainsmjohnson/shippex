import React, { useEffect } from 'react';
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
import { AuthProvider, useAuth } from '../core/auth';
import { Linking } from 'react-native';
import PreLoginScreen from '../presentation/screens/prelogin';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.initilized) auth.initialize();
  }, [auth]);

  return (
    <NavigationContainer
      fallback={<SplashScreen />}
      linking={{
        prefixes: ['https://shippex.com', 'shippex://'],
        // config: {},
        getInitialURL: async () => {
          const initialUrl = await Linking.getInitialURL();
          await auth.initialize();
          return initialUrl;
        },
      }}
    >
      <RootStack.Navigator
        initialRouteName={auth.isLoggedIn ? routes.TABS : routes.PRELOGIN}
        screenOptions={{ headerShown: false }}
      >
        {auth.isLoggedIn ? (
          <RootStack.Group>
            <RootStack.Screen name={routes.TABS} component={TabsScreen} />
            <RootStack.Screen name={routes.PROFILE} component={ProfileScreen} />
            <RootStack.Screen name={routes.SCAN} component={ScanScreen} />
            <RootStack.Screen
              name={routes.SHIPMENTS}
              component={ShipmentsScreen}
            />
            <RootStack.Screen name={routes.WALLET} component={WalletScreen} />
          </RootStack.Group>
        ) : (
          <>
            <RootStack.Screen
              name={routes.PRELOGIN}
              component={PreLoginScreen}
            />
            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
              <RootStack.Screen name={routes.LOGIN} component={LoginScreen} />
            </RootStack.Group>
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
