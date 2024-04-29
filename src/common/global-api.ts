import { Indexable } from 'fx-front-utils';

const GlobalAPI = {
  config: {
    PROD_PREFIX: process.env.PROD_PREFIX,
    BASE_URL: process.env.BASE_URL,
    BASE_URL_WARNING: process.env.BASE_URL_WARNING,
    API_PREFIX_CENTRE_CONFIG: process.env.API_PREFIX_CENTRE_CONFIG,
    FILE_SERVICE_HTTP: process.env.FILE_SERVICE_HTTP,
    LOGIN_URL_USER_CENTER: process.env.LOGIN_URL_USER_CENTER,
    API_PREFIX_USER_CENTER: process.env.API_PREFIX_USER_CENTER,
    CLIENT_ID_CENTRE_CONFIG: process.env.CLIENT_ID_CENTRE_CONFIG,
    CALLBACK_URL_CENTRE_CONFIG: process.env.CALLBACK_URL_CENTRE_CONFIG
  },
  areaCode: '3207',
  userInfo: {
    name: '',
    mobile: '',
  },
  yskInfo: {
    token: '',
  }
};
export { GlobalAPI };
