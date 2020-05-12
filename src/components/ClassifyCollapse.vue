<template>
  <div>
    <Collapse v-model="open">
      <div v-show="sortKey==='1'">
        <CollapseItem name="按食品类型分类">
          <div slot="title">
            {{itemsByFood.time}} 的订单
          </div>
          <CellGroup>
            <div v-for="(i,k) in itemsByFood.foods" :key="k">
              <Cell>
                <div slot="title">
                  {{i.name}}
                </div>
                <div slot="label">
                  {{i.count}}{{i.unit}}
                </div>
                <div slot="default">
                  <Stepper
                    :default-value="0"
                    input-width="80"
                    v-model="i.price"
                    @change="change"
                    step="0.01"
                    :name="k"
                    :decimal-length="2" /> 元/{{i.unit}}
                </div>
              </Cell>
            </div>
          </CellGroup>
        </CollapseItem>
      </div>
      <div v-show="sortKey==='2'">
        <div v-for="(item,key) in itemsByStore.local" :key="key">
          <CollapseItem :name="item.localName">
            <div slot="title">
              {{itemsByStore.time}} {{item.localName}} 的订单
            </div>
            <div v-for="(v,index) in item.food" :key="index">
              <Cell>
                <div slot="title">
                  {{v.name}}
                </div>
                <div slot="default">
                  {{v.count}}{{v.unit}}
                </div>
              </Cell>
            </div>
          </CollapseItem>
        </div>
      </div>
    </Collapse>
  </div>
</template>

<script>
import {
  Collapse,
  CollapseItem,
  Cell,
  CellGroup,
  Stepper,
} from 'vant';

export default {
  name: 'ClassifyCollapse',
  methods: {
    change(value, detail) {
      this.$emit('change', value, detail);
    },
  },
  components: {
    Stepper,
    Collapse,
    CollapseItem,
    Cell,
    CellGroup,
  },
  data() {
    return {
      open: [],
    };
  },
  props: {
    sortKey: {
      type: String,
      default: '1',
    },
    itemsByStore: {
      type: Object,
      default: () => {},
    },
    itemsByFood: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="less">
</style>
