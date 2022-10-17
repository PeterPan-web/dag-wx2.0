<template>
	<div>
		<mt-header :title="title" fixed>
		    <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
		    <img :src="url" v-show="show" slot="right" style="width:25px" @click="searchHistory"/>
		</mt-header>
	</div>
</template>

<script>
	export default{
		name:"headernav",
		props:["title","up","show"],
		data(){
			return{
				url:"static/img/history.png"
			}
		},
		methods:{
			goBack(){
				if(this.up){
					return;
				}
				this.$router.back(-1);
			},
			searchHistory(){
				this.$router.push({path:"/realNameReg"});
			}
		}
	}
</script>

<style>
</style>
