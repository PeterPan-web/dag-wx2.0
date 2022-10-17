<template>
	<button @click="back">返回</button>
</template>

<script>
	export default{
		name:"main",
		methods:{
			back(){
				this.$router.back(-1);
			}
		}
	}
</script>

<style>
</style>