import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, View} from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import FastImage from 'react-native-fast-image';
import {ActivityIndicator, TouchableRipple, useTheme} from 'react-native-paper';
import {onDownloadImage} from 'utils';
import type {OnLoadEvent} from 'react-native-fast-image';

type Props = {
  item: string;
  onPress?: () => void;
};

const noop = () => {
  // fix long press
};

const PostImg = ({item, onPress}: Props) => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [aspectRatio, setAspectRatio] = useState(1);
  const [loading, setLoading] = useState(true);
  const filename = item.split('/').pop() || 'name.jpg';

  const onLoad = ({nativeEvent: {height, width}}: OnLoadEvent) => {
    setAspectRatio(width / height);
  };

  const onLoadEnd = () => setLoading(false);

  return (
    <ContextMenu
      actions={[
        {
          title: t('download'),
          systemIcon:
            Platform.OS === 'ios'
              ? 'square.and.arrow.down'
              : 'baseline_download',
          systemIconColor: colors.onBackground,
        },
      ]}
      className="w-full"
      style={{aspectRatio}}
      onPress={({nativeEvent: {index}}) => {
        if (index === 0) {
          onDownloadImage(item, filename, filename.split('.').pop() || 'jpg');
        }
      }}>
      <TouchableRipple onLongPress={noop} onPress={onPress}>
        <>
          <FastImage
            className="h-full w-full"
            resizeMode="contain"
            source={{uri: item}}
            onLoad={onLoad}
            onLoadEnd={onLoadEnd}
          />
          {loading && (
            <View className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center">
              <ActivityIndicator size="large" />
            </View>
          )}
        </>
      </TouchableRipple>
    </ContextMenu>
  );
};

export default PostImg;
