import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Navigation.vue'),
  },
  {
    path: '/changePassword',
    name: 'home',
    component: () => import('../views/ChangePassword.vue'),
  },
  {
    path: '/windowCustoms',
    name: 'windowCustoms',
    component: () => import('../views/WindowCustoms.vue'),
  },
  {
    path: '/myOrder',
    name: 'myOrder',
    component: () => import('../views/MyOrder.vue'),
  },
  {
    path: '/myCustom',
    name: 'myCustom',
    component: () => import('../views/MyCustom.vue'),
  },
  {
    path: '/bidding',
    name: 'bidding',
    component: () => import('../views/Bidding.vue'),
  },
  {
    path: '/inputStore',
    name: 'inputStore',
    component: () => import('../views/InputStore.vue'),
  },
  {
    path: '/outputStore',
    name: 'outputStore',
    component: () => import('../views/OutputStore.vue'),
  },
  {
    path: '/supplierInf',
    name: 'supplierInf',
    component: () => import('../views/SupplierInf.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
