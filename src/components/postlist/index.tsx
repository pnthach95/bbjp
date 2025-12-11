import {
  LegendList,
  type LegendListRef,
  type LegendListRenderItemProps,
} from '@legendapp/list';
import {MaterialDesignIcons} from '@react-native-vector-icons/material-design-icons';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {RefreshControl, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from 'react-native-paper';
import Image from 'react-native-turbo-image';
import {useFlatlistColumns} from 'utils';
import {useSafeAreaPaddingBottom} from 'utils/styles';
import {ActivityIndicator, Chip, Text, TouchableRipple} from '../paper';

type Props = {
  postListRef?: React.Ref<LegendListRef>;
  posts: TPost[];
  refreshing: boolean;
  loading?: boolean;
  onEndReached?: () => void;
  onRefresh?: () => void;
};

const noop = () => {
  //
};

const gradientColor = '#0006';

const PostList = ({
  posts,
  postListRef,
  refreshing,
  loading,
  onEndReached,
  onRefresh,
}: Props) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {colors} = useTheme();
  const style = useSafeAreaPaddingBottom(12);
  const columns = useFlatlistColumns();

  const RC = (
    <RefreshControl
      colors={[colors.primary, colors.secondary]}
      refreshing={refreshing}
      tintColor={colors.primary}
      onRefresh={onRefresh}
    />
  );

  const renderItem = ({item}: LegendListRenderItemProps<TPost>) => {
    const onPress = () => {
      if (item.link) {
        navigation.navigate('Post', {post: item});
      }
    };

    return (
      <TouchableRipple borderless onLongPress={noop} onPress={onPress}>
        <>
          <Image
            source={{uri: item.img || ''}}
            style={{aspectRatio: 23 / 16}}
          />
          <View className="absolute top-0 right-0 bottom-0 left-0 justify-between">
            <LinearGradient
              className="p-3"
              colors={[gradientColor, 'transparent']}
              locations={[0.5, 1]}>
              <Text className="text-white" variant="labelSmall">
                {item.time}
              </Text>
            </LinearGradient>
            <LinearGradient
              className="p-3"
              colors={['transparent', gradientColor]}
              locations={[0, 0.5]}>
              <Text selectable className="text-white" variant="titleLarge">
                {item.title}
              </Text>
              <View className="flex-row flex-wrap items-center gap-3 pt-3">
                {[...item.cats, ...item.tags].map(c => {
                  const onPressItem = () => {
                    // @ts-ignore
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    navigation.push('Main', {metadata: c});
                  };

                  return (
                    <Chip key={c.name + c.link} compact onPress={onPressItem}>
                      {c.name}
                    </Chip>
                  );
                })}
              </View>
            </LinearGradient>
          </View>
        </>
      </TouchableRipple>
    );
  };

  return (
    <LegendList
      ref={postListRef}
      contentContainerStyle={style}
      data={posts}
      ListFooterComponent={
        !refreshing && loading ? (
          <ActivityIndicator className="m-3" size="large" />
        ) : null
      }
      ListHeaderComponent={
        !refreshing && !loading && posts.length === 0 ? (
          <View className="items-center justify-center">
            <MaterialDesignIcons color={colors.error} name="alert" size={70} />
            <Text>{t('not-found')}</Text>
          </View>
        ) : null
      }
      numColumns={columns}
      refreshControl={RC}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.4}
    />
  );
};

export default PostList;
