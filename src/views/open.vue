<template>
	<div>
		<headernav :title="title"></headernav>
		<searchcomponent :ps="ps" style="margin-top:48px"></searchcomponent>
	</div>
</template>

<script>
	import headernav from '../components/header.vue'
	import searchcomponent from '../components/consultSearch.vue'
	export default{
		name:"open",
		data(){
			return{
				title:"公开信息",
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
      //console.log(this.$store.state.loginStatus);
    },
		methods:{
		}
	}
</script>

<style>
</style>