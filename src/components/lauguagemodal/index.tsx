import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import CustomBackdrop from 'components/sheet/backdrop';
import CustomHandle from 'components/sheet/handle';
import {forwardRef, useImperativeHandle, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {View, type ViewStyle, useWindowDimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {setAppLanguage, useAppLanguage} from 'stores';
import {useFlatlistColumns} from 'utils';
import {Button, Text} from '../paper';

type LanguageModal = {
  open: () => void;
};

const LanguageModal = forwardRef<LanguageModal>(({}, ref) => {
  const modalRef = useRef<BottomSheetModal>(null);
  const {colors} = useTheme();
  const appLanguage = useAppLanguage();
  const {t} = useTranslation();
  const {width} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom || 24;
  const columns = useFlatlistColumns();
  const backgroundStyle = {backgroundColor: colors.background};
  const containerStyle: ViewStyle = {
    marginHorizontal: columns > 1 ? width / 4 : bottomInset,
  };
  const style: ViewStyle = {
    width: columns > 1 ? width / 2 : width - bottomInset * 2,
  };

  useImperativeHandle(ref, () => ({
    open: () => modalRef.current?.present(),
  }));

  const onPressEnglish = () => {
    setAppLanguage('en');
    modalRef.current?.dismiss();
  };
  const onPressVietnamese = () => {
    setAppLanguage('vi');
    modalRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={modalRef}
      detached
      enableDynamicSizing
      backdropComponent={CustomBackdrop}
      backgroundStyle={backgroundStyle}
      bottomInset={bottomInset}
      containerStyle={containerStyle}
      handleComponent={CustomHandle}
      style={style}>
      <BottomSheetView>
        <View className="m-3 gap-y-3 rounded-3xl p-3">
          <Text variant="titleLarge">{t('language')}</Text>
          <Button
            mode={appLanguage === 'en' ? 'contained' : 'outlined'}
            onPress={onPressEnglish}>
            {t('lang.en')}
          </Button>
          <Button
            mode={appLanguage === 'vi' ? 'contained' : 'outlined'}
            onPress={onPressVietnamese}>
            {t('lang.vi')}
          </Button>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default LanguageModal;
