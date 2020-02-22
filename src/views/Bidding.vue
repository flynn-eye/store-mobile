<template>
    <div>
      <NavigationLayout
        location-title='订单竞标'
        :show-left='true'/>
      <DropdownMenu>
        <DropdownItem v-model='sortKey' :options='sortKeys'/>
      </DropdownMenu>
      <ClassifyCollapse
        @change="change"
        :sortKey="sortKey"
        :itemsByStore="itemsByStore"
        :itemsByFood="itemsByFood"/>
      <div v-show="sortKey==='1'"  class="EditButton">
        <Button @click="submit" type="danger" hairline round >报单修改</Button>
      </div>
    </div>
</template>

<script>
import {
  DropdownMenu,
  DropdownItem,
  Button,
} from 'vant';
import NavigationLayout from '../components/layout/NavigationLayout.vue';
import ClassifyCollapse from '../components/ClassifyCollapse.vue';


export default {
  name: 'Bidding',
  components: {
    NavigationLayout,
    DropdownMenu,
    DropdownItem,
    ClassifyCollapse,
    Button,
  },
  methods: {
    change(value, { name }) {
      this.itemsByFood.foods[name].price = value;
      console.log(this.itemsByFood.foods[name].price);
    },
    submit() {
      console.log(this.itemsByFood);
    },
  },
  data() {
    return {
      sortKeys: [
        { text: '按食品类型分类', value: '1' },
        { text: '按运送仓库分类', value: '2' },
      ],
      sortKey: '1',
      itemsByFood: {
        time: '2011-2-1',
        foods: [
          {
            name: '猪肉',
            id: '1',
            unit: '斤',
            count: 11,
            price: 0,
          },
          {
            name: '鱼肉',
            id: '2',
            unit: '斤',
            count: 22,
            price: 0,
          },
          {
            name: '牛肉',
            id: '3',
            unit: '斤',
            count: 44,
            price: 0,
          },
          {
            name: '鸡肉',
            id: '4',
            unit: '斤',
            count: 3,
            price: 0,
          },
          {
            name: '白菜',
            id: '5',
            unit: '棵',
            count: 2,
            price: 0,
          },
          {
            name: '酱油',
            id: '6',
            unit: '桶',
            count: 1,
            price: 0,
          },
          {
            name: '盐',
            id: '7',
            unit: '袋',
            count: 1,
            price: 0,
          },
        ],
      },
      itemsByStore: {
        time: '2011-2-1',
        local: [
          {
            localName: '区域A',
            store: [
              {
                storeName: '1号仓库',
                food: [
                  {
                    name: '盐',
                    id: '7',
                    unit: '袋',
                    count: 1,
                  },
                  {
                    name: '酱油',
                    id: '6',
                    unit: '桶',
                    count: 1,
                  },
                ],
              },
              {
                storeName: '2号仓库',
                food: [
                  {
                    name: '鸡肉',
                    id: '4',
                    unit: '斤',
                    count: 3,
                  },
                  {
                    name: '白菜',
                    id: '5',
                    unit: '棵',
                    count: 2,
                  },
                ],
              },
            ],
          },
          {
            localName: '区域B',
            store: [
              {
                storeName: '1号仓库',
                food: [
                  {
                    name: '盐',
                    id: '7',
                    unit: '袋',
                    count: 1,
                  },
                  {
                    name: '酱油',
                    id: '6',
                    unit: '桶',
                    count: 1,
                  },
                ],
              },
              {
                storeName: '2号仓库',
                food: [
                  {
                    name: '鸡肉',
                    id: '4',
                    unit: '斤',
                    count: 3,
                  },
                  {
                    name: '白菜',
                    id: '5',
                    unit: '棵',
                    count: 2,
                  },
                ],
              },
            ],
          },
        ],
      },
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
