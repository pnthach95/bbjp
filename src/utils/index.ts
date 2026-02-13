import {alert} from '@baronha/ting';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import IDOMParser from 'advanced-html-parser';
import i18n from 'locales';
import {Alert, Linking, Platform, useWindowDimensions} from 'react-native';
import BlobUtil from 'react-native-blob-util';
import {showMessage} from 'react-native-flash-message';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import type {PermissionStatus} from 'react-native-permissions';

export const openLink = (link?: string) => {
  try {
    if (link) {
      Linking.openURL(link);
    }
  } catch (error) {
    if (error instanceof Error) {
      showMessage({message: error.message, type: 'warning'});
    }
  }
};

export const postParser = (html: string): TPost[] => {
  const doc = IDOMParser.parse(html, {
    ignoreTags: ['style', 'script'],
  });
  const parr: TPost[] = [];
  try {
    const article = doc.documentElement.querySelectorAll('article');
    article.forEach(v => {
      const post: TPost = {
        key: '',
        title: '',
        cats: [],
        tags: [],
      };
      const h2a = v.querySelector('h2')?.querySelector('a');
      const link = h2a?.getAttribute('href');
      if (link) {
        const cats = v
          .querySelector('div.entry-byline-cats')
          ?.querySelectorAll('a');
        const tags = v
          .querySelector('div.entry-byline-tags')
          ?.querySelectorAll('a');

        post.key = v.getAttribute('id');
        post.link = link;
        post.title = h2a?.text() || '(no title)';
        post.img = v
          .querySelector('div.entry-featured-img-wrap')
          ?.querySelector('img')
          ?.getAttribute('src');
        post.time = v.querySelector('time')?.text();
        cats?.forEach(c => {
          post.cats.push({link: c.getAttribute('href'), name: c.text()});
        });
        tags?.forEach(t => {
          post.tags.push({link: t.getAttribute('href'), name: t.text()});
        });
        parr.push(post);
      }
    });
  } catch {
    // console.log(error);
  }
  return parr;
};

const session = 'downloadImage';

const askOpenSettings = () => {
  Alert.alert(i18n.t('save-image.error'), i18n.t('save-image.error-detail'), [
    {
      onPress: () => {
        Linking.openSettings();
      },
      isPreferred: true,
      style: 'default',
      text: i18n.t('save-image.open-settings'),
    },
    {
      style: 'cancel',
      text: i18n.t('cancel'),
    },
  ]);
};

export const onDownloadImage = async (
  url: string,
  filename: string,
  ext = 'png',
) => {
  let status: PermissionStatus =
    Platform.OS === 'ios' ? RESULTS.UNAVAILABLE : RESULTS.GRANTED;
  try {
    if (Platform.OS === 'ios') {
      // On iOS, full permission is needed to save pictures into specific album
      status = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (status !== RESULTS.GRANTED) {
        status = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        if (status !== RESULTS.GRANTED) {
          askOpenSettings();
        }
      }
    }
    if (status === RESULTS.GRANTED) {
      const response = await BlobUtil.config({
        fileCache: true,
        path: BlobUtil.fs.dirs.CacheDir + '/' + filename,
        appendExt: ext,
        session,
      }).fetch('get', url);
      if (Platform.OS === 'ios') {
        await CameraRoll.saveAsset(response.path(), {
          album: 'bbjp',
          type: 'photo',
        });
      } else {
        BlobUtil.MediaCollection.copyToMediaStore(
          {name: filename, parentFolder: 'bbjp', mimeType: 'image/jpg'},
          'Download',
          response.path(),
        );
      }
      alert({
        title: i18n.t('save-image.title'),
        message: i18n.t('save-image.success'),
        preset: 'done',
        haptic: 'success',
      });
      BlobUtil.session(session).dispose();
    }
  } catch (error) {
    // console.log(error);
    if (error instanceof Error) {
      if (error.message.includes('PHPhotosErrorDomain')) {
        askOpenSettings();
      } else {
        alert({
          title: i18n.t('save-image.title'),
          message: i18n.t('save-image.failed'),
          preset: 'error',
          haptic: 'error',
        });
      }
    }
  }
};

export const useFlatlistColumns = () => {
  const {width} = useWindowDimensions();
  if (width >= 1536) {
    return 5;
  }
  if (width >= 1280) {
    return 4;
  }
  if (width >= 1024) {
    return 3;
  }
  if (width >= 768) {
    return 2;
  }
  return 1;
};

export const useImageColumns = () => {
  const {width} = useWindowDimensions();
  if (width >= 1536) {
    return 3;
  }
  if (width >= 1280) {
    return 3;
  }
  if (width >= 1024) {
    return 3;
  }
  if (width >= 768) {
    return 2;
  }
  return 1;
};
