<template>
  <div>
    <NavigationLayout
      location-title='窗口报单'
      :show-left='true'
      icon='shopping-cart-o'
      :rightClick='open'/>
    <DropdownMenu>
      <DropdownItem v-model='firstClassValue' :options='firstClass' @change='onChange'/>
    </DropdownMenu>
    <TreeSelect
      @click-item='clickItem'
      :main-active-index.sync='leftActiveIndex'
      :active-id.sync='activeId'
      height='98vh'
      :items='items'>
    </TreeSelect>
    <ActionSheet v-model='show'>
      <XCell :items='sheetItems' @onChange='changeCounter'/>
      <Button round type='danger'
              style='float: right;margin-top: 8px;'
              @click='submitOrder'>提交订单</Button>
    </ActionSheet>
  </div>
</template>

<script>
/* eslint-disable */
import _ from 'lodash';
import {
  TreeSelect,
  DropdownMenu,
  DropdownItem,
  ActionSheet,
  Button,
  Toast,
  Notify ,
} from 'vant';
import NavigationLayout from '../components/layout/NavigationLayout.vue';
import XCell from '../components/XCell.vue';
import { post ,get} from '../util/http';

export default {
  name: 'WindowCustoms',
  components: {
    NavigationLayout,
    TreeSelect,
    DropdownMenu,
    DropdownItem,
    ActionSheet,
    XCell,
    Button,
    Notify ,
  },
  computed: {
    firstClass() {
      return this.$store.state.windowCustomer.firstClass;
    },
    items() {
      return this.$store.state.windowCustomer.items;
    },
  },
  mounted() {
    this.$store.dispatch('windowCustomer/getFirstClass')
      .then((res) => {
        let result = []
        for (let x of res.foodClasses) {
          result.push({
            text: x.className,
            value: x.classId
          })
        }
        this.firstClassValue = result[0].value
        this.$store.state.windowCustomer.firstClass = result;
        this.$store.dispatch('windowCustomer/getTreeItems', {classId:this.$store.state.windowCustomer.firstClass[0].value})
          .then((res) => {
            let result = []
            for(let x of res.foodClasses){
              this.$store.dispatch('windowCustomer/getFoodItemByTreeItem',{classId:x.classId})
                .then(res=>{
                  result.push({
                    text:x.className,
                    value:x.classId,
                    children:res.map(item=>{return {id:item.itemId,text:item.itemName}})
                  })
                })
            }
            this.$store.state.windowCustomer.items = result
          })
        }
      )
  },
  destroyed(){
    this.$store.state.windowCustomer.flag = 0;
  },
  methods: {
    submitOrder() {
      if(this.$store.state.windowCustomer.flag==1){
        let itemData = this.sheetItems.filter(
          item=>{
            return item.count>0
          })
        itemData = itemData.map(
          item=>{
            if(item.count>0)
              return {itemId:item.id,count:item.count,itemName:item.text}
          })
        console.log(itemData)
        let date = new Date();
        let time= date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
        post('/require/updateItemInf',{
          itemInf:JSON.stringify(itemData),
          createTime:time,
          userId:localStorage.getItem("userId")})
          .then(res=>{
            if(res===1){
              Notify({
                message: '报单成功',
                duration: 1000,
              });
            }else{
              Notify({
                message: '报单失败',
                duration: 1000,
              });
            }
          })
      }
      if(this.$store.state.windowCustomer.flag==0){
        let itemData = this.sheetItems.filter(
          item=>{
            return item.count>0
          })
        itemData = itemData.map(
          item=>{
            if(item.count>0)
              return {itemId:item.id,count:item.count,itemName:item.text}
          })
        let time;
        this.$store.dispatch('common/dateToString').then(res=>{
          time = res
          this.$store.dispatch('windowCustomer/addRequire', {
            itemInf:JSON.stringify(itemData),
            createTime:time,
            userId:localStorage.getItem("userId")})
            .then(res=>{
              if(res===1){
                Notify({
                  message: '报单成功',
                  duration: 1000,
                });
              }else{
                Notify({
                  message: '报单失败',
                  duration: 1000,
                });
              }
            });
        })
        this.activeId = [];
        this.sheetItems = [];
        this.show = false;
      }

    },
    changeCounter(index, data) {
      this.sheetItems[index].count = data;
    },
    onChange(value) {
      this.$store.commit('windowCustomer/setFirstClassValue', value);
       this.$store.dispatch('windowCustomer/getTreeItems',{classId:value})
         .then((res) => {
           let result = []
           for(let x of res.foodClasses){
             this.$store.dispatch('windowCustomer/getFoodItemByTreeItem',{classId:x.classId})
               .then(res=>{
                 result.push({
                   text:x.className,
                   value:x.classId,
                   children:res.map(item=>{return {id:item.itemId,text:item.itemName}})
                 })
               })
           }
           this.$store.state.windowCustomer.items = result
         })
    },
    open() {
      this.show = true;
    },
    clickItem(data) {
      const index = _.findIndex(this.sheetItems, data);
      if (index === -1) {
        this.sheetItems.push(data);
      } else {
        this.sheetItems.splice(index, 1);
      }
    },
  },
  data() {
    return {
      show: false,
      sheetItems: this.$store.state.windowCustomer.sheetItems,
      firstClassValue:this.$store.state.windowCustomer.firstClassValue ,
      leftActiveIndex: this.$store.state.windowCustomer.leftActiveIndex,
      activeId: this.$store.state.windowCustomer.activeId,
    };
  },
};
</script>

<style>

</style>
