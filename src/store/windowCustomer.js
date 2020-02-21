import { post } from '../util/http';

const windowCustomer = {
  namespaced: true,
  state: {
    firstClass: [],
    firstClassValue: '',
    items: [],
    activeId: [], // 被选中的
    leftActiveIndex: 0,
    sheetItems: [],
  },
  mutations: {
    setFirstClass(state, params) {
      state.firstClass = params;
    },
    setFirstClassValue(state, params) {
      state.firstClassValue = params;
    },
    setItems(state, params) {
      state.items = params;
    },
  },
  actions: {
    getFirstClass(context) {
      post('/windowCustoms/getFirstClass')
        .then((res) => { context.commit('setFirstClass', res.firstClass); })
        .catch((err) => { console.log(err); });
    },
    getTreeItems(context) {
      post('/windowCustoms/getTreeItems', context.state.firstClassValue)
        .then((res) => { context.commit('setItems', res.items); })
        .catch((err) => { console.log(err); });
    },
  },
};
export default windowCustomer;
