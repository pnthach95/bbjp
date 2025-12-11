import {LegendList, type LegendListRenderItemProps} from '@legendapp/list';
import IDOMParser from 'advanced-html-parser';
import InforBox from 'components/inforbox';
import {ActivityIndicator} from 'components/paper';
import VSeparator from 'components/separator/v';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSafeAreaPaddingBottom} from 'utils/styles';
import PostImg from './components/img';
import type {RootStackScreenProps} from 'typings/navigation';

const PostScreen = ({navigation, route}: RootStackScreenProps<'Post'>) => {
  const {post} = route.params;
  const container = useSafeAreaPaddingBottom(0);
  const [loading, setLoading] = useState(true);
  const [imgs, setImgs] = useState<string[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (post.link) {
      setLoading(true);
      try {
        const response = await fetch(post.link);
        const res = await response.text();
        const doc = IDOMParser.parse(res, {
          onlyBody: true,
        });
        const contents = doc.documentElement.querySelectorAll('figure');
        const imgg: string[] = [];
        contents.forEach(c => {
          const img = c
            ?.querySelector('a')
            ?.querySelector('img')
            ?.getAttribute('src');
          if (img) {
            imgg.push(img);
          }
        });
        setImgs(imgg);
      } catch {
        // console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderItem = ({item, index}: LegendListRenderItemProps<string>) => {
    const onPress = () => {
      navigation.navigate('Gallery', {idx: index, images: imgs});
    };

    return <PostImg item={item} onPress={onPress} />;
  };

  const listHeader = () => {
    return (
      <View className="mb-3">
        <InforBox post={post} />
        {loading && <ActivityIndicator size="large" />}
      </View>
    );
  };

  return (
    <LegendList
      contentContainerStyle={container}
      data={imgs}
      ItemSeparatorComponent={VSeparator}
      ListHeaderComponent={listHeader}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default PostScreen;
