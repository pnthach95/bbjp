import API, {LINKS} from 'api';
import {MaterialDesignIcons} from 'components/icons';
import PostList from 'components/postlist';
import {Text} from 'components/text';
import {Button} from 'heroui-native/button';
import {Chip} from 'heroui-native/chip';
import {Input} from 'heroui-native/input';
import {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, View} from 'react-native';
import {
  onAddNewSearchKeyword,
  onDeleteAllSearchKeyword,
  onDeleteSearchKeyword,
  useSearchKeywords,
} from 'stores';
import {postParser} from 'utils';
import {useSafeAreaPaddingBottom} from 'utils/styles';
import type {FlashListRef} from '@shopify/flash-list';
import type {ListRenderItem, TextInput} from 'react-native';

const SearchScreen = () => {
  const searchKeywords = useSearchKeywords();
  const {t} = useTranslation();
  const container = useSafeAreaPaddingBottom(0);
  const [value, setValue] = useState('');
  const [posts, setPosts] = useState<TPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<TextInput>(null);
  const postListRef = useRef<FlashListRef<TPost>>(null);
  const page = useRef(1);
  const isEndList = useRef(false);

  const getData = async (s: string, p: number) => {
    const link = p === 1 ? LINKS.HOME : LINKS.PAGE + `${p}/`;
    setLoading(true);
    try {
      const response = await API.get<string>(link, {s});
      if (response.data) {
        const res = postParser(response.data);
        if (res.length < 12) {
          isEndList.current = true;
        }
        if (p === 1) {
          setPosts(res);
          postListRef.current?.scrollToOffset({offset: 0, animated: false});
        } else {
          setPosts([...posts, ...res]);
        }
      } else {
        isEndList.current = true;
      }
    } catch {
      // console.error(error);
      isEndList.current = true;
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    if (value) {
      onAddNewSearchKeyword(value);
      setRefreshing(true);
      page.current = 1;
      isEndList.current = false;
      await getData(value, 1);
    }
  };

  const onEndReached = () => {
    if (!isEndList.current && !refreshing && value && !loading) {
      getData(value, page.current + 1);
      page.current += 1;
    }
  };

  const renderSearchKeyword: ListRenderItem<string> = ({item, index}) => {
    const onPressDelete = () => onDeleteSearchKeyword(index);

    const onPressItem = () => {
      searchRef.current?.blur();
      setValue(item);
      onSubmit();
    };

    return (
      <Chip size="lg" variant="soft" onPress={onPressItem}>
        <Chip.Label>{item}</Chip.Label>
        <MaterialDesignIcons
          colorClassName="accent-danger"
          name="trash-can-outline"
          size={20}
          onPress={onPressDelete}
        />
      </Chip>
    );
  };

  const listHeader =
    searchKeywords.length > 0
      ? () => {
          return (
            <Button
              size="sm"
              variant="danger"
              onPress={onDeleteAllSearchKeyword}>
              <Text>{t('delete-all')}</Text>
            </Button>
          );
        }
      : undefined;

  return (
    <>
      <View className="flex-row gap-3 px-3 py-1">
        <Input
          ref={searchRef}
          autoFocus
          autoCapitalize="words"
          autoCorrect={false}
          className="flex-1"
          placeholder="Search"
          onChangeText={setValue}
          onSubmitEditing={onSubmit}
        />
        <Button isIconOnly variant="tertiary" onPress={onSubmit}>
          <MaterialDesignIcons color="white" name="magnify" size={24} />
        </Button>
      </View>
      <PostList
        ListHeaderComponent={
          <FlatList
            horizontal
            contentContainerClassName="items-center gap-3 px-3 py-1"
            contentContainerStyle={container}
            data={searchKeywords}
            keyboardShouldPersistTaps="always"
            ListHeaderComponent={listHeader}
            renderItem={renderSearchKeyword}
            showsHorizontalScrollIndicator={false}
          />
        }
        loading={loading}
        postListRef={postListRef}
        posts={posts}
        refreshing={refreshing}
        onEndReached={onEndReached}
        onPressLoadMore={
          isEndList.current || posts.length === 0 ? undefined : onEndReached
        }
        onRefresh={onSubmit}
      />
    </>
  );
};

export default SearchScreen;
