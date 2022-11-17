<template>
  <div>
    <headernav :title="title" style="margin-bottom:48px"></headernav>
    <haveSearch :id="id" :url="url" :title="selected"></haveSearch>
  </div>
</template>

<script>
import headernav from "../../components/header.vue";
	import haveSearch from '../../components/haveSearch.vue'
  export default {
    name:"myContribution",
    components: {
haveSearch,
headernav
    },
    data (){
      return {
        title:"我的投稿",
        id:"listContent2",
        url:HAVE_URL,
        selected:"我的投稿"
      };
    },
  }
</script >

<style scoped>
</style>