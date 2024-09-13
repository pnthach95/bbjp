import {FasterImageView} from '@candlefinance/faster-image';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, StyleSheet, View} from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import {
  ActivityIndicator,
  HelperText,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {onDownloadImage} from 'utils';
import type {FasterImageProps} from '@candlefinance/faster-image';

type Props = {
  item: string;
  onPress?: () => void;
};

const noop = () => {
  // fix long press
};

const styles = StyleSheet.create({img: {height: '100%', width: '100%'}});

const PostImg = ({item, onPress}: Props) => {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [aspectRatio, setAspectRatio] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const filename = item.split('/').pop() || 'name.jpg';

  const onLoad: FasterImageProps['onSuccess'] = ({
    nativeEvent: {height, width},
  }) => {
    setAspectRatio(width / height);
    setLoading(false);
  };

  const onError = () => setError(true);

  if (error) {
    return (
      <View className="items-center justify-center">
        <HelperText type="error">{t('server-error')}</HelperText>
        <Text>{item}</Text>
      </View>
    );
  }

  return (
    <ContextMenu
      actions={[
        {
          title: t('download'),
          systemIcon:
            Platform.OS === 'ios'
              ? 'square.and.arrow.down'
              : 'baseline_download',
          iconColor: colors.onBackground,
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
          <FasterImageView
            key={(item.split('/').pop() || 'zz') + `${aspectRatio}`}
            source={{url: item, resizeMode: 'contain'}}
            style={styles.img}
            onError={onError}
            onSuccess={onLoad}
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
