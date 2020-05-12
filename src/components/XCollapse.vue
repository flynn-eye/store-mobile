<template>
    <div>
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
    </div>
</template>

<script>
/* eslint-disable */
import {
  Collapse,
  CollapseItem,
  Cell,
  CellGroup,
} from 'vant';

export default {
  name: 'XCollapse',
  components: {
    Collapse,
    CollapseItem,
    Cell,
    CellGroup,
  },
  data() {
    return {
      open: ['1'],
      num: this.pageNum,
    };
  },
  props: {
    role: {
      type: String,
      default: 'custom', // supplier
    },
    items: {
      type: Array,
      default: () => [],
    },
    pageNum: {
      type: Number,
      default: 6,
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

  },
};
</script>

<style scoped>

</style>
