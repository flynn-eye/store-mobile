<template>
    <div>
      <Steps v-if="step"
             :active="active"
             active-icon="success">
        <template v-for="(i,k) in stepItem">
          <Step :key="k">
            {{i}}
          </Step>
        </template>
      </Steps>
      <Collapse accordion v-model="open">
        <div v-for="(item,key) in items" :key="key">
          <CollapseItem :name="key">
            <template slot="title">
              {{item.time }} 的订单
            </template>
            <CellGroup>
              <div v-for="(i,k) in item.foods" :key="k">
                <Cell>
                  <template slot="default">
                    {{i.count}}{{i.unit}}
                  </template>
                  <template slot="title">
                    {{i.name}}
                  </template>
                  <template v-if="role==='supplier'" slot="label">
                    {{i.price}}/{{i.unit}}
                  </template>
                </Cell>
              </div>
            </CellGroup>
          </CollapseItem>
        </div>
      </Collapse>
      <Pagination
        :mode="mode"
        v-if="!step"
        v-model="current"
        :page-count="num"/>
    </div>
</template>

<script>
import {
  Collapse,
  CollapseItem,
  Pagination,
  Cell,
  CellGroup,
  Step,
  Steps,
} from 'vant';

export default {
  name: 'XCollapse',
  components: {
    Collapse,
    CollapseItem,
    Pagination,
    Cell,
    CellGroup,
    Step,
    Steps,
  },
  data() {
    return {
      open: ['1'],
      current: this.currentPage,
      num: this.pageNum,
    };
  },
  props: {
    role: {
      type: String,
      default: 'custom', // supplier
    },
    stepItem: {
      type: Array,
      default: () => [],
    },
    active: {},
    step: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    pageNum: { // 总页数
      type: Number,
      default: 6,
    },
    currentPage: { // 当前页数
      type: Number,
      default: 1,
    },
    mode: {
      type: String,
      default: 'simple',
    },
    change: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
  },
  watch: {
    current(oldVal, newVal) {
      this.$emit('updateItem', newVal);
    },
  },
};
</script>

<style scoped>

</style>
