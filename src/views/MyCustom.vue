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
        <Tab title="待审核">
          <XCollapse
                     :items="stepItems"
                   ></XCollapse>
          <div v-if="active===1" class="EditButton">
            <Button @click="edit" type="danger" hairline round >报单修改</Button>
          </div>
        </Tab>
        <Tab title="待出库">
          <XCollapse role='custom' :items="items"></XCollapse>
        </Tab>
      </Tabs>
    </div>
</template>

<script>
/* eslint-disable */
import {
  Tab,
  Tabs,
  Button,
  NoticeBar,
} from 'vant';
import NavigationLayout from '../components/layout/NavigationLayout.vue';
import XCollapse from '../components/XCollapse.vue';
import { post ,get} from '../util/http';

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
  watch:{
    tabIndex(newV,oldV){
      this.stepItems = []
      this.items = []
      if(newV==0){//待审核
        post('/require/getUnOutputResolve',{userId:new Number(localStorage.getItem('userId'))})
          .then(res=>{
            this.rejectReason = res[0].rejectReason
            let inf  = JSON.parse(res[0].itemInf)
            inf  = inf.map(i=>{
              return{
                name: i.itemName,
                count: i.count,
                id:i.itemId,
                unit: '',
              }
            })
            this.stepItems.push(
              {
                time:res[0].createTime,
                foods:inf
              }
            )
            console.log(res)
          })
      }
      if(newV ==1){
        post('/require/getUnOutputRequire',{userId:new Number(localStorage.getItem('userId'))})
          .then(res=>{
            for(let i of res){
              let iteminf = JSON.parse(i.itemInf)
              iteminf = iteminf.map(item=>{
                return{
                  name: item.itemName,
                  count: item.count,
                  id:item.itemId,
                  unit: '',
                }
              })
              this.items.push({
                time:i.createTime,
                foods:iteminf
              })
            }

            console.log(res)
          })
      }
    },
  },
  methods: {
    changeTabIndex(name) {
      this.tabIndex = name;
    },
    edit() {
      for (let i = 0; i < this.stepItems[0].foods.length; i += 1) {
        this.stepItems[0].foods[i].text = this.stepItems[0].foods[i].name;
      }
      this.$store.state.windowCustomer.sheetItems = this.stepItems[0].foods;
      this.$store.state.windowCustomer.flag = 1;
      this.$router.push('/windowCustoms');
    },
  },
  data() {
    return {
      rejectReason: '',
      active: 1,
      tabIndex: null,
      items: [],
      stepItems: [
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
