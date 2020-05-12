/* eslint-disable */
import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:80', // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});
// token设置
const TokenKey = 'LocalToken';
export function getToken() { // 获取TokenKey值
  return window.localStorage.getItem(TokenKey);
}
export function setToken(tokenData) { // 设置TokenKey值
  return localStorage.setItem(TokenKey, JSON.stringify(tokenData));
}

export function removeToken() { //
  return window.localStorage.removeItem(TokenKey);
}
// request拦截器 request interceptor
service.interceptors.request.use(
  (config) => {
    // 不传递默认开启loading
    if (config.method === 'post' || config.method === 'put') {
      // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
      // config.data = JSON.stringify(config.data)
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);
// respone拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.status && res.status !== 200) {
      return Promise.reject(res || 'error');
    }
    return Promise.resolve(res);
  },
  (error) => Promise.reject(error),
);
// 对token进行处理
export function get(url, params, headers) {
  const options = {};

  if (params) {
    options.params = params;
  }
  if (headers) {
    options.headers = headers;
  }
  return service.get(url, options);
}
export function post(url, data, params, headers) {
  const options = {};

  if (params) {
    options.params = params;
  }
  if (headers) {
    options.headers = headers;
  }
  return service.post(url, data, options);
}
export function put(url, params, headers) {
  const options = {};

  if (headers) {
    options.headers = headers;
  }
  return service.put(url, params, options);
}
export function del(url, params, headers) {
  const options = {};
  if (params) {
    options.params = params;
  }
  if (headers) {
    options.headers = headers;
  }
  return service.delete(url, options);
}
export default service;
