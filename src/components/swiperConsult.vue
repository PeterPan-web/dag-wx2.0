<template>
	<div class="wrap">
		<mt-swipe :auto="4000" style="height: 200px;" :show-indicators="false">
		  <mt-swipe-item style="height:200px;position:relative" v-for="item in list">
		  	<img :src="com+item.PICTURE" width="100%" height="100%"/>
		  	<p class="bottom">{{item.TITLE}}</p>
		  </mt-swipe-item>
		  
		</mt-swipe>
	</div>
</template>

<script>
	export default{
		name:"swiper",
		props:["list"],
		data(){
			return{
				com:HOST_HOME
			}
		}
	}
</script>

<style>
	.bottom{
		line-height:30px;
		text-align:left;
		color:#fff;
		height:30px;
		width:100%;
		background:rgba(199,187,177,0.5);
		position:absolute;
		bottom:0px;
		overflow: hidden;
	}
</style>