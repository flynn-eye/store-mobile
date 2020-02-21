<template>
  <div>
    <NavigationLayout
      location-title='窗口报单'
      :show-left='true'
      icon='shopping-cart-o'
      :rightClick='open'/>
    <DropdownMenu>
      <DropdownItem v-model='firstClassValue' :options='firstClass' @change='onChange'/>
    </DropdownMenu>
    <TreeSelect
      @click-item='clickItem'
      :main-active-index.sync='leftActiveIndex'
      :active-id.sync='activeId'
      height='98vh'
      :items='items'>
    </TreeSelect>
    <ActionSheet v-model='show'>
      <XCell :items='sheetItems' @onChange='changeCounter'/>
      <Button round type='danger'
              style='float: right;margin-top: 8px;'
              @click='submitOrder'>提交订单</Button>
    </ActionSheet>
  </div>
</template>

<script>
import _ from 'lodash';
import {
  TreeSelect,
  DropdownMenu,
  DropdownItem,
  ActionSheet,
  Button,
  Toast,
} from 'vant';
import NavigationLayout from '../components/layout/NavigationLayout.vue';
import XCell from '../components/XCell.vue';

export default {
  name: 'WindowCustoms',
  components: {
    NavigationLayout,
    TreeSelect,
    DropdownMenu,
    DropdownItem,
    ActionSheet,
    XCell,
    Button,
  },
  computed: {
    firstClass() {
      return this.$store.state.windowCustomer.firstClass;
    },
    items() {
      return this.$store.state.windowCustomer.items;
    },
  },
  mounted() {
    this.$store.dispatch('windowCustomer/getFirstClass');
    this.$store.dispatch('windowCustomer/getTreeItems');
  },
  methods: {
    submitOrder() {
      this.activeId = [];
      this.sheetItems = [];
      this.show = false;
      Toast.success('提交中');
      console.log(this.sheetItems);
    },
    changeCounter(index, data) {
      this.sheetItems[index].count = data;
      console.log(this.sheetItems);
    },
    onChange(value) {
      this.$store.commit('windowCustomer/setFirstClassValue', value);
      this.$store.dispatch('windowCustomer/getTreeItems');
    },
    open() {
      this.show = true;
    },
    clickItem(data) {
      const index = _.findIndex(this.sheetItems, data);
      if (index === -1) {
        this.sheetItems.push(data);
      } else {
        this.sheetItems.splice(index, 1);
      }
    },
  },
  data() {
    return {
      show: false,
      sheetItems: this.$store.state.windowCustomer.sheetItems,
      firstClassValue: '13023',
      leftActiveIndex: this.$store.state.windowCustomer.leftActiveIndex,
      activeId: this.$store.state.windowCustomer.activeId,
    };
  },
};
</script>

<style>

</style>
