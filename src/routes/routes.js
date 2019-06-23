import Vue from 'vue';
import Router from 'vue-router';

import Login from './../components/login';

import Layout from './../layout/layout';

import Home from './../components/home';
import Manage from './../components/manage';
import List from './../components/list';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login,
      name: 'Login',
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/manage',
          component: Manage,
          name: 'Manage',
        },
        {
          path: '/home',
          component: Home,
          name: 'Home',
        },
        {
          path: '/list',
          component: List,
          name: 'List',
        },
      ],
    },
  ],
});
