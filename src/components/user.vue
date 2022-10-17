<template>
	<div style="width:100%;height:100%">
		
	    <div style="left:0%;position:absolute;top:0%;width:100%;height:100%"><img :src="url" style="width:100%;height:20%;border:1px solid transparent;"/></div>
		<div class="login" style="position:absolute; z-index:1;left:5%;width:200px;height:100px;top:25px;border:1px solid transparent;">
			
				<mt-button style="position:absolute;left:7%;border-radius: 50%;width:80px;height:80px;border:1px solid transparent"><img :src="url1" style="height:90%;width:90%"/></mt-button>
			
				<mt-button style="position:absolute;background-color:transparent;border:0;margin-top:7%;border:1px solid transparent">未登录</mt-button>
				
			
		</div>
	</div>   
	
</template>

<script>
	
	export default{
		name:"user",
		data(){
			return{
				url:"static/img/bg4.png",
				url1:"static/img/head.png"
			}
		},
		methods:{
			
			},
		}
</script>

<style>


</style>