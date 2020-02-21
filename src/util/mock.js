const Mock = require('mockjs');

function userNamelogin() {
  return {
    userId: '1', name: 'zy', rule: 1, phone: '17351282003',
  };
}
function getCode() {
  return {
    code: '124561',
  };
}
function changePassword() {
  return {
    result: '成功',
  };
}
function getFirstClass() {
  return {
    firstClass: [
      { text: '水产', value: '13023' },
      { text: '肉类', value: '33213' },
      { text: '蔬菜', value: '23983' },
      { text: '调料', value: '21983' },
    ],
  };
}
function getTreeItems() {
  return {
    items: [
      {
        text: '猪肉',
        classId: '123451',
        parentId: '13023',
        children: [
          { count: 0, id: '11', text: '猪肉' },
          { count: 0, id: '12', text: '3猪肉2' },
          { count: 0, id: '13', text: '猪肉 1a' },
          { count: 0, id: '14', text: '猪肉 2a' },
          { count: 0, id: '15', text: '猪肉 3a' },
          { count: 0, id: '16', text: '猪肉 4a' },
          { count: 0, id: '17', text: '猪肉 5a' },
          { count: 0, id: '18', text: '猪肉 6a' },
          { count: 0, id: '19', text: '猪肉 7a' },
          { count: 0, id: '110', text: '猪肉 a8' },
        ],
      },
      {
        text: '牛肉',
        classId: '12345221',
        parentId: '13023',
        children: [
          { count: 0, id: '21', text: '牛肉 2b' },
          { count: 0, id: '22', text: '牛肉 1b' },
          { count: 0, id: '23', text: '牛肉 3b' },
          { count: 0, id: '24', text: '牛肉 4b' },
          { count: 0, id: '25', text: '牛肉 5b' },
          { count: 0, id: '26', text: '牛肉 vb' },
          { count: 0, id: '27', text: '牛肉 vxb' },
          { count: 0, id: '28', text: '牛肉 xb' },
          { count: 0, id: '29', text: '牛肉 cb' },
          { count: 0, id: '210', text: '牛肉 db' },
        ],
      },

    ],
  };
}
Mock.mock('http://localhost/user/userLogin', 'post', userNamelogin());
Mock.mock('http://localhost/user/phoneLogin', 'post', userNamelogin());
Mock.mock('http://localhost/user/getCode', 'post', getCode());
Mock.mock('http://localhost/user/changePasswordByUsername', 'post', changePassword());
Mock.mock('http://localhost/windowCustoms/getFirstClass', 'post', getFirstClass());
Mock.mock('http://localhost/windowCustoms/getTreeItems', 'post', getTreeItems());
