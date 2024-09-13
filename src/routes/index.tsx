import 'locales';
import 'dayjs/locale/vi';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
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
ScreenGuardModule.registerWithBlurView({radius: 20});

const App = () => {
  const {i18n} = useTranslation(),
    {setColorScheme} = useColorScheme(),
    hydrated = useHydration(),
    appLanguage = useAppLanguage(),
    appTheme = useAppColorScheme();

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
              <FlashMessage position="top" />
            </ErrorBoundary>
          </BottomSheetModalProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
