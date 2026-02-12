import LanguageModal from 'components/lauguagemodal';
import {BottomSheet} from 'heroui-native/bottom-sheet';
import {Button} from 'heroui-native/button';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {RadioGroup} from 'heroui-native/radio-group';
import {Switch} from 'heroui-native/switch';
import {useEffect, useImperativeHandle, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {
  setBaseURL,
  setLocker,
  useAppLanguage,
  useBaseURL,
  useLocker,
} from 'stores';
import {Uniwind, useUniwind} from 'uniwind';
import {Text} from '../text';

type SettingsModal = {
  open: () => void;
};

const rnBiometrics = new ReactNativeBiometrics();

const baseURLs: TBaseURL[] = [
  'https://tokyocafe.org',
  'https://www.tokyobombers.com',
];

export type SettingsModalRef = {
  open: () => void;
};

type Props = {
  ref: React.RefObject<SettingsModalRef>;
};

export const SettingsModal = ({ref}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {theme, hasAdaptiveThemes} = useUniwind();
  const {t} = useTranslation();
  const locker = useLocker();
  const [isSensorAvailable, setIsSensorAvailable] = useState(false);
  const baseURL = useBaseURL();
  const [url, setUrl] = useState(baseURL);
  const appLanguage = useAppLanguage();
  const activeTheme = hasAdaptiveThemes ? 'system' : theme;
  const themes: {
    name: typeof activeTheme;
    label: string;
    icon: string;
  }[] = [
    {name: 'light', label: t('light'), icon: '☀️'},
    {name: 'dark', label: t('dark'), icon: '🌙'},
    {name: 'system', label: t('system'), icon: '⚙️'},
  ];

  useEffect(() => {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available} = resultObject;
      setIsSensorAvailable(available);
    });
  }, []);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
  }));

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
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content>
          <View className="m-1 rounded-3xl">
            <Text className="px-3 pb-3">{t('tabs.tab2')}</Text>
            <Text className="p-3">Host</Text>
            <RadioGroup value={url} onValueChange={v => setUrl(v as TBaseURL)}>
              {baseURLs.map(b => (
                <RadioGroup.Item key={b} value={b}>
                  {b}
                </RadioGroup.Item>
              ))}
            </RadioGroup>
            <View className="p-3">
              <Button onPress={onPressApply}>{t('apply')}</Button>
            </View>
            <View className="flex-row justify-between p-3">
              <Text>{t('theme')}</Text>
            </View>
            {themes.map(th => (
              <PressableFeedback
                key={th.name}
                className={`items-center rounded-lg px-4 py-3 ${
                  activeTheme === th.name
                    ? 'bg-blue-500'
                    : 'bg-gray-200 dark:bg-gray-700'
                } `}
                onPress={() => Uniwind.setTheme(th.name)}>
                <Text className="mb-1 text-2xl">{th.icon}</Text>
                <Text
                  className={`text-xs ${
                    activeTheme === th.name
                      ? 'text-white'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                  {th.label}
                </Text>
              </PressableFeedback>
            ))}
            <LanguageModal>
              <View className="flex-row justify-between p-3">
                <Text>{t('language')}</Text>
                <Text>{t(`lang.${appLanguage}`)}</Text>
              </View>
            </LanguageModal>
            <View className="flex-row items-center justify-between p-3">
              <Text>{t('enable-locker')}</Text>
              <Switch
                isDisabled={!isSensorAvailable}
                isSelected={locker !== 'unavailable'}
                onSelectedChange={onChangeLocker}
              />
            </View>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
};
