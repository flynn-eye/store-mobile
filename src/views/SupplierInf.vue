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
      <Field
        @focus="()=>{this.showPicker=false}"
        label="店名" v-model="supplierName" placeholder="请输入店名" />
      <Field
        :disabled="true"
        @click="()=>{this.showPicker=true}"
        @focus="()=>{this.showPicker=true}"
        @blur="()=>{this.showPicker=false}"
        label="供应产品类别" v-model="supplierClass" placeholder="供应产品类别" />
      <div v-show="showPicker">
        <Picker
          style="margin-top: 20px"
          confirm-button-text="确定"
          @confirm="()=>{this.showPicker=false}"
          title="选择食品分类"
          @change="onChange"
          :columns="pickerData" ></Picker>
      </div>
    </div>
</template>

<script>
/* eslint-disable */
import {
  Uploader,
  CellGroup,
  Cell,
  Picker,
  Field,
} from 'vant';
import NavigationLayout from '../components/layout/NavigationLayout.vue';
import supplier from '../store/supplier';

export default {
  name: 'SupplierInf',
  components: {
    NavigationLayout,
    Uploader,
    CellGroup,
    Cell,
    Picker,
    Field,
  },
  mounted(){
    this.$store.dispatch("supplier/getSupplierClass")
      .then(res=>{
        this.savedData = res.foodClasses
        this.pickerData = res.foodClasses.map(item=>{return item.className})
      })
  },
  methods: {
    onChange(picker, value, index) {
      this.supplierClass  = value
      this.supplierClassIndex = index
    },
    submit() {
      this.$store.dispatch("supplier/addSupplier",{
        supplierName:this.supplierName,
        userId:this.$store.state.common.userId,
        supplierClass:this.savedData[this.supplierClassIndex].classId
      })
        .then(res=>{
          if(res===1){
            this.$router.push('/home');
          }
        })
    },
  },
  data() {
    return {
      savedData:[],
      supplierClass:null,
      supplierClassIndex:null,
      supplierName:'',
      showPicker:false,
      icon: 'success',
      pickerData: [],
      picLabel: ['营业执照'],
      picValue: [
        [
          {
            url: 'https://img.yzcdn.cn/vant/leaf.jpg',
            // status: 'uploading',
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
