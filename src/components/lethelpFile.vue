<template>
	<div id="helpFilecontainer">
	    <div v-for="(item,index) in imgList" :key="index" >
	      <img  v-lazy.container="com+item.PICTURE">
	    </div>
	</div>
</template>

<script>
	export default{
		name:"letimgFile",
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

<style scoped>
.helpFilecontainer{
padding-bottom: 5rem;
}
img[lazy="loaded"] {
	  width:15rem;
	  height:10rem;
	  margin: 0 auto;
	  margin-bottom:8px;
	}
</style>