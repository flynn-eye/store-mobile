<template>
  <div>
    <NavigationLayout
      location-title='入库'
      :show-left='true'
      icon="success"
      :rightClick='open'/>
    <DropdownMenu>
      <DropdownItem v-model='sortKey' :options='sortKeys'/>
    </DropdownMenu>
    <CellGroup>
      <div v-for="(i,k) in inputItems" :key="k">
        <Cell>
          <div slot="title">
            {{i.name}}
          </div>
          <div slot="default">
            <Field
              type="number"
              v-model="inputItems[k].onBalance">
              <div slot="left-icon"></div>
              <div slot="button">
                <Button size="small" @click="input(k)">入库</Button>
              </div>
            </Field>
          </div>
          <div slot="label">
            购入{{i.count+i.unit}}已入库{{i.isInput}}
          </div>
        </Cell>
      </div>
    </CellGroup>
    <ActionSheet v-model="show">
      <Rate v-model="rateValue"
            class="center"/>
      <CellGroup>
        <div v-for="(i,k) in arr" :key="k">
          <Cell>
            <div slot="title">
              {{i.name}}
            </div>
            <div slot="default">
              缺少：{{i.count - i.isInput+i.unit}}
            </div>
            <div slot="label">
              购入{{i.count+i.unit}}已入库{{i.isInput}}
            </div>
          </Cell>
        </div>
      </CellGroup>
      <div class="center">
        <Button type="danger"  round @click="submit">结束入库</Button>
      </div>
    </ActionSheet>
  </div>
</template>

<script>
/* eslint-disable */
import {
  Cell,
  CellGroup,
  Field,
  Button,
  Rate,
  ActionSheet,
  DropdownMenu,
  DropdownItem,
} from 'vant';
import NavigationLayout from '../components/layout/NavigationLayout.vue';
import { post ,get} from '../util/http';

export default {
  name: 'InputStore',
  components: {
    NavigationLayout,
    Cell,
    CellGroup,
    Field,
    Button,
    Rate,
    ActionSheet,
    DropdownMenu,
    DropdownItem,
  },
  created(){
    this.init()
    let date = new Date();
    this.time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
  },
  methods: {
    init(){
      post('/bidding/getOrder')
        .then(res=>{
          this.tempData = res
          console.log(res)
          this.sortKey = res[0].supplierId
          for(let i of res){
            this.map.set(i.supplierId,i.orderId)
            post('/bidding/getSupplierById',{supplierId:i.supplierId})
              .then(res=>{
                this.sortKeys.push({
                  text:res.supplierName,
                  value:i.supplierId
                })
              }).catch(err=>{console.log(err)})
          }
        })
        .catch(err=>{

        })
    },
    submit() {
      this.arr = [];
      this.show = false;
      post('/goods/endInput',{
        orderId:this.map.get(this.sortKey),
        rate:this.rateValue
      })
    },
    open() {
      this.arr = [];
      for (let i = 0; i < this.inputItems.length; i += 1) {
        if ((this.inputItems[i].count - this.inputItems[i].isInput) > 0) {
          this.arr.push(this.inputItems[i]);
        }
      }
      console.log(this.arr);
      this.show = true;
    },
    input(k) {
      console.log(this.inputItems[k])
      post('/goods/insertGoods',{
        ...this.inputItems[k],
        supplierId:this.sortKey,
        wareHouseId:this.wareHouseId,
        weight:this.inputItems[k].onBalance,
        itemId:this.inputItems[k].id,
        inTime:this.time,
        orderId:this.map.get(this.sortKey)
      })
        .then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
      })
      this.inputItems[k].isInput += parseFloat(this.inputItems[k].onBalance);
      this.inputItems[k].onBalance = 0;
    },
  },
  watch:{
    sortKey(newV,oldV){
      let userId = localStorage.getItem('userId')
      post('/bidding/getWareHouseByUserId',{userId:userId})//获取对应的warehouseId
        .then(res=>{
          this.wareHouseId = res.wareHouseId
          for(let i of this.tempData){
            if(i.supplierId==this.sortKey)
            {
              this.inputItems = [];
              let sendInf = i.sendInf
              sendInf = sendInf.split(':{')
              let localArr = [];
              let itemArr = [];
              localArr.push(sendInf[0].replace('{',''))
              for(let z  =1;z<sendInf.length-1;z++){
                let arr =  sendInf[z].split("},")
                itemArr.push(arr[0])
                localArr.push(arr[1])
              }
              itemArr.push(sendInf[sendInf.length-1].replace('}}',''))
              for(let z = 0;z<localArr.length;z++){
                if(localArr[z]==res.wareHouseId){
                  let itemxx =itemArr[z].split(',')
                  for(let xx of itemxx){
                    this.$store.dispatch("bidding/getItemByItemId",{itemId:xx.split(':')[0]})
                      .then(res=>{
                        this.inputItems.push(
                          {
                            count: xx.split(':')[1],
                            name: res.itemName,
                            id: res.itemId,
                            unit: res.unitId,
                            isInput: 0,
                            onBalance: 0,
                          }
                        )
                      }).catch(err=>{console.log(err)})
                  }
                }
              }
            }
          }
        }).catch(err=>{console.log(err)})
    }
  },
  data() {
    return {
      map:new Map(),
      time:'',
      wareHouseId:'',
      tempData:[],
      sortKeys: [],
      sortKey:null ,
      arr: [],
      rateValue: 5,
      show: false,
      result: [],
      inputItems: [],
    };
  },
};
</script>

<style lang="less">
.center{
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
