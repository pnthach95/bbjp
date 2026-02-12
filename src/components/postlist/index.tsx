import {LegendList} from '@legendapp/list';
import {StackActions, useNavigation} from '@react-navigation/native';
import {MaterialDesignIcons} from 'components/icons';
import {Spinner} from 'heroui-native/spinner';
import {useTranslation} from 'react-i18next';
import {RefreshControl, View} from 'react-native';
import {useFlatlistColumns} from 'utils';
import {useSafeAreaPaddingBottom} from 'utils/styles';
import {Text} from '../text';
import {PostItem} from './item';
import type {
  LegendListProps,
  LegendListRef,
  LegendListRenderItemProps,
} from '@legendapp/list';

type Props = {
  postListRef?: React.Ref<LegendListRef>;
  posts: TPost[];
  refreshing: boolean;
  loading?: boolean;
  onEndReached?: () => void;
  onRefresh?: () => void;
  ListHeaderComponent?: LegendListProps['ListHeaderComponent'];
};

const PostList = ({
  posts,
  postListRef,
  refreshing,
  loading,
  onEndReached,
  onRefresh,
  ListHeaderComponent,
}: Props) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const style = useSafeAreaPaddingBottom(12);
  const columns = useFlatlistColumns();

  const RC = (
    <RefreshControl
      colorsClassName="accent-primary"
      refreshing={refreshing}
      tintColorClassName="accent-primary"
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
          <MaterialDesignIcons
            colorClassName="accent-danger"
            name="alert"
            size={70}
          />
          <Text>{t('not-found')}</Text>
        </View>
      }
      ListFooterComponent={
        !refreshing && loading ? (
          <Spinner className="m-3 self-center" size="lg" />
        ) : null
      }
      ListHeaderComponent={ListHeaderComponent}
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
