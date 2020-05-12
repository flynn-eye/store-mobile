<template>
  <div>
    <NavigationLayout locationTitle='登录' :show-left='false'></NavigationLayout>
    <Tabs @click='changeTabIndex' v-model='tabIndex' animated>
      <Tab title='用户名登录'>
        <Form @submit='onSubmit'>
          <Field
            v-model='userLogin.userName'
            name='用户名'
            label='用户名'
            placeholder='用户名'
            :rules='rules.userNameRule'
          />
          <Field
            v-model='userLogin.password'
            type='password'
            name='密码'
            label='密码'
            placeholder='密码'
            :rules='rules.passwordRule'
          />
          <div style='margin: 16px;'>
            <Button round block type='info' native-type='submit'>
              登录
            </Button>
          </div>
        </Form>
      </Tab>
      <Tab title='手机号登录'>
        <Form @submit='onSubmit' ref='phoneForm'>
          <Field
            v-model='phoneLogin.phone'
            label='手机号'
            placeholder='请输入手机号'
            name='phone'
            :rules='rules.phoneRule'
          />
          <Field
            v-model='phoneLogin.code'
            center
            clearable
            label='短信验证码'
            placeholder='请输入短信验证码'
            :rules='rules.codeRule'
          >
            <Button :disabled="isDis" @click='requireCode' native-type='button'
                    slot='button' size='small' type='primary'>
              {{requireCodeMsg}}
            </Button>
          </Field>
          <div style='margin: 16px;'>
            <Button round block type='info' native-type='submit'>
              登录
            </Button>
          </div>
        </Form>
      </Tab>
    </Tabs>
  </div>
</template>

<script>
/* eslint-disable */
import {
  Tab, Tabs, Field, Form, Button,
} from 'vant';
import NavigationLayout from '../components/layout/NavigationLayout.vue';
import { post ,get} from '../util/http';
export default {
  name: 'Login',
  components: {
    NavigationLayout,
    Tab,
    Tabs,
    Field,
    Form,
    Button,
  },
  data() {
    return {
      requireCodeMsg:'发送验证码',
      isDis:false,
      rules: {
        userNameRule: [
          { required: true, message: '需要用户名' },
        ],
        passwordRule: [
          { required: true, message: '需要密码' },
        ],
        phoneRule: [
          { required: true, message: '请输入手机号' },
          { validator: this.phoneValidator, message: '手机号格式错误' },
        ],
        codeRule: [
          { required: true, message: '请输入验证码' },
          { validator: this.codeValidator, message: '验证码为六位' },
        ],
      },
      userLogin: { userName: '', password: '' },
      phoneLogin: { phone: '', code: '' },
      tabIndex: 0,
    };
  },
  methods: {
    changeTabIndex(name) {
      this.tabIndex = name;
    },
    onSubmit() {
      if (this.tabIndex === 0) {
        this.$store.dispatch('common/loginByUserName', { ...this.userLogin, func: () => { this.$router.push('/home'); } })
          .then(res=>{
            if(res){
              localStorage.setItem("userId", res.userId);
              localStorage.setItem("userName", res.userName);
              localStorage.setItem("role", res.role);
              if(res.role===3){
                post('/supplier/isSupplierIn',{...res})
                  .then(res=>{
                    if(res===0){
                      this.$router.push('/supplierInf');
                    }else{
                      this.$router.push('/home');
                    }
                  })
                  .catch(e=>{console.log(e)})
              }else{
                this.$router.push('/home');
              }
            }
          })
      } else if (this.tabIndex === 1) {
        if (this.phoneValidator(this.phoneLogin.phone)
          && this.codeValidator(this.phoneLogin.code)) {
          post("/user/phoneLogin",{
            password:this.phoneLogin.code,
            phone:this.phoneLogin.phone
          }).then(res=>{
           if(res.userId!==null){
             localStorage.setItem("userId", res.userId);
             localStorage.setItem("userName", res.userName);
             localStorage.setItem("role", res.role);
             if(res.role===3){
               post('/supplier/isSupplierIn',{...res})
                 .then(res=>{
                   if(res===0){
                     this.$router.push('/supplierInf');
                   }else{
                     this.$router.push('/home');
                   }
                 })
                 .catch(e=>{console.log(e)})
             }else{
               this.$router.push('/home');
             }
           }
          })
        }
      }
    },
    requireCode() {

      this.$refs.phoneForm.validate('phone')
        .then(() => {
          post("/user/loginByPhone",{phone:this.phoneLogin.phone})
            .then(res=>{
              console.log(res)
            })
          this.isDis = true;
          let time = 60
          this.requireCodeMsg = time+'秒后重试'
          let si = setInterval(()=>{
            time--
            this.requireCodeMsg = time+'秒后重试'
          },1000)
          setTimeout(()=>{
            this.isDis = false;
            clearInterval(si)
            this.requireCodeMsg='发送验证码'
          },60000)

        })
        .catch((err) => { console.log(err); });
    },
    phoneValidator(val) {
      return /1\d{10}/.test(val);
    },
    codeValidator(val) {
      return /\d{6}/.test(val);
    },
  },
};
</script>

<style>

</style>
