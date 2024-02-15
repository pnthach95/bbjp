type TLanguage = 'en' | 'vi';

type TLockerState = 'lock' | 'unlock' | 'unavailable';

type StoreState = {
  bundleVersion: string;
  appTheme: 'dark' | 'light';
  appLanguage: TLanguage;
  locker: TLockerState;
  searchKeywords: string[];
};

type TMetadata = {
  name: string;
  link: string;
};

type TPost = {
  key: string;
  link?: string;
  title: string;
  img?: string;
  time?: string;
  cats: TMetadata[];
  tags: TMetadata[];
};
