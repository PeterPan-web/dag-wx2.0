<template>
	<div id="txt">
		<p class="text">主题词：&nbsp;{{content.MAINWORD}}</p>
		<p class="text">文件时间：&nbsp;{{content.FILEDATE}}</p>
		<p class="text">关键字：&nbsp;{{content.KEYWORD}}</p>
		<p class="text">年限：&nbsp;{{content.LIMITED}}</p>
		<p class="text">年度：&nbsp;{{content.FILEYEAR}}</p>
		<p class="text">档号：&nbsp;{{content.ARCHNO}}</p>
	</div>
</template>

<script>
	import Bus from '../components/bus.js'
	export default{
		name:"txt",
		data(){
			return{
				content:{}
			}
		},
		mounted(){
			var _this = this;
			Bus.$on("getTxt",(obj) =>{
				_this.content = obj;
			});
		}
	}
</script>

<style>
	#txt p{
		font-size:12px;
		margin:5px 20px;
		line-height: 20px;
		text-align: left;
		letter-spacing:2px;
	}
</style>