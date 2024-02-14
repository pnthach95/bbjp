import React from 'react';
import {WebView} from 'react-native-webview';
import {useSafeAreaPaddingBottom} from 'utils/styles';
import HeaderRight from './components/headerright';
import type {WebViewNavigation} from 'react-native-webview';
import type {RootStackScreenProps} from 'typings/navigation';

const WebViewScreen = ({
  navigation,
  route: {
    params: {uri},
  },
}: RootStackScreenProps<'WebView'>) => {
  const containerStyle = useSafeAreaPaddingBottom(12);

  const onStateChange = ({title, url}: WebViewNavigation) => {
    if (title) {
      navigation.setOptions({
        title,
        headerRight: () => <HeaderRight title={title} url={url} />,
      });
    }
  };

  return (
    <WebView
      allowsBackForwardNavigationGestures
      incognito
      allowsAirPlayForMediaPlayback={false}
      allowsFullscreenVideo={false}
      containerStyle={containerStyle}
      contentMode="mobile"
      enableApplePay={false}
      geolocationEnabled={false}
      source={{uri}}
      onNavigationStateChange={onStateChange}
    />
  );
};

export default WebViewScreen;
