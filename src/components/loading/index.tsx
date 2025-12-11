import {MaterialDesignIcons} from '@react-native-vector-icons/material-design-icons';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {ActivityIndicator, HelperText} from '../paper';

type Props = {
  errorText: string;
};

const Loading = ({errorText}: Props) => {
  const {colors} = useTheme();
  return (
    <View className="flex-1 items-center justify-center">
      {errorText.length > 0 ? (
        <>
          <MaterialDesignIcons
            color={colors.error}
            name="rocket-launch"
            size={50}
            style={{transform: [{rotate: '90deg'}]}}
          />
          <HelperText className="text-lg" type="error">
            {errorText}
          </HelperText>
        </>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

export default Loading;
