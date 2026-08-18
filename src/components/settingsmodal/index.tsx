import LanguageModal from 'components/lauguagemodal';
import {BottomSheet} from 'heroui-native/bottom-sheet';
import {Button} from 'heroui-native/button';
import {RadioGroup} from 'heroui-native/radio-group';
import {Surface} from 'heroui-native/surface';
import {Switch} from 'heroui-native/switch';
import {Typography} from 'heroui-native/text';
import {useEffect, useImperativeHandle, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {
  setAppTheme,
  setBaseURL,
  setLocker,
  useAppTheme,
  useBaseURL,
  useLocker,
} from 'stores';

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
  const {t} = useTranslation();
  const locker = useLocker();
  const [isSensorAvailable, setIsSensorAvailable] = useState(false);
  const baseURL = useBaseURL();
  const [url, setUrl] = useState(baseURL);
  const activeTheme = useAppTheme();
  const themes: {
    name: TAppTheme;
    label: string;
  }[] = [
    {name: 'light', label: t('light')},
    {name: 'dark', label: t('dark')},
    {name: 'system', label: t('system')},
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
        <BottomSheet.Overlay className="bg-black/50" />
        <BottomSheet.Content>
          <View className="gap-3">
            <BottomSheet.Title>{t('tabs.tab2')}</BottomSheet.Title>
            <Surface className="gap-3" variant="secondary">
              <Typography className="text-lg font-medium text-foreground">
                Host
              </Typography>
              <RadioGroup
                value={url}
                onValueChange={v => setUrl(v as TBaseURL)}>
                {baseURLs.map(b => (
                  <RadioGroup.Item key={b} value={b}>
                    {b.replace('https://', '').replace('www.', '')}
                  </RadioGroup.Item>
                ))}
              </RadioGroup>
              <Button onPress={onPressApply}>{t('apply')}</Button>
            </Surface>
            <Surface className="gap-3" variant="secondary">
              <Typography className="text-lg font-medium text-foreground">
                {t('theme')}
              </Typography>
              <RadioGroup
                value={activeTheme}
                onValueChange={v => {
                  setAppTheme(v as TAppTheme);
                }}>
                {themes.map(th => (
                  <RadioGroup.Item key={th.name} value={th.name}>
                    {th.label}
                  </RadioGroup.Item>
                ))}
              </RadioGroup>
            </Surface>
            <LanguageModal />
            <Surface
              className="flex-row items-center justify-between"
              variant="secondary">
              <Typography>{t('enable-locker')}</Typography>
              <Switch
                isDisabled={!isSensorAvailable}
                isSelected={locker !== 'unavailable'}
                onSelectedChange={onChangeLocker}
              />
            </Surface>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
};
