import IDOMParser from 'advanced-html-parser';
import InforBox from 'components/inforbox';
import VSeparator from 'components/separator/v';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import PostImg from './components/img';
import type {ListRenderItem} from 'react-native';
import type {RootStackScreenProps} from 'typings/navigation';

const PostScreen = ({navigation, route}: RootStackScreenProps<'Post'>) => {
  const {post} = route.params;
  const [imgs, setImgs] = useState<string[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (post.link) {
      try {
        const response = await fetch(post.link);
        const res = await response.text();
        const doc = IDOMParser.parse(res, {
          ignoreTags: ['style', 'script', 'head'],
        });
        const contents = doc.documentElement.querySelectorAll('figure');
        const imgg: string[] = [];
        contents.forEach(c => {
          const img = c.querySelector('a')?.getAttribute('href');
          if (img) {
            imgg.push(img);
          }
        });
        setImgs(imgg);
      } catch (error) {
        //
      }
    }
  };

  const renderItem: ListRenderItem<string> = ({item, index}) => {
    const onPress = () => {
      navigation.navigate('Gallery', {idx: index, images: imgs});
    };

    return <PostImg item={item} onPress={onPress} />;
  };

  const listHeader = () => {
    return (
      <View className="mb-3">
        <InforBox post={post} />
      </View>
    );
  };

  return (
    <FlatList
      data={imgs}
      ItemSeparatorComponent={VSeparator}
      ListHeaderComponent={listHeader}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default PostScreen;
