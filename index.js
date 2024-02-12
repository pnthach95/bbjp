import 'intl-pluralrules';
import {AppRegistry, LogBox} from 'react-native';
import App from 'routes';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['[xmldom warning]']);

AppRegistry.registerComponent(appName, () => App);
