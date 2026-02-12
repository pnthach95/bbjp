import API, {LINKS} from 'api';
import {MaterialDesignIcons} from 'components/icons';
import PostList from 'components/postlist';
import {Text} from 'components/text';
import {Button} from 'heroui-native/button';
import {Chip} from 'heroui-native/chip';
import {useLayoutEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList} from 'react-native';
import {
  onAddNewSearchKeyword,
  onDeleteAllSearchKeyword,
  onDeleteSearchKeyword,
  useSearchKeywords,
} from 'stores';
import {postParser} from 'utils';
import {useSafeAreaPaddingBottom} from 'utils/styles';
import type {LegendListRef} from '@legendapp/list';
import type {ListRenderItem} from 'react-native';
import type {SearchBarCommands} from 'react-native-screens';
import type {RootStackScreenProps} from 'typings/navigation';

const SearchScreen = ({navigation}: RootStackScreenProps<'Search'>) => {
  const searchKeywords = useSearchKeywords();
  const {t} = useTranslation();
  const container = useSafeAreaPaddingBottom(0);
  const [value, setValue] = useState('');
  const [posts, setPosts] = useState<TPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<SearchBarCommands>(null);
  const postListRef = useRef<LegendListRef>(null);
  const page = useRef(1);
  const isEndList = useRef(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        ref: searchRef,
        onSearchButtonPress: event => onSubmit(event?.nativeEvent?.text),
      },
    });
  }, [navigation]);

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

  const onSubmit = async (v = value) => {
    if (v) {
      onAddNewSearchKeyword(v);
      setRefreshing(true);
      page.current = 1;
      isEndList.current = false;
      await getData(v, 1);
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
      onSubmit(item);
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
      onRefresh={onSubmit}
    />
  );
};

export default SearchScreen;
