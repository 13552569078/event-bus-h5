import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Login } from 'fx-front-ucenter';
import Layout from '@/layout/layout.vue';

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/login',
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      redirect: '/homepage',
    },
  },
  {
    path: '/homepage',
    name: 'Homepage',
    component: () => import('@/views/homepage/index.vue'),
    meta: {
      title: '监测预警',
    },
  },
  {
    path: '/',
    name: 'EventTotal',
    component: () => import('@/views/event-total/index.vue'),
    meta: {
      title: '事件总数',
    },
  },
  {
    path: '/handleEventList',
    name: 'HandleEventList',
    component: () => import('@/views/handle-event-list/index.vue'),
    meta: {
      title: '事件列表',
    },
  },
  {
    path: '/eventFactor',
    name: 'EventFactor',
    component: () => import('@/views/event-factor/index.vue'),
    meta: {
      title: '事要素',
    },
  }
];

const router = createRouter({
  history: createWebHistory(`/${process.env.PROD_PREFIX}`),
  routes,
});

export default router;
