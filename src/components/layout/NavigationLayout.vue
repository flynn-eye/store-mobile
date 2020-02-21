<template>
  <NavBar @click-left='back'
          @click-right='rightClick'
          :title='this.title'
          :left-text='leftText'
          :left-arrow='showLeft'>
    <Icon :name='icon' slot="right"/>
  </NavBar>
</template>

<script>
import { NavBar, Icon } from 'vant';

export default {
  name: 'NavigationLayout',
  components: {
    NavBar,
    Icon,
  },
  props: {
    locationTitle: {
      type: String,
    },
    showLeft: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
    },
    rightClick: {
      default: () => {},
      type: Function,
    },
  },
  created() {
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
  data() {
    return {
      title: this.locationTitle,
    };
  },
  computed: {
    leftText() {
      if (this.showLeft === false) {
        return '';
      }
      return '返回';
    },
  },
};
</script>

<style>

</style>
