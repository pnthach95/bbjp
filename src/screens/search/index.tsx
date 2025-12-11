import {
  LegendList,
  type LegendListRef,
  type LegendListRenderItemProps,
} from '@legendapp/list';
import API, {LINKS} from 'api';
import {
  AppbarBackAction,
  AppbarHeader,
  IconButton,
  Searchbar,
  Text,
  TouchableRipple,
} from 'components/paper';
import PostList from 'components/postlist';
import {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
  onAddNewSearchKeyword,
  onDeleteAllSearchKeyword,
  onDeleteSearchKeyword,
  useSearchKeywords,
} from 'stores';
import {postParser} from 'utils';
import {useSafeAreaPaddingBottom} from 'utils/styles';
import type {TextInput, TextInputSubmitEditingEvent} from 'react-native';
import type {RootStackScreenProps} from 'typings/navigation';

const SearchScreen = ({navigation}: RootStackScreenProps<'Search'>) => {
  const searchKeywords = useSearchKeywords();
  const {t} = useTranslation();
  const {colors} = useTheme();
  const container = useSafeAreaPaddingBottom(0);
  const [value, setValue] = useState('');
  const [posts, setPosts] = useState<TPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keywordListVisible, setKeywordListVisible] = useState(true);
  const searchRef = useRef<TextInput>(null);
  const postListRef = useRef<LegendListRef>(null);
  const page = useRef(1);
  const isEndList = useRef(false);
  const backdrop = {backgroundColor: colors.backdrop};
  const bg = {backgroundColor: colors.background};

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

  const renderSearchKeyword = ({
    item,
    index,
  }: LegendListRenderItemProps<string>) => {
    const onPressDelete = () => onDeleteSearchKeyword(index);

    const onPressItem = () => {
      searchRef.current?.blur();
      onHideKeywordList();
      setValue(item);
      onSubmit(item);
    };

    return (
      <TouchableRipple style={bg} onPress={onPressItem}>
        <View className="flex-row items-center justify-between px-3">
          <Text>{item}</Text>
          <IconButton icon="trash-can-outline" onPress={onPressDelete} />
        </View>
      </TouchableRipple>
    );
  };

  const listHeader =
    searchKeywords.length > 0
      ? () => {
          return (
            <TouchableRipple
              className="p-3"
              style={bg}
              onPress={onDeleteAllSearchKeyword}>
              <Text>{t('delete-all')}</Text>
            </TouchableRipple>
          );
        }
      : undefined;

  const onIconPress = () => onSubmit();

  const onSubmitEditing = ({
    nativeEvent: {text},
  }: TextInputSubmitEditingEvent) => onSubmit(text);

  const onShowKeywordList = () => setKeywordListVisible(true);
  const onHideKeywordList = () => setKeywordListVisible(false);

  return (
    <>
      <AppbarHeader>
        <AppbarBackAction onPress={navigation.goBack} />
        <View className="flex-1">
          <Searchbar
            ref={searchRef}
            autoComplete="off"
            value={value}
            onBlur={onHideKeywordList}
            onChangeText={setValue}
            onFocus={onShowKeywordList}
            onIconPress={onIconPress}
            onSubmitEditing={onSubmitEditing}
          />
        </View>
      </AppbarHeader>
      <View className="flex-1">
        <PostList
          loading={loading}
          postListRef={postListRef}
          posts={posts}
          refreshing={refreshing}
          onEndReached={onEndReached}
          onRefresh={onSubmit}
        />
        {keywordListVisible && (
          <View
            className="absolute top-0 right-0 bottom-0 left-0 z-40"
            style={backdrop}>
            <LegendList
              contentContainerStyle={container}
              data={searchKeywords}
              keyboardShouldPersistTaps="always"
              ListHeaderComponent={listHeader}
              renderItem={renderSearchKeyword}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default SearchScreen;
