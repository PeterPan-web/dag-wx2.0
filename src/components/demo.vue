<template>
	<div>
		<headernav :title="title"></headernav>
		<loadmorecomponent :params="params"></loadmorecomponent>
		<mt-tabbar v-model="selected" fixed>      
	 		   <bottomcomponent></bottomcomponent>
	 	</mt-tabbar> 
	</div>
</template>

<script>
	import headernav from '../components/header.vue'
	import loadmorecomponent from '../components/loadMore.vue'
	import bottomcomponent from '../components/bottom.vue'
	export default{
		name:"demo",
		data(){
			return{
				title:"demo",
				target:this,
				selected:"",
				params:{
					url:"/backfeedApp!getAllQuestion.action",
					argument:{
						currentPage:1,
						pageSize:15,
						total:0
					},
					fn:function(res,_this){
						console.log(JSON.stringify(res))
						_this.params.total = res.result[0].count;
						for(var i=0;i<res.result[0].backfeed.length;i++){
							_this.fileList.push(res.result[0].backfeed[i]);
						}
					}
				}
			}
		},
		created(){
		},
		methods:{
			goNext(){
				this.$router.push({path:"/index?top=11"});
			}
		},
		components:{
			headernav,
			loadmorecomponent,
			bottomcomponent
		}
	}
</script>

<style>
	li{
		list-style: none;
	}
</style>