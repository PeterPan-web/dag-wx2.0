<template>
  <div v-if="mylist" class="listpage">
    <div class="listcell"
         v-for="(item,index) in mylist"
         :key="index" @click="toDetail(item)">
      <div class="listleft">
        <div class="listtitle">
          <p style="color:#2C3E50">{{item.TITLE}}</p>
        </div>
        <div class="listMAINWORD">
          <p style="color:#B5B5B5">{{item.MAINWORD?item.MAINWORD:item.HELPINFO}}</p>
        </div>
      </div>
      <div class="showcode" :class="changecolor(item)" @click="toDetail(item)">
        <p>{{showcode(item)}}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'listcellhelp',
  data(){
    return{
title:'帮忙投稿'
    }
  },
  props: {
    mylist: {
      type: Array,
    },
    code:{
      type:Number
    }
  },
  created() {
  },
  methods: {
    showcode(item){
      if(item.VERIFY==0){
        return "审核中"
      }
      if(item.VERIFY==1){
        return "审核通过"
      }
      if(item.VERIFY==2){
        return "审核驳回"
      }
    },
    changecolor(item){
       if(item.VERIFY==0){
        return ""
      }
      if(item.VERIFY==1){
        return "greenVERIFY"
      }
      if(item.VERIFY==2){
        return "redVERIFY"
      }
    },
    toDetail(item) {
      var _this = this
      console.log(item);
      this.$router.push({
        path: '/helpDetail',
        query: {title: _this.title, argument: item },
      })
    },
  },
}
</script >

<style scoped>
.listpage{
   background: #EDEDED;
}
.listcell {
  margin-top: 0.5rem;
  margin: 0 auto;
  width: 25rem;
  height: 4rem;
  display: flex;
  background: #FFFFFF;
  margin-bottom: 10px;
  border-radius: 4px;
  text-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
}
.listleft {
  width: 17rem;
  color: black;
  text-align: left;
  padding-left: 0.9rem;
}
.listtitle {
  height: 20px;
  line-height: 20px;
  text-align: left;
  font-size: 14px;
  margin-top: 0.8rem;
}
.listMAINWORD {
  height: 20px;
  width: 100%;
  overflow: hidden;
  
  line-height: 20px;
  font-size: 12px;
}
.showcode {
  font-size: 14px;
  margin-top: 0.4rem;
  color: #EA6F46;
}
.greenVERIFY{
  color:#13D800 ;
}
.redVERIFY{
color: #A30303;
}
</style>