import {useNavigation} from '@react-navigation/native';
import InforBox from 'components/inforbox';
import VSeparator from 'components/separator/v';
import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableRipple, useTheme} from 'react-native-paper';
import {useSafeAreaPaddingBottom} from 'utils/styles';
import type {ListRenderItem} from 'react-native';

type Props = {
  postListRef?: React.LegacyRef<FlatList<TPost>>;
  posts: TPost[];
  refreshing: boolean;
  onEndReached?: () => void;
  onRefresh?: () => void;
};

const PostList = ({
  posts,
  postListRef,
  refreshing,
  onEndReached,
  onRefresh,
}: Props) => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const style = useSafeAreaPaddingBottom(12);

  const RC = (
    <RefreshControl
      colors={[colors.primary, colors.secondary]}
      refreshing={refreshing}
      tintColor={colors.primary}
      onRefresh={onRefresh}
    />
  );

  const renderItem: ListRenderItem<TPost> = ({item}) => {
    const onPress = () => {
      if (item.link) {
        navigation.navigate('Post', {post: item});
      }
    };

    return (
      <>
        <TouchableRipple borderless onPress={onPress}>
          <FastImage className="aspect-[23/16]" source={{uri: item.img}} />
        </TouchableRipple>
        <InforBox post={item} />
      </>
    );
  };

  return (
    <FlatList
      ref={postListRef}
      contentContainerStyle={style}
      data={posts}
      ItemSeparatorComponent={VSeparator}
      refreshControl={RC}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
    />
  );
};

export default PostList;
