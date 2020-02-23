<template>
    <div>
      <NavigationLayout
        location-title="供应商信息"
        :show-left="true"
        :icon="icon"
        :rightClick='submit'/>
      <CellGroup>
        <div v-for="(v,k) in picLabel" :key="k" >
          <Cell>
            <div slot="title">
              <Uploader v-model="picValue[k]" :max-count="1" :deletable="false">
              </Uploader>
            </div>
            <div slot="default" style="padding-top: 20%;padding-bottom: 20%;">
              {{v}}
            </div>
          </Cell>
        </div>
      </CellGroup>
    </div>
</template>

<script>
import {
  Uploader,
  CellGroup,
  Cell,
} from 'vant';
import NavigationLayout from '../components/layout/NavigationLayout.vue';

export default {
  name: 'SupplierInf',
  components: {
    NavigationLayout,
    Uploader,
    CellGroup,
    Cell,
  },
  methods: {
    submit() {
    },
  },
  data() {
    return {
      icon: 'success',
      picLabel: ['身份证国徽面', '身份证人像面', '营业执照'],
      picValue: [
        [
          {
            url: 'https://img.yzcdn.cn/vant/leaf.jpg',
            // status: 'uploading',
            message: '上传中...',
          },
        ],
        [
          {
            url: 'https://img.yzcdn.cn/vant/leaf.jpg',
            status: 'done',
            message: '上传中...',
          },
        ],
        [
          {
            url: 'https://img.yzcdn.cn/vant/leaf.jpg',
            status: 'uploading',
            message: '上传中...',
          },
        ],
      ],
    };
  },
};
</script>

<style scoped>

</style>
