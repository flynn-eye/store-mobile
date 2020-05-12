/* eslint-disable */
import { post ,get} from '../util/http';
const bidding = {
  namespaced: true,
  state:{

  },
  mutations: {
  },
  actions: {
    getSupplierFoodClassId(context,params){
      return post('/order/getSupplierFoodClassId',{...params})
        .catch((err) => { console.log(err); });
    },
    getTodayBidding(context,params){
      return post('/order/getTodayBidding',{...params})
    },
    getItemByItemId(context,params){
      return post('/order/getItemByItemId',{...params})
        .catch(err=>{console.log(err)})
    },
    getWareHouseById(context,params){
      return post('/order/getWareHouseById',{...params})
        .catch(err=>{console.log(err)})
    },
    addBidding(context,params){
      return post('/bidding/addBidding',{...params})
        .catch(err=>{console.log(err)})
    }
  },
}
export default bidding;
