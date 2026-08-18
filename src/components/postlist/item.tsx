import {getAverageColor} from '@somesoap/react-native-image-palette';
import {Chip} from 'heroui-native/chip';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Typography} from 'heroui-native/text';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Image from 'react-native-turbo-image';

type Props = {
  item: TPost;
  onPress: () => void;
  onPressTag: (tag: TMetadata) => void;
};

const noop = () => {
  //
};

const gradientColor = '#0006';

export const PostItem = ({onPress, onPressTag, item}: Props) => {
  const [color, setColor] = useState('white');

  useEffect(() => {
    if (item.img) {
      getAverageColor(item.img).then(setColor);
    }
  }, [item.img]);

  return (
    <PressableFeedback onLongPress={noop} onPress={onPress}>
      <Image source={{uri: item.img || ''}} style={{aspectRatio: 23 / 16}} />
      <View className="absolute top-0 right-0 bottom-0 left-0 justify-between">
        <LinearGradient
          colors={[gradientColor, 'transparent']}
          locations={[0.5, 1]}>
          <View className="p-3">
            <Typography className="text-white">{item.time}</Typography>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={['transparent', gradientColor]}
          locations={[0, 0.5]}>
          <View className="p-3">
            <Typography selectable className="text-xl text-white">
              {item.title}
            </Typography>
            <View className="flex-row flex-wrap items-center gap-3 pt-3">
              {[...item.cats, ...item.tags].map(c => {
                const onPressItem = () => {
                  onPressTag(c);
                };

                return (
                  <Chip
                    key={c.name + c.link}
                    variant="secondary"
                    onPress={onPressItem}>
                    {c.name}
                  </Chip>
                );
              })}
            </View>
          </View>
        </LinearGradient>
      </View>
      <PressableFeedback.Ripple
        animation={{
          backgroundColor: {value: color},
          opacity: {value: [0, 0.3, 0]},
        }}
      />
    </PressableFeedback>
  );
};
