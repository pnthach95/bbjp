import {BottomSheet} from 'heroui-native/bottom-sheet';
import {Button} from 'heroui-native/button';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {setAppLanguage, useAppLanguage} from 'stores';

const LanguageModal = ({children}: React.PropsWithChildren) => {
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
      <BottomSheet.Trigger>{children}</BottomSheet.Trigger>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content>
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
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
};

export default LanguageModal;
