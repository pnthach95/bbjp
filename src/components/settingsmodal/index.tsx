import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import LanguageModal from 'components/lauguagemodal';
import CustomBackdrop from 'components/sheet/backdrop';
import CustomHandle from 'components/sheet/handle';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {
  Button,
  RadioButton,
  Switch,
  Text,
  TouchableRipple,
} from 'react-native-paper';
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
import {useAppTheme} from 'utils/themes';

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
  const style = {marginHorizontal: bottomInset};
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
        handleComponent={CustomHandle}
        style={style}>
        <BottomSheetView>
          <View className="m-1 rounded-3xl">
            <Text className="px-3 pb-3" variant="titleLarge">
              {t('tabs.tab2')}
            </Text>
            <Text className="p-3">Host</Text>
            <RadioButton.Group
              value={url}
              onValueChange={v => setUrl(v as TBaseURL)}>
              {baseURLs.map(b => (
                <RadioButton.Item key={b} label={b} value={b} />
              ))}
            </RadioButton.Group>
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
