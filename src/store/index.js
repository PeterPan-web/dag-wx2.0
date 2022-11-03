import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
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
    getters,
    plugins: [createPersistedState({
      key:'Status',
      paths: ['loginStatus']
    })]
})
