import dayjs from 'dayjs';
import {produce} from 'immer';
import i18n from 'locales';
import {NativeWindStyleSheet} from 'nativewind';
import {useEffect, useState} from 'react';
import {Appearance} from 'react-native';
import {getLanguage} from 'react-native-localization-settings';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import type {StateStorage} from 'zustand/middleware';

const storage = new MMKVLoader()
  .withInstanceID('Zuuist97sbs')
  .withEncryption()
  .initialize();

const useAppStore = create<StoreState>()(
  persist(
    _ => ({
      bundleVersion: '0',
      baseURL: 'https://tokyocafe.org',
      appTheme: Appearance.getColorScheme() || 'light',
      appLanguage: getLanguage().split('-')[0] as TLanguage,
      locker: 'unavailable',
      searchKeywords: [],
    }),
    {
      name: 'bbjp',
      version: 1,
      storage: createJSONStorage(() => storage as unknown as StateStorage),
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !['bundleVersion'].includes(key),
          ),
        ),
    },
  ),
);

export const useAppColorScheme = () => useAppStore(s => s.appTheme);
export const useBundleVersion = () => useAppStore(s => s.bundleVersion);
export const useAppLanguage = () => useAppStore(s => s.appLanguage);
export const useLocker = () => useAppStore(s => s.locker);
export const useSearchKeywords = () => useAppStore(s => s.searchKeywords);
export const useBaseURL = () => useAppStore(s => s.baseURL);

export const setBundleVersion = (bundleVersion: string) => {
  useAppStore.setState({bundleVersion});
};

export const setAppLanguage = (appLanguage: TLanguage) => {
  useAppStore.setState({appLanguage});
  i18n.changeLanguage(appLanguage);
  dayjs.locale(appLanguage);
};

export const setBaseURL = (baseURL: TBaseURL) => {
  useAppStore.setState({baseURL});
};

export const setLocker = (locker: TLockerState) => {
  useAppStore.setState({locker});
};

export const onAddNewSearchKeyword = (keyword: string) => {
  useAppStore.setState(
    produce<StoreState>(draft => {
      const idx = draft.searchKeywords.findIndex(v => v === keyword);
      if (idx !== -1) {
        draft.searchKeywords.splice(idx, 1);
      }
      draft.searchKeywords.unshift(keyword);
    }),
  );
};

export const onDeleteSearchKeyword = (idx: number) => {
  useAppStore.setState(
    produce<StoreState>(draft => {
      draft.searchKeywords.splice(idx, 1);
    }),
  );
};

export const onDeleteAllSearchKeyword = () => {
  useAppStore.setState({searchKeywords: []});
};

export const onSwitchTheme = () => {
  useAppStore.setState(
    produce<StoreState>(draft => {
      const newColor = draft.appTheme === 'dark' ? 'light' : 'dark';
      draft.appTheme = newColor;
      NativeWindStyleSheet.setColorScheme(newColor);
    }),
  );
};

export const useHydration = () => {
  const [hydrated, setHydrated] = useState(useAppStore.persist.hasHydrated);

  useEffect(() => {
    const unsubHydrate = useAppStore.persist.onHydrate(() =>
      setHydrated(false),
    );
    const unsubFinishHydration = useAppStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    setHydrated(useAppStore.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};
