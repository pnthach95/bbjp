import Icon from '@react-native-vector-icons/material-design-icons';
import {Button, Text} from 'components/paper';
import {SafeAreaView} from 'components/safeareaview';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';
import RNRestart from 'react-native-restart';
import type {ErrorBoundaryProps} from 'react-native-error-boundary';

const ErrorBoundaryScreen: ErrorBoundaryProps['FallbackComponent'] = ({
  error,
}) => {
  const {colors} = useTheme(),
    {t} = useTranslation();

  const restart = () => {
    RNRestart.restart();
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center space-y-3 bg-background p-3">
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
