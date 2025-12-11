import {LegendList} from '@legendapp/list';
import {MaterialDesignIcons} from '@react-native-vector-icons/material-design-icons';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {RefreshControl, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useFlatlistColumns} from 'utils';
import {useSafeAreaPaddingBottom} from 'utils/styles';
import {ActivityIndicator, Text} from '../paper';
import {PostItem} from './item';
import type {LegendListRef, LegendListRenderItemProps} from '@legendapp/list';

type Props = {
  postListRef?: React.Ref<LegendListRef>;
  posts: TPost[];
  refreshing: boolean;
  loading?: boolean;
  onEndReached?: () => void;
  onRefresh?: () => void;
};

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
    const onPressTag = (tag: TMetadata) => {
      navigation.dispatch(StackActions.push('Main', {metadata: tag}));
    };

    return <PostItem item={item} onPress={onPress} onPressTag={onPressTag} />;
  };

  return (
    <LegendList
      ref={postListRef}
      recycleItems
      contentContainerStyle={style}
      contentInsetAdjustmentBehavior="automatic"
      data={posts}
      keyExtractor={({key}) => key}
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center pt-5">
          <MaterialDesignIcons color={colors.error} name="alert" size={70} />
          <Text>{t('not-found')}</Text>
        </View>
      }
      ListFooterComponent={
        !refreshing && loading ? (
          <ActivityIndicator className="m-3" size="large" />
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
