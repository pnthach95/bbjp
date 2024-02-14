import {useScrollToTop} from '@react-navigation/native';
import API, {LINKS} from 'api';
import PostList from 'components/postlist';
import React, {useEffect, useRef, useState} from 'react';
import {postParser} from 'utils';
import type {RootStackScreenProps} from 'typings/navigation';

const HomeScreen = ({route}: RootStackScreenProps<'Main'>) => {
  const internalLink = route.params?.metadata.link.split('.com/')[1];
  const postListRef = useRef(null);
  const [posts, setPosts] = useState<TPost[]>([]);
  const page = useRef(1);
  const isEndList = useRef(false);
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(true);
  useScrollToTop(postListRef);

  useEffect(() => {
    getData(1);
  }, []);

  const getData = async (p: number) => {
    try {
      setLoading(true);
      const response = await API.get<string>(
        p === 1
          ? internalLink || LINKS.HOME
          : (internalLink ? internalLink + LINKS.PAGE : LINKS.PAGE) + `${p}/`,
        undefined,
      );
      if (response.data) {
        const parr = postParser(response.data);
        if (parr.length === 0) {
          isEndList.current = true;
        } else if (p === 1) {
          setPosts(parr);
        } else {
          setPosts([...posts, ...parr]);
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

  const onRefresh = () => {
    setRefreshing(true);
    isEndList.current = false;
    page.current = 1;
    getData(1);
  };

  const onEndReached = () => {
    if (!isEndList.current && !refreshing && !loading) {
      getData(page.current + 1);
      page.current += 1;
    }
  };

  return (
    <PostList
      loading={loading}
      postListRef={postListRef}
      posts={posts}
      refreshing={refreshing}
      onEndReached={onEndReached}
      onRefresh={onRefresh}
    />
  );
};

export default HomeScreen;
