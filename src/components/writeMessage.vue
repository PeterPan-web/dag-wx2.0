<template>
	<div>
		<van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" fixed>
				<img width="22px" slot="right" src="static/img/history.png" @click="toWrite"/>
				</van-nav-bar >
	</div>
</template>

<script>
	export default{
		name:"had",
		props:["title","path"],
		data(){
			return{

			}
		},
		methods:{
			toWrite(){
				this.$router.push({
          path:"/realNameReg",
          query:{
            type:1
          }
        });
			},
			onClickLeft(){
				if(this.up){
					return;
				}
				this.$router.back(-1);
			},
		}
	}
</script>

<style>
</style>
