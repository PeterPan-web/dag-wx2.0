import Vue from 'vue'
import Vuex from 'vuex'
<<<<<<< HEAD
Vue.use(Vuex)
 
// 用来存储数据
const state = {
  loginStatus:0,
}
// 响应组件中的事件
const actions = {

}
// 操作数据
const mutations = {
  showStatus(state){
   state.loginStatus=1 
  },
  closeStatus(state){
    state.loginStatus=0
   }   
}
// 用来将state数据进行加工
const getters = {
 
}
// 新建并暴露store
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})
 
=======
import counter from './modules/counter.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    counter
  }
})

export default store
>>>>>>> 0b9e634e703719625707d9d84b2ece8be1985812
