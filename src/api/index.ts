import {create} from 'apisauce';
import i18n from 'locales';
import {showMessage} from 'react-native-flash-message';
import type {ApiResponse} from 'apisauce';

const baseURL = 'https://www.bigboobsjapan.com';

const API = create({baseURL});

API.axiosInstance.interceptors.response.use(
  // Any status codes that lie within the range of 2xx (default), or do pass custom `validateStatus()` cause this function to trigger
  function (response) {
    const params = Object.entries(
      response.config.params as Record<string, string>,
    );
    const paramsString: string[] = [];
    params.forEach(p => {
      paramsString.push(p[0] + '=' + p[1].replaceAll(' ', '+'));
    });
    const url =
      (response.config.baseURL || '') +
      '/' +
      (response.config.url || '') +
      (paramsString.length > 0 ? '?' + paramsString.join('&') : '');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const responseURL = response.request?.responseURL as string;
    // console.log(url, responseURL);

    if (url !== responseURL) {
      throw new Error('NO_REDIRECT');
    } else {
      return response;
    }
  },
);

API.addMonitor((response: ApiResponse<string>) => {
  // console.log(JSON.stringify(response, null, 2));
  if (response.config?.url && [LINKS.PAGE].includes(response.config.url)) {
    // console.log('return', response.config.url);
    /** Không hiện thông báo cho các URL ở trên */
    return;
  }
  if (!response.ok) {
    // console.log(JSON.stringify(response, null, 2));
    switch (response.problem) {
      case 'CLIENT_ERROR':
        if (response.status === 401) {
          showMessage({
            message: i18n.t('session-expired'),
            type: 'warning',
          });
        }
        break;
      case 'NETWORK_ERROR':
      case 'CONNECTION_ERROR':
        showMessage({
          message: i18n.t('no-internet'),
          type: 'danger',
        });
        break;
      default:
        break;
    }
  }
});

export const LINKS = {
  HOME: '',
  PAGE: 'page/',
};

export const setAPIToken = (token?: string | null) => {
  if (token) {
    API.setHeader('Authorization', 'Bearer ' + token);
  } else {
    API.deleteHeader('Authorization');
  }
};

export default API;
