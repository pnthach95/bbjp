import 'intl-pluralrules';
import {AppRegistry, LogBox} from 'react-native';
import App from 'routes';
import {name as appName} from './app.json';

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('./ReactotronConfig');
}

LogBox.ignoreLogs([
  'InteractionManager has been deprecated',
  'SafeAreaView has been deprecated',
  '[xmldom warning]',
]);

AppRegistry.registerComponent(appName, () => App);
