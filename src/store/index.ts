import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import { DOMAIN } from '@/common/constant';
import { RootState } from './types';

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage,
  key: `${DOMAIN}.saveData`
});

export default createStore({
  state: {
    version: '1.0.0'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
});
