import {Spinner} from 'heroui-native/spinner';
import {View} from 'react-native';
import {MaterialDesignIcons} from '../icons';
import {Text} from '../text';

type Props = {
  errorText: string;
};

const Loading = ({errorText}: Props) => (
  <View className="flex-1 items-center justify-center">
    {errorText.length > 0 ? (
      <>
        <MaterialDesignIcons
          colorClassName="accent-danger"
          name="rocket-launch"
          size={50}
          style={{transform: [{rotate: '90deg'}]}}
        />
        <Text className="text-lg text-danger">{errorText}</Text>
      </>
    ) : (
      <Spinner size="lg" />
    )}
  </View>
);

export default Loading;
