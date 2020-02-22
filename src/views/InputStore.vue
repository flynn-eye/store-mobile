<template>
  <div>
    <NavigationLayout
      location-title='入库'
      :show-left='true'
      icon="success"
      :rightClick='open'/>
    <CellGroup>
      <div v-for="(i,k) in inputItems" :key="k">
        <Cell>
          <div slot="title">
            {{i.name}}
          </div>
          <div slot="default">
            <Field
              type="number"
              v-model="inputItems[k].onBalance">
              <div slot="left-icon"></div>
              <div slot="button">
                <Button size="small" @click="input(k)">入库</Button>
              </div>
            </Field>
          </div>
          <div slot="label">
            购入{{i.count+i.unit}}已入库{{i.isInput}}
          </div>
        </Cell>
      </div>
    </CellGroup>
    <ActionSheet v-model="show">
      <Rate v-model="rateValue"
            class="center"/>
      <CellGroup>
        <div v-for="(i,k) in arr" :key="k">
          <Cell>
            <div slot="title">
              {{i.name}}
            </div>
            <div slot="default">
              缺少：{{i.count - i.isInput+i.unit}}
            </div>
            <div slot="label">
              购入{{i.count+i.unit}}已入库{{i.isInput}}
            </div>
          </Cell>
        </div>
      </CellGroup>
      <div class="center">
        <Button type="danger"  round @click="submit">结束入库</Button>
      </div>
    </ActionSheet>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup,
  Field,
  Button,
  Rate,
  ActionSheet,
} from 'vant';
import NavigationLayout from '../components/layout/NavigationLayout.vue';

export default {
  name: 'InputStore',
  components: {
    NavigationLayout,
    Cell,
    CellGroup,
    Field,
    Button,
    Rate,
    ActionSheet,
  },
  methods: {
    submit() {
      console.log(123);
      this.arr = [];
      this.show = false;
    },
    open() {
      this.arr = [];
      for (let i = 0; i < this.inputItems.length; i += 1) {
        if ((this.inputItems[i].count - this.inputItems[i].isInput) > 0) {
          this.arr.push(this.inputItems[i]);
        }
      }
      console.log(this.arr);
      this.show = true;
    },
    input(k) {
      this.inputItems[k].isInput += parseFloat(this.inputItems[k].onBalance);
      this.inputItems[k].onBalance = 0;
    },
  },
  data() {
    return {
      arr: [],
      rateValue: 5,
      show: false,
      result: [],
      inputItems: [
        {
          count: 10,
          name: '猪肉',
          id: '1',
          unit: '斤',
          isInput: 0,
          onBalance: 0,
        },
        {
          count: 10,
          name: '牛肉',
          id: '2',
          unit: '斤',
          isInput: 0,
          onBalance: 0,
        },
        {
          count: 10,
          name: '鱼肉',
          id: '3',
          unit: '斤',
          isInput: 0,
          onBalance: 0,
        },
        {
          count: 10,
          name: '鸡肉',
          id: '4',
          unit: '斤',
          isInput: 0,
          onBalance: 0,
        },
        {
          count: 10,
          name: '白菜',
          id: '5',
          unit: '棵',
          isInput: 0,
          onBalance: 0,
        },
      ],
    };
  },
};
</script>

<style lang="less">
.center{
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
