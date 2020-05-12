/* eslint-disable */
import { post ,get} from '../util/http';

const windowCustomer = {
  namespaced: true,
  state: {
    flag:0,
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
      return get('/foodClass/getParentClass') //获取第一大类
        .catch((err) => { console.log(err); });
    },
    getTreeItems(context,params) {
      return get('/foodClass/getChildClass', {...params})
        .catch((err) => { console.log(err); });
    },
    getFoodItemByTreeItem(context,params){
      return get('/foodClass/getItem', {...params})
        .catch((err) => { console.log(err); });
    },
    addRequire(context,params){
      return post('/require/addRequire',{...params})
        .catch((err) => { console.log(err); });
    }
  },
};
export default windowCustomer;
