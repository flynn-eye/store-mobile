// 各个角色通用的代码
// import { post } from '../util/http';
import { Toast } from 'vant';
import { post } from '../util/http';

const common = {
  namespaced: true,
  state: {
  },
  mutations: {
    ToastShow(state, msg) {
      Toast.loading(msg);
    },
    ToastDisplay() {
      Toast.clear();
    },
  },
  actions: {
    loginByUserName(context, params) {
      context.commit('ToastShow', '登录中');
      post('/user/userLogin', {
        ...params,
      })
        .then((res) => {
          console.log(res, params);
          params.func();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loginByPhone(context, params) {
      context.commit('ToastShow', '登录中');
      post('/user/phoneLogin', {
        ...params,
      })
        .then((res) => {
          console.log(res, params);
          params.func();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCode(context, params) {
      context.commit('ToastShow', '获取中');
      post('/user/getCode', params)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePasswordByUsername(context, params) {
      context.commit('ToastShow', '修改中');
      post('/user/changePasswordByUsername', params)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePasswordByPhone(context, params) {
      context.commit('ToastShow', '修改中');
      post('/user/changePasswordByPhone', params)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
export default common;
