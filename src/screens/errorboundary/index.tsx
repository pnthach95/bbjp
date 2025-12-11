import Icon from '@react-native-vector-icons/material-design-icons';
import {Button, Text} from 'components/paper';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';
import RNRestart from 'react-native-restart';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {ErrorBoundaryProps} from 'react-native-error-boundary';

const ErrorBoundaryScreen: ErrorBoundaryProps['FallbackComponent'] = ({
  error,
}) => {
  const {colors} = useTheme(),
    {t} = useTranslation();

  const restart = () => {
    // Dùng cái này nếu có codepush
    // CodePush.restartApp();
    RNRestart.restart();
  };

  return (
    <SafeAreaView
      className="flex-1 items-center justify-center space-y-3 p-3"
      style={{backgroundColor: colors.background}}>
      <Icon color={colors.error} name="alert" size={100} />
      <Text className="text-center text-lg font-bold">
        {t('unexpected-error')}
      </Text>
      <ScrollView>
        <Text>{error.toString()}</Text>
      </ScrollView>
      <Button mode="contained" onPress={restart}>
        {t('reopen-app')}
      </Button>
    </SafeAreaView>
  );
};

export default ErrorBoundaryScreen;
