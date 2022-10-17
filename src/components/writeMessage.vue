<template>
	<div>
		<mt-header :title="title" fixed>
		    <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
			<mt-button slot="right" @click="toWrite">
				<img width="22px" src="static/img/history.png"/>
			</mt-button>
		</mt-header>
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
			goBack(){
				this.$router.back(-1);
			}
		}
	}
</script>

<style>
</style>
