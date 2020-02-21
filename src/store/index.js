import Vue from 'vue';
import Vuex from 'vuex';
import common from './common';
import windowCustomer from './windowCustomer';
import myOrder from './myOrder';
import myCustom from './myCustom';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    windowCustomer,
    myOrder,
    myCustom,
  },
});
