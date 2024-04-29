import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VConsole from 'vconsole';

import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';
import './assets/styles/index.scss';

// import { configUCenter } from 'fx-front-ucenter';
// import customAxios from '@/apis/base/caxios';
// import { GlobalAPI } from './common';

// configUCenter(
//   {
//     api: {
//       loginBaseUrl: GlobalAPI.config.API_PREFIX_USER_CENTER + '/permission', // 用户中心登录页url
//       baseUrl: GlobalAPI.config.API_PREFIX_USER_CENTER + '/permission', // 接口baseUrl
//       clientId: GlobalAPI.config.CLIENT_ID_CENTRE_CONFIG,
//       callbackUrl: GlobalAPI.config.CALLBACK_URL_CENTRE_CONFIG,
//     },
//     axios: customAxios
//   }
// );

if (process.env.NODE_ENV === 'development') {
  const vConsole = new VConsole();
}
// const vConsole = new VConsole();

const app = createApp(App);

app.use(store).use(router)
  .mount('#app');
