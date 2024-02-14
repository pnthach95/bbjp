import API, {LINKS} from 'api';
import PostList from 'components/postlist';
import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {Appbar, Searchbar} from 'react-native-paper';
import {RootStackScreenProps} from 'typings/navigation';
import {postParser} from 'utils';

const SearchScreen = ({navigation}: RootStackScreenProps<'Search'>) => {
  const [value, setValue] = useState('');
  const [posts, setPosts] = useState<TPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const page = useRef(1);
  const isEndList = useRef(false);

  const getData = async (s: string, p: number) => {
    const link = p === 1 ? LINKS.HOME : LINKS.PAGE + `${p}/`;
    setLoading(true);
    try {
      const response = await API.get<string>(link, {s});
      if (response.data) {
        const res = postParser(response.data);
        if (p === 1) {
          setPosts(res);
        } else {
          setPosts([...posts, ...res]);
        }
      } else {
        isEndList.current = true;
      }
    } catch (error) {
      // console.log(error);
      isEndList.current = true;
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    if (value) {
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

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <View className="flex-1">
          <Searchbar
            value={value}
            onChangeText={setValue}
            onIconPress={onSubmit}
            onSubmitEditing={onSubmit}
          />
        </View>
      </Appbar.Header>
      <PostList
        loading={loading}
        posts={posts}
        refreshing={refreshing}
        onEndReached={onEndReached}
        onRefresh={onSubmit}
      />
    </>
  );
};

export default SearchScreen;
