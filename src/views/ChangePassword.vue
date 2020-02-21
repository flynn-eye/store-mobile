<template>
  <div>
    <NavigationLayout locationTitle='修改密码' :show-left='true' />
    <Tabs  @click='changeTabIndex' v-model='tabIndex' animated>
      <Tab title='原密码修改'>
        <Form @submit='onSubmit' ref='userForm'>
          <Field
          v-model='userChangePassword.userName'
          name='用户名'
          label='用户名'
          placeholder='输入用户名'
          :rules='rules.userChangeRules.userNameRule'
          />
          <Field
          v-model='userChangePassword.oldPassword'
          name='之前的密码'
          label='之前的密码'
          type='password'
          placeholder='输入之前的密码'
          :rules='rules.userChangeRules.oldPasswordRule'/>
          <Field
          v-model='userChangePassword.newPassword'
          name='新密码'
          label='新密码'
          type='password'
          placeholder='输入新密码'
          :rules='rules.commonRules.newPasswordRule'/>
          <Field
          v-model='userChangePassword.confirmPassword'
          name='confirm'
          label='确认密码'
          type='password'
          placeholder='确认密码'
          :rules='rules.commonRules.confirmPasswordRule'/>
          <Button round block type='info' native-type='submit'>提交</Button>
        </Form>
      </Tab>
      <Tab title='手机验证码修改'>
        <Form @submit='onSubmit' ref='phoneForm'>
          <Field
          v-model='phoneChangePassword.phone'
          name='phone'
          label='手机号'
          placeholder='输入手机号'
          :rules='rules.phoneChangeRules.phoneRule'
          />
          <Field
            v-model='phoneChangePassword.code'
            center
            clearable
            label='短信验证码'
            placeholder='请输入短信验证码'
            :rule='rules.phoneChangeRules.codeRule'
          >
            <Button @click='requireCode' native-type='button'
                    slot='button' size='small' type='primary'>
              发送验证码
            </Button>
          </Field>
          <Field
          v-model='phoneChangePassword.newPassword'
          name='新密码'
          type='password'
          label='新密码'
          placeholder='输入新密码'
          :rules='rules.commonRules.newPasswordRule'/>
          <Field
          v-model='phoneChangePassword.confirmPassword'
          name='confirm'
          label='确认密码'
          type='password'
          placeholder='确认密码'
          :rules='rules.commonRules.confirmPasswordRule'/>
          <Button round block type='info' native-type='submit'>提交</Button>
        </Form>
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import {
  Tab, Tabs, Field, Form, Button,
} from 'vant';
import NavigationLayout from '../components/layout/NavigationLayout.vue';

export default {
  name: 'ChangePassword',
  data() {
    return {
      rules: {
        userChangeRules: {
          userNameRule: [
            { required: true, message: '需要用户名' },
          ],
          oldPasswordRule: [
            { required: true, message: '需要密码' },
          ],
        },
        phoneChangeRules: {
          phoneRule: [
            { required: true, message: '请输入手机号' },
            { validator: this.phoneValidator, message: '手机号格式错误' },
          ],
          codeRule: [
            { required: true, message: '请输入验证码' },
            { validator: this.codeValidator, message: '验证码错误' },
          ],
        },
        commonRules: {
          newPasswordRule: [
            { required: true, message: '请输入新密码' },
          ],
          confirmPasswordRule: [
            { required: true, message: '请输入新密码' },
            { validator: this.confirmPassword, message: '密码不一致' },
          ],
        },
      },
      tabIndex: 0,
      userChangePassword: {
        userName: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      phoneChangePassword: {
        phone: '',
        code: '',
        newPassword: '',
        confirmPassword: '',
      },
    };
  },
  methods: {
    phoneValidator(val) {
      return /1\d{10}/.test(val);
    },
    codeValidator(val) {
      return /\d{6}/.test(val);
    },
    changeTabIndex(name) {
      this.tabIndex = name;
    },
    onSubmit() {
      if (this.tabIndex === 0) {
        this.$refs.userForm.validate('confirm')
          .then(() => { this.$store.dispatch('common/changePasswordByUsername', { ...this.userChangePassword }); })
          .catch((err) => { console.log(err); });
      } else {
        this.$refs.phoneForm.validate('confirm')
          .then(() => { this.$store.dispatch('common/changePasswordByPhone', { ...this.phoneChangePassword }); })
          .catch((err) => { console.log(err); });
      }
    },
    requireCode() {
      this.$refs.phoneForm.validate('phone')
        .then(() => { this.$store.dispatch('common/getCode', { ...this.phoneChangePassword.phone }); })
        .catch((err) => { console.log(err); });
    },
    confirmPassword(val) {
      if (this.tabIndex === 0) {
        return val === this.userChangePassword.newPassword;
      }
      return val === this.phoneChangePassword.newPassword;
    },
  },
  components: {
    Tab,
    Tabs,
    Field,
    Form,
    Button,
    NavigationLayout,
  },
};
</script>

<style>

</style>
