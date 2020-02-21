<template>
  <div>
    <NavigationLayout
      location-title='我的订单'
      :show-left='true'/>
    <Tabs @click='changeTabIndex' v-model='tabIndex' type="card" sticky animated>
      <Tab title="成功竞标">
        <XCollapse role='supplier' :items="items" @updateItem="updateItem"></XCollapse>
      </Tab>
      <Tab title="正在竞标">
        <XCollapse
          role='supplier'
          :items="stepItems"
          @updateItem="updateItem"
          :step="true"
          active="1"
          :stepItem="stepItem"></XCollapse>
      </Tab>
      <Tab title="失败竞标">
        <XCollapse role='supplier' :items="items" @updateItem="updateItem" ></XCollapse>
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
import NavigationLayout from '../components/layout/NavigationLayout.vue';
import XCollapse from '../components/XCollapse.vue';

export default {
  name: 'MyOrder',
  components: {
    NavigationLayout,
    Tab,
    Tabs,
    XCollapse,
  },
  data() {
    return {
      stepItem: [
        '发起竞标',
        '竞标成功',
        '入库成功',
      ],
      tabIndex: 0,
      items: this.$store.state.myOrder.items,
      stepItems: [
        {
          time: '2010-11-2',
          totalPrice: 132331,
          foods: [
            {
              id: '1',
              name: '猪肉',
              count: 5,
              price: 15,
              unit: '斤',
            },
            {
              id: '2',
              name: '鱼肉',
              count: 5,
              price: 12,
              unit: '斤',
            },
            {
              id: '3',
              name: '肌肉',
              count: 5,
              price: 13,
              unit: '斤',
            },
            {
              id: '4',
              name: '鸭肉',
              count: 5,
              price: 11,
              unit: '斤',
            },
          ],
        },
      ],
    };
  },
  methods: {
    changeTabIndex(name) {
      this.tabIndex = name;
    },
    updateItem(currentPage) {
      console.log(this.tabIndex, currentPage);
      // 更新操作
    },
  },
};
</script>

<style>

</style>
