import 'locales';
import {useAppState} from '@react-native-community/hooks';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsModal from 'components/settingsmodal';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import {AnimatePresence, MotiView} from 'moti';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, StatusBar, View} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import BootSplash from 'react-native-bootsplash';
import {IconButton} from 'react-native-paper';
import GalleryScreen from 'screens/gallery';
import HomeScreen from 'screens/home';
import LockScreen from 'screens/lock';
import PostScreen from 'screens/post';
import SearchScreen from 'screens/search';
import WebViewScreen from 'screens/webview';
import {setLocker, useAppColorScheme, useLocker} from 'stores';
import {navigationDarkTheme, navigationTheme, useAppTheme} from 'utils/themes';
import type {RootStackParamList} from 'typings/navigation';

dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(customParseFormat);

const rnBiometrics = new ReactNativeBiometrics();
const RootStack = createStackNavigator<RootStackParamList>();

const Routes = () => {
  const appTheme = useAppColorScheme(),
    {t} = useTranslation(),
    {colors} = useAppTheme();
  const locker = useLocker();
  const appState = useAppState();
  const settingsRef = useRef<SettingsModal>(null);
  const [isSensorAvailable, setIsSensorAvailable] = useState(false);

  useEffect(() => {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available} = resultObject;
      setIsSensorAvailable(available);
    });
    /** Màu StatusBar không gán được trong lần đầu mở app,
     *  setTimeout để fix
     */
    setTimeout(() => {
      StatusBar.setBarStyle(
        appTheme === 'dark' ? 'light-content' : 'dark-content',
      );
      Platform.OS === 'android' && StatusBar.setBackgroundColor(colors.card);
    }, 500);
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
        backgroundColor={colors.elevation.level2}
        barStyle={appTheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <RootStack.Navigator>
        <RootStack.Screen
          component={HomeScreen}
          name="Main"
          options={({route: {params}, navigation}) => ({
            title: params?.metadata.name || t('tabs.tab1'),
            headerRight: () => {
              // @ts-ignore
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
              const onPressSearch = () => navigation.navigate('Search');
              const onPressSettings = () => settingsRef.current?.open();

              return (
                <View className="flex-row">
                  <IconButton icon="magnify" onPress={onPressSearch} />
                  <IconButton icon="cog" onPress={onPressSettings} />
                </View>
              );
            },
          })}
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
          }) => ({
            title,
            headerRight: link
              ? () => {
                  const onPress = () => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                    navigation.navigate('WebView', {uri: link, title});
                  };
                  return <IconButton icon="web" onPress={onPress} />;
                }
              : undefined,
          })}
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
            className="absolute bottom-0 left-0 right-0 top-0"
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
