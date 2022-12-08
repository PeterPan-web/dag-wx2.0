<template>
  <div class="redlistpage">
    <headernav :title="title"
               :show="show"
               v-if="shownav"
               :style="shownav?'margin-bottom:45px;':''"></headernav>
    <div class="listpage">
      <div class="toplist">
        <mt-navbar v-model="selected"
                   class="topnav">
          <mt-tab-item v-for="(item,index) in list"
                       :id="item.OPTIONNAME"
                       :key="index"
                       class="topitem">{{item.OPTIONNAME}}</mt-tab-item>
        </mt-navbar>
      </div>
      <!-- tab-container -->
      <mt-tab-container v-model="selected"
                        style="height: calc(100vh - 309px);overflow: auto;">
        <mt-tab-container-item v-for="(item,index) in list"
                               :id="item.OPTIONNAME"
                               :key="index">
          <searchcomponent :name="item.OPTIONNAME"
                           :ps="params"
                           style="height: calc(100vh - 309px);overflow: auto;"></searchcomponent>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import { postredlist } from "../../http/api/redlist";
import headernav from '../../components/header.vue'
import searchcomponent from '../redlist/relistcell.vue'
export default {
  name: 'consult',
  data() {
    return {
      title: '红色记忆',
      shownav: true,
      show: true,
      getredlisturl: GETREDTITLE_URL,
      selected: '',
      list: [],
      curPage: '',
      params: {
        url: GETREDLIST_URL,
        mark: 1,
      },
    }
  },
  components: {
    headernav,
    searchcomponent,
  },
  created() {
    if (this.$route.query.alone) {
      this.shownav = false
    }
    // this.getFile(),
    postredlist().then(
      res=>{
        
        this.list = res.result[0].encodes
          this.selected = res.result[0].encodes[0].OPTIONNAME}
    )
  },
  watch: {
    selected(newVal, oldVal) {
      this.curPage = newVal
    },
  },
  methods: {
    // getFile() {
    //   var _this = this
    //   $.ajax({
    //     type: 'post',
    //     url: _this.getredlisturl,
    //     dataType: 'json',
    //     success: function (res) {
    //       _this.list = res.result[0].encodes
    //       _this.selected = res.result[0].encodes[0].OPTIONNAME
    //     },
    //   })
    // },
  },
}
</script>
<style scoped>
 .listpage{ 
   height: calc(100vh); 
 } 
.toplist {
  height: 49px;
  width: 100%;
  overflow: hidden;
}
.topnav {
  height: 55px;
  text-align: left;
  display: block;
  overflow-y: hidden;
  overflow-x: auto;
  overflow-x: none;
  white-space: nowrap; 
  margin: 0 auto;
}
.topitem {
  text-align: center;
  display: inline-block;
  padding: 17px 0px;
  width: 33%;
 
}

</style>
