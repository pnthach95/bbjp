import {Button} from 'components/paper';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {setLocker} from 'stores';

const rnBiometrics = new ReactNativeBiometrics();

const LockScreen = () => {
  const {t} = useTranslation();

  useEffect(() => {
    onUnlock();
  }, []);

  const onUnlock = async () => {
    try {
      const res = await rnBiometrics.simplePrompt({
        promptMessage: t('confirm-user'),
        cancelButtonText: t('cancel'),
      });
      const {success} = res;
      if (success) {
        setLocker('unlock');
      }
    } catch {
      //
    }
  };

  return (
    <View className="absolute top-0 right-0 bottom-0 left-0 z-50 items-center justify-center bg-white dark:bg-black">
      <Button onPress={onUnlock}>{t('unlock')}</Button>
    </View>
  );
};

export default LockScreen;
