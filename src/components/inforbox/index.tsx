import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {Chip, Text} from '../paper';

type Props = {
  post: TPost;
};

const InforBox = ({post}: Props) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center pt-3">
      <View className="items-center px-3">
        <Text>{post.time}</Text>
      </View>
      <View className="flex-1 flex-row flex-wrap items-center gap-3">
        {[...post.cats, ...post.tags].map(c => {
          const onPress = () => {
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            navigation.push('Main', {metadata: c});
          };

          return (
            <Chip key={c.name} onPress={onPress}>
              {c.name}
            </Chip>
          );
        })}
      </View>
    </View>
  );
};

export default InforBox;
