import 'locales';
import 'dayjs/locale/vi';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import CodePushUpdateProgress from 'components/codepush';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import {useColorScheme} from 'nativewind';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import ErrorBoundary from 'react-native-error-boundary';
import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ScreenGuardModule from 'react-native-screenguard';
import ErrorBoundaryScreen from 'screens/errorboundary';
import {useAppColorScheme, useAppLanguage, useHydration} from 'stores';
import {appMaterialDark, appMaterialLight} from 'utils/themes';
import Routes from './routes';

dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(customParseFormat);
ScreenGuardModule.register(null);

const App = () => {
  const {i18n} = useTranslation(),
    {setColorScheme} = useColorScheme(),
    hydrated = useHydration(),
    appLanguage = useAppLanguage(),
    appTheme = useAppColorScheme();

  useEffect(() => {
    // const getBundleVersion = async () => {
    //   try {
    //     const metadata = await CodePush.getUpdateMetadata();
    //     if (metadata && metadata.description) {
    //       setBundleVersion(`${metadata.description.replace(/\s.*/, '')}`);
    //     }
    //   } catch (e) {
    //     // console.log(e);
    //   }
    // };
    // getBundleVersion();
  }, []);

  useEffect(() => {
    setColorScheme(appTheme);
  }, [appTheme]);

  useEffect(() => {
    if (i18n.isInitialized && hydrated) {
      i18n.changeLanguage(appLanguage);
      dayjs.locale(appLanguage);
    }
  }, [i18n.isInitialized, hydrated]);

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <PaperProvider
          theme={appTheme === 'dark' ? appMaterialDark : appMaterialLight}>
          <BottomSheetModalProvider>
            <ErrorBoundary FallbackComponent={ErrorBoundaryScreen}>
              <Routes />
              <CodePushUpdateProgress />
              <FlashMessage position="top" />
            </ErrorBoundary>
          </BottomSheetModalProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
