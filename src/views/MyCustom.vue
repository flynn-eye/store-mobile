<template>
    <div>
      <NavigationLayout
        location-title='我的报单'
        :show-left='true'/>
      <NoticeBar
        :scrollable="false"
        wrapable
        :text="rejectReason"
        mode="closeable" />
      <Tabs @click='changeTabIndex' v-model='tabIndex' type="card" sticky animated>
        <Tab title="未完成">
          <XCollapse
                     @updateItem="updateItem"
                     :step="true"
                     :active="active"
                     :items="stepItems"
                     :stepItem="stepItem"></XCollapse>
          <div v-if="active===1" class="EditButton">
            <Button @click="edit" type="danger" hairline round >报单修改</Button>
          </div>
        </Tab>
        <Tab title="已完成">
          <XCollapse role='custom' :items="items" @updateItem="updateItem"></XCollapse>
        </Tab>
      </Tabs>
    </div>
</template>

<script>
import {
  Tab,
  Tabs,
  Button,
  NoticeBar,
} from 'vant';
import NavigationLayout from '../components/layout/NavigationLayout.vue';
import XCollapse from '../components/XCollapse.vue';

export default {
  name: 'MyCustom',
  components: {
    NavigationLayout,
    Tabs,
    Tab,
    XCollapse,
    Button,
    NoticeBar,
  },
  methods: {
    changeTabIndex(name) {
      this.tabIndex = name;
    },
    updateItem() {
    },
    edit() {
      for (let i = 0; i < this.stepItems[0].foods.length; i += 1) {
        this.stepItems[0].foods[i].text = this.stepItems[0].foods[i].name;
      }
      this.$store.state.windowCustomer.sheetItems = this.stepItems[0].foods;
      this.$router.push('/windowCustoms');
    },
  },
  data() {
    return {
      rejectReason: '猪肉太贵',
      active: 1,
      stepItem: ['等待审核', '审核失败', '审核通过', '待出库'],
      tabIndex: 0,
      items: this.$store.state.myCustom.items,
      stepItems: [
        {
          time: '2010-11-2',
          totalPrice: 132331,
          foods: [
            {
              name: '猪肉',
              count: 5,
              price: 15,
              unit: '斤',
            },
            {
              name: '鱼肉',
              count: 5,
              price: 12,
              unit: '斤',
            },
            {
              name: '肌肉',
              count: 5,
              price: 13,
              unit: '斤',
            },
            {
              name: '鸭肉',
              count: 5,
              price: 11,
              unit: '斤',
            },
            {
              name: '牛肉',
              count: 5,
              price: 11,
              unit: '斤',
            },
            {
              name: '大白菜',
              count: 5,
              price: 12,
              unit: '斤',
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="less">
.EditButton{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
