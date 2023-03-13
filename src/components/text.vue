<template>
	<div class="text" v-html="text"></div>
</template>

<script>
	export default{
		name:"textCom",
		props:["text"],
		mounted(){
		}
	}
</script>

<style scoped>
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