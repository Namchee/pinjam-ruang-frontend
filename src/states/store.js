import Vue from 'vue';
import Vuex from 'vuex';

import { userState } from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dark: true,
  },

  modules: {
    userState,
  },
});
