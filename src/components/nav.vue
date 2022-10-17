<template>
	<p class="nav">{{nav}}</p>
</template>

<script>
	export default{
		name:"navContent",
		props:["nav"]
	}
</script>

<style>
	.nav{
		width:100%;
		height:30px;
		line-height: 30px;
		text-align: center;
		background:#ef6b42;
		color:#fff;
	}
</style>
