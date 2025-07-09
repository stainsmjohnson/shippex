import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../presentation/screens/splash';
import LoginScreen from '../presentation/screens/login';
import TabsScreen from '../presentation/screens/tabs';

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
          const [initialUrl] = await Promise.all([
            Linking.getInitialURL(),
            auth.initialize(),
          ]);
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
