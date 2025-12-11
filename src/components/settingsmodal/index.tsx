import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import LanguageModal from 'components/lauguagemodal';
import CustomBackdrop from 'components/sheet/backdrop';
import CustomHandle from 'components/sheet/handle';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {View, useWindowDimensions} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  onSwitchTheme,
  setBaseURL,
  setLocker,
  useAppColorScheme,
  useAppLanguage,
  useBaseURL,
  useLocker,
} from 'stores';
import {useFlatlistColumns} from 'utils';
import {useAppTheme} from 'utils/themes';
import {
  Button,
  RadioButtonGroup,
  RadioButtonItem,
  Switch,
  Text,
  TouchableRipple,
} from '../paper';

type SettingsModal = {
  open: () => void;
};

const rnBiometrics = new ReactNativeBiometrics();

const baseURLs: TBaseURL[] = [
  'https://tokyocafe.org',
  'https://www.tokyobombers.com',
];

const SettingsModal = forwardRef<SettingsModal>(({}, ref) => {
  const appTheme = useAppColorScheme();
  const {t} = useTranslation();
  const {colors} = useAppTheme();
  const locker = useLocker();
  const [isSensorAvailable, setIsSensorAvailable] = useState(false);
  const modalRef = useRef<BottomSheetModal>(null);
  const languageRef = useRef<LanguageModal>(null);
  const baseURL = useBaseURL();
  const [url, setUrl] = useState(baseURL);
  const appLanguage = useAppLanguage();
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom || 24;
  const {width} = useWindowDimensions();
  const columns = useFlatlistColumns();
  const style = {marginHorizontal: bottomInset, width: width / columns};
  const backgroundStyle = {backgroundColor: colors.background};

  useImperativeHandle(ref, () => ({
    open: () => modalRef.current?.present(),
  }));

  useEffect(() => {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available} = resultObject;
      setIsSensorAvailable(available);
    });
  }, []);

  const showLanguageModal = () => {
    languageRef.current?.open();
  };

  const onChangeLocker = () => {
    if (locker === 'unavailable') {
      setLocker('unlock');
    } else {
      setLocker('unavailable');
    }
  };

  const onPressApply = () => {
    setBaseURL(url);
  };

  return (
    <>
      <BottomSheetModal
        ref={modalRef}
        detached
        enableDynamicSizing
        backdropComponent={CustomBackdrop}
        backgroundStyle={backgroundStyle}
        bottomInset={bottomInset}
        containerStyle={style}
        handleComponent={CustomHandle}>
        <BottomSheetView>
          <View className="m-1 rounded-3xl">
            <Text className="px-3 pb-3" variant="titleLarge">
              {t('tabs.tab2')}
            </Text>
            <Text className="p-3">Host</Text>
            <RadioButtonGroup
              value={url}
              onValueChange={v => setUrl(v as TBaseURL)}>
              {baseURLs.map(b => (
                <RadioButtonItem key={b} label={b} value={b} />
              ))}
            </RadioButtonGroup>
            <View className="p-3">
              <Button mode="contained" onPress={onPressApply}>
                {t('apply')}
              </Button>
            </View>
            <TouchableRipple onPress={onSwitchTheme}>
              <View className="flex-row justify-between p-3">
                <Text>{t('theme')}</Text>
                <Text>{t(appTheme)}</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={showLanguageModal}>
              <View className="flex-row justify-between p-3">
                <Text>{t('language')}</Text>
                <Text>{t(`lang.${appLanguage}`)}</Text>
              </View>
            </TouchableRipple>
            <View className="flex-row items-center justify-between p-3">
              <Text>{t('enable-locker')}</Text>
              <Switch
                disabled={!isSensorAvailable}
                value={locker !== 'unavailable'}
                onChange={onChangeLocker}
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
      <LanguageModal ref={languageRef} />
    </>
  );
});

export default SettingsModal;
