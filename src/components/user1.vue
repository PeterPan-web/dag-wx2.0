<template>
	<div class="middle-container" style="border:1px solid transparent;height:100px;border-radius:20px;box-shadow:0 0 20px black;background-color: aliceblue;">
		<div style="position:absolute;top:5%;width:25%;border:1px solid transparent;">
			<img :src="url" style="width:50%;height:50%;border:1px solid transparent;"/>
			<p style="font-size:13px;font-weight:700;padding: 2px 0px;">信息修改</p>
		</div>
		<div style="position:absolute;top:5%;left:25%;width:25%;border:1px solid transparent;">
			<img :src="url1" style="width:50%;height:50%;border:1px solid transparent;"/>
			<p style="font-size:13px;font-weight:700;padding: 2px 0px;">我的收藏</p>
		</div>
		<div style="position:absolute;top:5%;left:50%;width:25%;border:1px solid transparent;">
			
		</div>
		<div style="position:absolute;top:5%;left:75%;width:25%;border:1px solid transparent;">
			
		</div>
	</div>
</template>

<script>
	export default{
		name:"user1",
		data(){
			return{
				url1:"static/img/collection1.png",
				url:"static/img/change.png",
			}
		},
		}
</script>

<style>
</style>