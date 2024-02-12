import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import {Button} from 'react-native-paper';
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
    } catch (error) {
      //
    }
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 top-0 z-50 items-center justify-center bg-white dark:bg-black">
      <Button onPress={onUnlock}>{t('unlock')}</Button>
    </View>
  );
};

export default LockScreen;
