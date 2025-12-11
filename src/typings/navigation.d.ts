import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Main: {metadata: TMetadata} | undefined;
  Post: {post: TPost};
  WebView: {title: string; uri: string};
  Search: undefined;
  Gallery: {idx: number; images: string[]};
};

type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
