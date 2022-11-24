<template>
	<div>
		<headernav :title="title" v-if="shownav" :style="shownav?'margin-bottom:45px;':''"></headernav>
		<searchcomponent :ps="ps"></searchcomponent>
	</div>
</template>

<script>
	import headernav from '../components/header.vue'
	import searchcomponent from '../components/consultSearch.vue'
	export default{
		name:"open",
		data(){
			return{
				title:"信息公开",
       shownav:true,
				params:{},
				ps:{
					url:OPEN_URL,
				}
			}
		},
		components:{
			headernav,
			searchcomponent
		},
    created(){
        if(this.$route.query.alone){
       this.shownav=false
     }
    },
		methods:{
		}
	}
</script>

<style>
</style>