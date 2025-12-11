import {create} from 'apisauce';
import i18n from 'locales';
import {showMessage} from 'react-native-flash-message';
import type {ApiResponse} from 'apisauce';

const baseURL = 'https://tokyocafe.org';

const API = create({baseURL});

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
