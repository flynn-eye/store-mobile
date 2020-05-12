<template>
    <div>
      <NavigationLayout
        location-title='出库'
        :show-left='true'
         />
      <DropdownMenu>
        <DropdownItem v-model='sortKey' :options='sortKeys'/>
      </DropdownMenu>
      <div v-for="(value,key) in requireItem" :key="key">
        <Collapse :accordion="true" v-model="name" >
          <CollapseItem :name="value.requireId" :title="value.createTime">
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
          </CollapseItem>
        </Collapse>
      </div>
    </div>
</template>

<script>
/* eslint-disable */
import {
  Collapse,
  CollapseItem,
  Button,
  CellGroup,
  Cell,
  DropdownMenu,
  DropdownItem,
  Field,
  Notify,
} from 'vant';
import NavigationLayout from '../components/layout/NavigationLayout.vue';
import { post ,get} from '../util/http';

export default {
  name: 'OutputStore',
  components: {
    NavigationLayout,
    Button,
    CellGroup,
    Cell,
    Field,
    DropdownMenu,
    DropdownItem,
    Collapse,
    CollapseItem,
  },
  created(){
    this.init_window();
  },
  methods: {
    init_window(){
      post('/output/getWindow',{userId:localStorage.getItem('userId')})
        .then(res=>{
          this.sortKey = res[0].windowId
          for(let i of res){
            this.sortKeys.push({
              ...i,
              text:i.windowNum,
              value:i.windowId,
            })
          }
          console.log(res)
        }).catch(err=>{
          console.log(err)
      })
    },
    output(k) {
      let tempOnBalanace = this.OutputItems[k].onBalance
      if (this.OutputItems[k].count < this.OutputItems[k].onBalance) {
        this.OutputItems[k].onBalance = 0;
        Notify({ type: 'danger', message: '库存不足' });
      } else {
        this.OutputItems[k].count -= this.OutputItems[k].onBalance;
        this.OutputItems[k].onBalance = 0;
        Notify({ type: 'danger', message: '出库成功' });
        if(this.OutputItems[k].count==0){//订单全部出库
          let arr = this.OutputItems.filter(i=>{
            return i.count!==0;
          })
          if(arr.length===0){//订单出库成功
            post('/output/endOutput',{
              //itemInf:JSON.stringify(temp),
              requireId:this.name
            })
              .then(res=>{console.log(res)})
          }
        }
        let temp = this.OutputItems.map(item=>{
          return{
            itemId:item.id,
            itemName:item.name,
            count:item.count
          }
        })
        post('/output/output',{
          itemInf:JSON.stringify(temp),
          requireId:this.name
        }).then(
          res=>{
            console.log(res)
            if(res>0){
              post('/output/updateGoods',{
                weight:new Number(tempOnBalanace),
                itemId:this.OutputItems[k].id
              }).then(res=>{
                console.log(res)
              })
            }
          }
        )
        console.log(temp)
      }
    },
  },
  watch:{
    sortKey(newV,oldV){
      let window = this.sortKeys.filter(i=>{
        return newV==i.windowId
      });
      post('/output/getRequireIs2ByUserId',...window)
        .then(res=>{
          this.requireItem = res
        }).catch(err=>{console.log(err)})
    },
    name(newV,oldV){
      this.OutputItems = []
      for(let i of this.requireItem){
        if(i.requireId == newV){
          let itemInf =  JSON.parse(i.itemInf)
          for (let z of itemInf){
            this.OutputItems.push({
              id: z.itemId,
              name: z.itemName,
              count: z.count,
              onBalance: 0,
            })
          }
        }
      }
    }
  },
  data() {
    return {
      name:[],
      sortKey:'',
      sortKeys:[],
      requireItem:[],
      OutputItems: [
      ],
    };
  },
};
</script>

<style>

</style>
