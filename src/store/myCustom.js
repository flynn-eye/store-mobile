import itemValue from '../util/data';

const myCustom = {
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
  },
};
export default myCustom;
