/**
 * @format
 */

import { AppRegistry } from 'react-native';
import RootNavigator from './src/navigator/root';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => RootNavigator);
