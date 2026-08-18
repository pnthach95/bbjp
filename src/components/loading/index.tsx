import {Spinner} from 'heroui-native/spinner';
import {Typography} from 'heroui-native/text';
import {View} from 'react-native';
import {MaterialDesignIcons} from '../uniwind';

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
        <Typography className="text-lg text-danger">{errorText}</Typography>
      </>
    ) : (
      <Spinner size="lg" />
    )}
  </View>
);

export default Loading;
