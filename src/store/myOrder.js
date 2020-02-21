import { post } from '../util/http';
import itemValue from '../util/data';

const myOrder = {
  namespaced: true,
  state: {
    items: itemValue,
    pageNum: 1, // 页数
  },
  mutations: {
    setItems(state, val) {
      state.items = val;
    },
  },
  actions: {
    getItems() {
      console.log(post);
    },
  },
};
export default myOrder;
