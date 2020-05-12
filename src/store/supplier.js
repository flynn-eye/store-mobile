/* eslint-disable */
import {get,post} from '../util/http'
const supplier = {
  namespaced: true,
  state:{

  },
  mutations: {
  },
  actions: {
    getSupplierClass(){
      return get("/foodClass/getParentClass")
        .catch(e=>{console.log(e)})
    },
    addSupplier(context,params){
      return post("/supplier/addSupplier",{...params})
        .catch(e=>{console.log(e)})
    }
  },
}
export default supplier;
