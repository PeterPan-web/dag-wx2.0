<template>
	<div id="container">
	  <ul>
	    <li v-for="item in imgList" style="margin-top:15px;margin-bottom:15px;">
	      <img v-lazy.container="com+item.PICTURE" style="width:80vw;height:40vh">
	    </li>
	  </ul>
	</div>
</template>

<script>
	import Bus from '../components/bus.js'
	export default{
		name:"imgFile",
		props:["url","id"],
		data(){
			return{
				imgList:[],
				com:HOST_HOME
			}
		},
		created(){
			var _this = this;
			$.ajax({
				type:"post",
				url:_this.url,
				data:{
					id:_this.id
				},
				dataType:"json",
				success:function(res){
					_this.imgList =res.result[0].pictures;
				}
			});
			
		}
	}
</script>

<style>
	img[lazy="loaded"] {
	  width:80vw;
	  height:20vh;
	  margin: auto;
	  margin-bottom:15px;
	}
</style>