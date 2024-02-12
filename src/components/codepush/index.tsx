import {useAppState} from '@react-native-community/hooks';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import BootSplash from 'react-native-bootsplash';
// import CodePush from 'react-native-code-push';
import {Dialog, Text} from 'react-native-paper';
import {useHydration} from 'stores';
// import type {DownloadProgress} from 'react-native-code-push';

const styles = StyleSheet.create({
  borderRadius: {
    borderRadius: 16,
  },
  // progress: {height: 10},
});

const CodePushUpdateProgress = () => {
  const hydrated = useHydration(),
    {t} = useTranslation(),
    // [progress, setProgress] = useState<DownloadProgress | null>(null),
    // {colors} = useTheme(),
    appState = useAppState();

  // Canh chừng app đổi trạng thái active/background
  useEffect(() => {
    if (hydrated) {
      BootSplash.hide();
    }
    if (appState === 'active' && hydrated) {
      // CodePush.sync(
      //   {
      //     installMode: CodePush.InstallMode.IMMEDIATE,
      //     updateDialog: {
      //       title: t('codepush.title'),
      //       optionalUpdateMessage: t('codepush.message'),
      //       optionalIgnoreButtonLabel: t('codepush.cancel'),
      //       optionalInstallButtonLabel: t('codepush.update'),
      //     },
      //   },
      //   status => {
      //     // console.log('code push status', status);
      //     if (status === CodePush.SyncStatus.UNKNOWN_ERROR) {
      //       showMessage({message: t('codepush.failed'), type: 'danger'});
      //       setProgress(null);
      //     }
      //   },
      //   p => {
      //     if (p) {
      //       setProgress(p);
      //     }
      //     // console.log(
      //     //   'code push download',
      //     //   (p.receivedBytes / p.totalBytes) * 100,
      //     // );
      //   },
      // );
    }
  }, [appState, hydrated]);

  return (
    <Dialog
      dismissable={false}
      style={styles.borderRadius}
      // visible={!!progress}>
      visible={false}>
      <Dialog.Content>
        {/* {progress ? (
          <ProgressBar
            color={colors.primary}
            progress={progress.receivedBytes / progress.totalBytes}
            style={styles.progress}
          />
        ) : (
          <ActivityIndicator
            color={colors.primary}
            size="large"
            style={AppStyles.selfCenter}
          />
        )} */}
        <View className="h-3" />
        <Text className="text-center">{t('codepush.updating')}</Text>
      </Dialog.Content>
    </Dialog>
  );
};

export default CodePushUpdateProgress;
