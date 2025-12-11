import {useIsFocused} from '@react-navigation/native';
import {IconButton} from 'components/paper';
import {useCallback, useEffect, useRef, useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import AwesomeGallery from 'react-native-awesome-gallery';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Image from 'react-native-turbo-image';
import {useAppColorScheme} from 'stores';
import {onDownloadImage} from 'utils';
import type {GalleryRef, RenderItemInfo} from 'react-native-awesome-gallery';
import type {RootStackScreenProps} from 'typings/navigation';

const renderItem = ({
  item,
  setImageDimensions,
}: RenderItemInfo<{uri: string}>) => {
  return (
    <Image
      resizeMode="contain"
      source={{uri: item.uri}}
      style={StyleSheet.absoluteFill}
      onSuccess={e => {
        const {width, height} = e.nativeEvent;
        setImageDimensions({width, height});
      }}
    />
  );
};

const GalleryScreen = ({
  navigation,
  route,
}: RootStackScreenProps<'Gallery'>) => {
  const {idx, images} = route.params;
  const appTheme = useAppColorScheme();
  const {top} = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const gallery = useRef<GalleryRef>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      StatusBar.setBarStyle(
        appTheme === 'dark' ? 'light-content' : 'dark-content',
      );
    };
  }, []);

  const [infoVisible, setInfoVisible] = useState(true);

  useEffect(() => {
    StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content', true);
    if (!isFocused) {
      StatusBar.setHidden(false, 'fade');
    }
  }, [isFocused]);

  const onIndexChange = useCallback(
    (index: number) => {
      if (isFocused) {
        navigation.setParams({idx: index});
      }
    },
    [isFocused],
  );

  const onTap = () => {
    StatusBar.setHidden(infoVisible, 'slide');
    setInfoVisible(!infoVisible);
  };

  const onPressDownload = () => {
    const item = images[idx];
    const filename = item.split('/').pop() || 'name.jpg';
    onDownloadImage(item, filename, filename.split('.').pop() || 'jpg');
  };

  return (
    <View className="flex-1">
      {infoVisible && (
        <Animated.View
          className="absolute z-10 w-full bg-black/50"
          entering={mounted ? FadeInUp.duration(250) : undefined}
          exiting={FadeOutUp.duration(250)}
          style={{
            height: top + 60,
            paddingTop: top,
          }}>
          <View className="flex-1 flex-row items-center justify-between px-3">
            <Text className="text-base font-semibold text-white">
              {idx + 1} / {images.length}
            </Text>
            <IconButton
              icon="download"
              iconColor="white"
              onPress={onPressDownload}
            />
          </View>
        </Animated.View>
      )}
      <AwesomeGallery
        ref={gallery}
        loop
        data={images.map(uri => ({uri}))}
        doubleTapInterval={150}
        initialIndex={idx}
        keyExtractor={item => item.uri}
        numToRender={3}
        renderItem={renderItem}
        onIndexChange={onIndexChange}
        onScaleEnd={scale => {
          if (scale < 0.8) {
            navigation.goBack();
          }
        }}
        onSwipeToClose={navigation.goBack}
        onTap={onTap}
      />
    </View>
  );
};

export default GalleryScreen;
