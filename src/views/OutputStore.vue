<template>
    <div>
      <NavigationLayout
        location-title='出库'
        :show-left='true'
         />
      <CellGroup>
        <div v-for="(v,k) in OutputItems" :key="k">
          <Cell>
            <div slot="title">
              {{v.name}}
            </div>
            <div slot="default">
              <Field
                type="number"
                v-model="OutputItems[k].onBalance">
                <div slot="left-icon"></div>
                <div slot="button">
                  <Button size="small" @click="output(k)">出库</Button>
                </div>
              </Field>
            </div>
            <div slot="label">
              库存{{v.count}}
            </div>
          </Cell>
        </div>
      </CellGroup>
      <Pagination/>
    </div>
</template>

<script>
import {
  Button,
  Pagination,
  CellGroup,
  Cell,
  Field,
  Notify,
} from 'vant';
import NavigationLayout from '../components/layout/NavigationLayout.vue';

export default {
  name: 'OutputStore',
  components: {
    NavigationLayout,
    Button,
    Pagination,
    CellGroup,
    Cell,
    Field,
  },
  methods: {
    output(k) {
      if (this.OutputItems[k].count < this.OutputItems[k].onBalance) {
        this.OutputItems[k].onBalance = 0;
        Notify({ type: 'danger', message: '库存不足' });
      } else {
        this.OutputItems[k].count -= this.OutputItems[k].onBalance;
        this.OutputItems[k].onBalance = 0;
      }
    },
  },
  data() {
    return {
      OutputItems: [
        {
          id: '1',
          name: '猪肉',
          count: 10,
          onBalance: 0,
        },
        {
          id: '2',
          name: '猪肉',
          count: 10,
          onBalance: 0,
        },
        {
          id: '1',
          name: '猪肉',
          count: 10,
          onBalance: 0,
        },
        {
          id: '3',
          name: '猪肉',
          count: 10,
          onBalance: 0,
        },
        {
          id: '4',
          name: '猪肉',
          count: 10,
          onBalance: 0,
        },
        {
          id: '5',
          name: '猪肉',
          count: 10,
          onBalance: 0,
        },
      ],
    };
  },
};
</script>

<style>

</style>
