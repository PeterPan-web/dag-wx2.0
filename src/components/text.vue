<template>
	<div class="text" v-html="text"></div>
</template>

<script>
	export default{
		name:"textCom",
		props:["text"],
		mounted(){
			/*this.text = this.text.replace(/<video[^>]*>/g, "<video  x5-playsinline ='true'></video>");*/
			/*var videoList = document.getElementsByTagName("video");
			var content = document.getElementsByClassName("text")[0];
			for(var i =0;i<videoList.length;i++){
				console.log(videoList[i].src)
				var newVideo = document.createElement("video");
				var html ="<video x5-playsinline ='true' src ='"+videoList[i].src+"'><source src='"+videoList[i].src+"'></source></video>"
				videoList[i].remove();
				this.text =html;
			}*/
			
		}
	}
</script>

<style>
	.text{
		font-size:12px;
		margin:5px 10px;
		line-height: 20px;
		text-align: left;
		letter-spacing:2px;
		word-break: break-word;
    padding-bottom: 2rem;

	}
</style>