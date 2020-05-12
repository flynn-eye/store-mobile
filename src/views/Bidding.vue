<template>
    <div>
      <NavigationLayout
        location-title='订单竞标'
        :show-left='true'/>
      <DropdownMenu>
        <DropdownItem v-model='sortKey' :options='sortKeys'/>
      </DropdownMenu>
      <ClassifyCollapse
        @change="change"
        :sortKey="sortKey"
        :itemsByStore="itemsByStore"
        :itemsByFood="itemsByFood"/>
      <div v-show="sortKey==='1'"  class="EditButton">
        <Button @click="submit" type="danger" hairline round >竞标提交</Button>
      </div>
    </div>
</template>

<script>
/* eslint-disable */
import {
  DropdownMenu,
  DropdownItem,
  Button,
} from 'vant';
import NavigationLayout from '../components/layout/NavigationLayout.vue';
import ClassifyCollapse from '../components/ClassifyCollapse.vue';


export default {
  name: 'Bidding',
  components: {
    NavigationLayout,
    DropdownMenu,
    DropdownItem,
    ClassifyCollapse,
    Button,
  },
  mounted(){
    this.$store.dispatch("bidding/getSupplierFoodClassId",{userId:localStorage.getItem('userId')})
      .then(res=>{
        this.supplierInfo = res;
        this.$store.dispatch("bidding/getTodayBidding",{classId:res.supplierClass})
          .then(res=>{
            this.itemsByFood.time = res.time
            this.itemsByStore.time = res.time
          })
          .catch(res=>{
            this.orderId = res.orderId
            this.itemsByFood.time = res.time
            this.itemsByStore.time = res.time
            let detailTemp = res.detail
            detailTemp=detailTemp.replace('{','')
            detailTemp=detailTemp.replace('}','')
            let detailArr = detailTemp.split(',')
            for (let i of detailArr) {
              let arrI = i.split(':')
              this.$store.dispatch("bidding/getItemByItemId",{itemId:parseInt(arrI[0])})
                .then(res=>{
                  this.itemsByFood.foods.push({
                    id:res.itemId,
                    unit: res.unitId,
                    name:res.itemName,
                    count:parseFloat(arrI[1]),
                    price:res.lastPrice
                  })
                })
            }
            //--------------------------------------------------
            let sendInf = res.sendInf
            let xarr = sendInf.split(':{')
            let localArr = [];
            let itemArr = [];
            localArr.push(xarr[0].replace('{',''))
            for(let i=1;i<xarr.length-1;i++){
              let arr =  xarr[i].split("},")
              itemArr.push(arr[0])
              localArr.push(arr[1])
            }
            itemArr.push(xarr[xarr.length-1].replace('}}',''))
            for(let i = 0;i<localArr.length;i++){
              this.$store.dispatch("bidding/getWareHouseById",{wareHouseId:parseInt(localArr[i])})
                .then(res=>{
                  let arrItem = itemArr[i].split(',');
                  let food = [];
                  for(let z = 0;z<arrItem.length;z++){
                    let zarr = arrItem[z].split(':')
                    this.$store.dispatch("bidding/getItemByItemId",{itemId:parseInt(zarr[0])})
                      .then(res=>{
                        food.push(
                          {
                            id:res.itemId,
                            unit: res.unitId,
                            name:res.itemName,
                            count:parseFloat(zarr[1]),
                          }
                        )
                      })
                  }
                  this.itemsByStore.local.push(
                    {
                      name:res[0].name,
                      localName:res[0].name,
                      food:food
                    }
                  )
                })
            }
          })
      })
  },
  methods: {
    change(value, { name }) {
      //this.itemsByFood.foods[name].price = value;
      console.log(this.itemsByFood.foods[name].price)
    },
    submit() {
      this.$store.dispatch("bidding/addBidding",{
        ...this.itemsByFood,
        supplierId:this.supplierInfo.supplierId,
        orderId:this.orderId
      })
        .then(res=>{
          console.log(res)
        })
    },
  },
  data() {
    return {
      orderId:null,
      supplierInfo:null,
      sortKeys: [
        { text: '按食品类型分类', value: '1' },
        { text: '按运送仓库分类', value: '2' },
      ],
      sortKey: '1',
      itemsByFood: {
        time: '',
        foods: [
        ],
      },
      itemsByStore: {
        time: '',
        local: [],
      },
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
