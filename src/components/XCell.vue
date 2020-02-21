<template>
    <div>
      <CellGroup>
        <div v-for="(i,k) in items" :key="k">
          <cell>
            <template slot="title">
              {{i.text}}
            </template>
            <template slot="default">
              <Counter :count="i.count" :index="k" @onChange="changeCounter"/>
            </template>
          </cell>
        </div>
      </CellGroup>
    </div>
</template>

<script>
import {
  Cell,
  CellGroup,
} from 'vant';
import Counter from './Counter.vue';

export default {
  name: 'XCell',
  components: {
    Cell,
    CellGroup,
    Counter,
  },
  props: {
    items: {
      type: Array,
    },
  },
  methods: {
    changeCounter(index, data) {
      this.$emit('onChange', index, data);
    },
  },
};
</script>

<style scoped>

</style>
