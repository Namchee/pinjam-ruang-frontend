import Vue from 'vue';
import Vuetify from 'vuetify';
import router from './routes/routes';
import store from './states/store';
import './styles/main.scss';
import theme from './styles/theme';

import App from './layout/wrapper';

Vue.use(Vuetify, {
  theme,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
