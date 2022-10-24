<template>
	<div style="padding:20px;display: flex;justify-content: space-between">
		<div class="contentView" v-for="(item,index) in list" :key="index" @click="toNext(item.path)">
			<img :src="item.url" alt="" style="width:35px;height:35px"/>
			<p style="font-size:13px;padding: 2px 0px;">{{item.content}}</p>
			<!--<span class="mainBtn" @click="toNext(item.path)">{{item.content}}</span>-->
		</div>
	</div>
</template>

<script>
	export default{
		name:"mainButton",
		props:["list"],
		methods:{
			toNext(path){
				this.$router.push({path:path})
			}
		}
	}
</script>

<style>
	.contentView{
		width:calc(100vw/4);
		display: inline-block;
		padding:8px 0px;
	}
	.mint-main-button{
		background:#C3C3D8;
	}
	.mainBtn{
		display:inline-block;
		width:60px;
		height:60px;
		background:#C3C3D8;
		color:#fff;
		border-radius: 50%;
		text-align: center;
		font-size:12px;
		line-height: 60px;;
	}
</style>
