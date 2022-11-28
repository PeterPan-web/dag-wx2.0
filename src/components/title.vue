<template>
	<p class="title" style="font-size: 26px">{{title}}</p>
</template>

<script>
	export default{
		name:"titleCom",
		props:["title"]
	}
</script>

<style>
.title{
	margin:10px 0px;
	text-align: center!important;
	letter-spacing:3px;
	word-break: break-word;
  
}
</style>
