type TLanguage = 'en' | 'vi';

type TLockerState = 'lock' | 'unlock' | 'unavailable';

type TBaseURL = 'https://tokyocafe.org' | 'https://www.tokyobombers.com';

type StoreState = {
  bundleVersion: string;
  appLanguage: TLanguage;
  baseURL: TBaseURL;
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
