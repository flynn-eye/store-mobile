<template>
  <div>
    <NavigationLayout
      location-title='我的订单'
      :show-left='true'/>
    <Tabs @click='changeTabIndex' v-model='tabIndex' type="card" sticky animated>
      <Tab title="待发货竞标">
        <XCollapse role='supplier' :items="items" @updateItem="updateItem"></XCollapse>
      </Tab>
      <Tab title="正在竞标">
        <XCollapse
          role='supplier'
          :items="stepItems"
          @updateItem="updateItem"
          :step="true"
          ></XCollapse>
      </Tab>
      <!--<Tab title="失败竞标">-->
        <!--<XCollapse role='supplier' :items="items" @updateItem="updateItem" ></XCollapse>-->
      <!--</Tab>-->
    </Tabs>
  </div>
</template>

<script>
/* eslint-disable */
import { Tab, Tabs } from 'vant';
import NavigationLayout from '../components/layout/NavigationLayout.vue';
import XCollapse from '../components/XCollapse.vue';
import { post ,get} from '../util/http';

export default {
  name: 'MyOrder',
  components: {
    NavigationLayout,
    Tab,
    Tabs,
    XCollapse,
  },
  mounted(){
    post("/order/getSupplierByUser",{
      userId:localStorage.getItem('userId')
    })
      .then(res=>{
        this.supplierId = res[0].supplierId
        this.init()
      }).catch(err=>{
        console.log(err)
    })
  },
  data() {
    return {
      supplierId:null,
      tabIndex: null,
      items: [],//待发货
      stepItems: [

      ],
    };
  },
  methods: {
    init(){
      post('/order/getWaitInputOrder',{
        supplierId:this.supplierId
      }).then(res=>{
        for(let r of res){
          post('/order/getAddBiddingBySupplierAndOrder',{
            orderId:r.orderId,
            supplierId:this.supplierId
          }).then(res=>{
            let result = JSON.parse(res[0].detail)
            this.items.push(
              {
                time: r.time,
                foods: result
              },
            )
          })
        }
      })
      post('/order/inBidding',{
        supplierId:this.supplierId
      }).then(res=>{
        let result = JSON.parse(res[0].detail)
        this.stepItems.push(
          {
            time: res[0].time,
            foods: result
          },
        )
      })
    },
    changeTabIndex(name) {
      this.tabIndex = name;
    },
    updateItem(currentPage) {
      console.log(this.tabIndex, currentPage);
    },
  },
};
</script>

<style>

</style>
