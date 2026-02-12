import '../global.css';
import 'locales';
import 'dayjs/locale/vi';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import {HeroUINativeProvider} from 'heroui-native/provider';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import ErrorBoundary from 'react-native-error-boundary';
import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ScreenGuardModule from 'react-native-screenguard';
import ErrorBoundaryScreen from 'screens/errorboundary';
import {useAppLanguage, useHydration} from 'stores';
import Routes from './routes';

dayjs.extend(localizedFormat);
dayjs.extend(duration);
dayjs.extend(customParseFormat);

const App = () => {
  const {i18n} = useTranslation(),
    hydrated = useHydration(),
    appLanguage = useAppLanguage();

  useEffect(() => {
    const init = async () => {
      try {
        await ScreenGuardModule.initSettings({
          displayScreenGuardOverlay: true,
          timeAfterResume: 2000,
          getScreenshotPath: true,
        });
        ScreenGuardModule.registerWithBlurView({radius: 20});
      } catch (error) {
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.error('Failed to initialize ScreenGuard:', error);
        }
      }
    };

    init();

    // Cleanup on unmount
    return () => {
      ScreenGuardModule.unregister();
    };
  }, []);

  useEffect(() => {
    if (i18n.isInitialized && hydrated) {
      i18n.changeLanguage(appLanguage);
      dayjs.locale(appLanguage);
    }
  }, [i18n.isInitialized, hydrated]);

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <KeyboardProvider>
          <HeroUINativeProvider>
            <BottomSheetModalProvider>
              <ErrorBoundary FallbackComponent={ErrorBoundaryScreen}>
                <Routes />
                <FlashMessage position="top" />
              </ErrorBoundary>
            </BottomSheetModalProvider>
          </HeroUINativeProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
