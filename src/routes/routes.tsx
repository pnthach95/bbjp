import 'locales';
import {useAppState} from '@react-native-community/hooks';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IconButton} from 'components/paper';
import SettingsModal from 'components/settingsmodal';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import {AnimatePresence, MotiView} from 'moti';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StatusBar} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import BootSplash from 'react-native-bootsplash';
import GalleryScreen from 'screens/gallery';
import HomeScreen from 'screens/home';
import LockScreen from 'screens/lock';
import PostScreen from 'screens/post';
import SearchScreen from 'screens/search';
import WebViewScreen from 'screens/webview';
import {setLocker, useAppColorScheme, useLocker} from 'stores';
import {navigationDarkTheme, navigationTheme} from 'utils/themes';
import type {RootStackParamList} from 'typings/navigation';

dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(customParseFormat);

const rnBiometrics = new ReactNativeBiometrics();
const RootStack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  const appTheme = useAppColorScheme(),
    {t} = useTranslation();
  const locker = useLocker();
  const appState = useAppState();
  const settingsRef = useRef<SettingsModal>(null);
  const [isSensorAvailable, setIsSensorAvailable] = useState(false);

  useEffect(() => {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available} = resultObject;
      setIsSensorAvailable(available);
    });
  }, []);

  useEffect(() => {
    if (
      isSensorAvailable &&
      locker !== 'unavailable' &&
      appState !== 'active'
    ) {
      setLocker('lock');
    }
  }, [isSensorAvailable, locker, appState]);

  const onReady = () => {
    BootSplash.hide({fade: true});
  };

  return (
    <NavigationContainer
      theme={appTheme === 'dark' ? navigationDarkTheme : navigationTheme}
      onReady={onReady}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={appTheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <RootStack.Navigator>
        <RootStack.Screen
          component={HomeScreen}
          name="Main"
          options={({route: {params}, navigation}) => {
            const onPressSearch = () => navigation.navigate('Search');
            const onPressSettings = () => settingsRef.current?.open();

            return {
              title: params?.metadata.name || t('tabs.tab1'),
              headerBlurEffect: 'regular',
              headerTransparent: true,
              unstable_headerRightItems: ({tintColor}) => [
                {
                  type: 'button',
                  tintColor,
                  label: 'Search',
                  onPress: onPressSearch,
                  icon: {name: 'magnifyingglass', type: 'sfSymbol'},
                },
                {
                  type: 'button',
                  tintColor,
                  label: 'Settings',
                  onPress: onPressSettings,
                  icon: {name: 'gearshape.fill', type: 'sfSymbol'},
                },
              ],
              headerRight: ({tintColor}) => {
                return (
                  <>
                    <IconButton
                      icon="magnify"
                      iconColor={tintColor}
                      onPress={onPressSearch}
                    />
                    <IconButton
                      icon="cog"
                      iconColor={tintColor}
                      onPress={onPressSettings}
                    />
                  </>
                );
              },
            };
          }}
        />
        <RootStack.Screen
          component={PostScreen}
          name="Post"
          options={({
            navigation,
            route: {
              params: {
                post: {title, link},
              },
            },
          }) => {
            const onPress = () => {
              if (link) {
                navigation.navigate('WebView', {uri: link, title});
              }
            };

            return {
              title,
              headerBlurEffect: 'regular',
              headerTransparent: true,
              headerRight: link
                ? () => {
                    return <IconButton icon="web" onPress={onPress} />;
                  }
                : undefined,
              unstable_headerRightItems: link
                ? ({tintColor}) => [
                    {
                      type: 'button',
                      tintColor,
                      onPress,
                      label: 'Open web',
                      icon: {type: 'sfSymbol', name: 'globe.fill'},
                    },
                  ]
                : undefined,
            };
          }}
        />
        <RootStack.Screen
          component={WebViewScreen}
          name="WebView"
          options={({
            route: {
              params: {title},
            },
          }) => ({title})}
        />
        <RootStack.Screen
          component={SearchScreen}
          name="Search"
          options={{headerShown: false}}
        />
        <RootStack.Screen
          component={GalleryScreen}
          name="Gallery"
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
      <SettingsModal ref={settingsRef} />
      <AnimatePresence>
        {isSensorAvailable && locker === 'lock' && (
          <MotiView
            animate={{opacity: 1}}
            className="absolute top-0 right-0 bottom-0 left-0"
            exit={{opacity: 0}}
            from={{opacity: 1}}
            transition={{type: 'timing', duration: 500}}>
            <LockScreen />
          </MotiView>
        )}
      </AnimatePresence>
    </NavigationContainer>
  );
};

export default Routes;
