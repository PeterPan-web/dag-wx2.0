<template>
	<div>
		<van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" fixed>
		    <img :src="url" v-show="show" slot="right" style="width:25px" @click="searchHistory"/>
		</van-nav-bar >
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
			onClickLeft(){
				if(this.up){
					return;
				}
				this.$router.back(-1);
			},
			searchHistory(){
				this.$router.push({path:"/realNameReg"});
			}
		},

	}
</script>

<style>
</style>
