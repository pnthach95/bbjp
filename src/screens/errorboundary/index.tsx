import {MaterialDesignIcons} from 'components/icons';
import {SafeAreaView} from 'components/safeareaview';
import {Text} from 'components/text';
import {Button} from 'heroui-native/button';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';
import RNRestart from 'react-native-restart';
import type {ErrorBoundaryProps} from 'react-native-error-boundary';

const ErrorBoundaryScreen: ErrorBoundaryProps['FallbackComponent'] = ({
  error,
}) => {
  const {t} = useTranslation();

  const restart = () => {
    RNRestart.restart();
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center gap-3 bg-background p-3">
      <MaterialDesignIcons
        colorClassName="accent-danger"
        name="alert"
        size={100}
      />
      <Text className="text-center text-lg font-bold">
        {t('unexpected-error')}
      </Text>
      <ScrollView
        className="grow-0 rounded-xl border border-red-500"
        contentContainerClassName="p-3">
        <Text>{error.toString()}</Text>
      </ScrollView>
      <Button variant="primary" onPress={restart}>
        {t('reopen-app')}
      </Button>
    </SafeAreaView>
  );
};

export default ErrorBoundaryScreen;
