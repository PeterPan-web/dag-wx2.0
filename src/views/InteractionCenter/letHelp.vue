<template>
	<div>
   <headernav :title="title" style="margin-bottom:48px"></headernav>
   <searchcomponent :id="id" :url="url" :title="selected"></searchcomponent>
	</div>
</template>

<script>
import searchcomponent from '../../components/centerSearch.vue'
import headernav from "../../components/header.vue";
	export default{
      components: {
    headernav,
    searchcomponent
  },
		name:"letHelp",
		data(){
			return{
        title:"我来帮忙",
        id:"listContent1",
        url:HELP_URL,
        selected:"我来帮忙"
      }
		},
 
	}
</script>


