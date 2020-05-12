/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import common from './common';
import windowCustomer from './windowCustomer';
import myOrder from './myOrder';
import myCustom from './myCustom';
import supplier from './supplier'
import bidding from './bidding'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    windowCustomer,
    myOrder,
    myCustom,
    supplier,
    bidding,
  },
});
