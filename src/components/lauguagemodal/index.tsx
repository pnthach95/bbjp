import {Text} from 'components/text';
import {BottomSheet} from 'heroui-native/bottom-sheet';
import {Button} from 'heroui-native/button';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Surface} from 'heroui-native/surface';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {setAppLanguage, useAppLanguage} from 'stores';

const LanguageModal = () => {
  const appLanguage = useAppLanguage();
  const {t} = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const onPressEnglish = () => {
    setAppLanguage('en');
    setIsOpen(false);
  };
  const onPressVietnamese = () => {
    setAppLanguage('vi');
    setIsOpen(false);
  };

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Trigger asChild>
        <PressableFeedback>
          <PressableFeedback.Ripple />
          <Surface className="flex-row justify-between" variant="secondary">
            <Text>{t('language')}</Text>
            <Text>{t(`lang.${appLanguage}`)}</Text>
          </Surface>
        </PressableFeedback>
      </BottomSheet.Trigger>
      <BottomSheet.Portal>
        <BottomSheet.Overlay className="bg-black/50" />
        <BottomSheet.Content>
          <View className="gap-3">
            <BottomSheet.Title>{t('language')}</BottomSheet.Title>
            <Button
              variant={appLanguage === 'en' ? 'primary' : 'secondary'}
              onPress={onPressEnglish}>
              {t('lang.en')}
            </Button>
            <Button
              variant={appLanguage === 'vi' ? 'primary' : 'secondary'}
              onPress={onPressVietnamese}>
              {t('lang.vi')}
            </Button>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
};

export default LanguageModal;
