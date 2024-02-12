import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Chip, Text} from 'react-native-paper';

type Props = {
  post: TPost;
};

const InforBox = ({post}: Props) => {
  const navigation = useNavigation();

  return (
    <>
      <View className="p-3">
        <Text selectable className="text-center" variant="titleMedium">
          {post.title}
        </Text>
      </View>
      <View className="flex-row">
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
    </>
  );
};

export default InforBox;
