<template>
	<div class="firstmainBtn">
		<div class="firstcontentView" v-for="(item , index) in list" :key="index" @click="toNext(item.path)">
			<img :src="item.url" alt="" style="width:45px;height:45px"/>
			<p style="font-size:13px;padding: 2px 0px;">{{item.content}}</p>
		</div>
	</div>
</template>

<script>
	export default{
		name:"firstmainButton",
		props:["list"],
		methods:{
			toNext(path){
				this.$router.push({path:path})
			}
		}
	}
</script>

<style>
	.firstmainBtn{
    display: flex;
    flex-wrap: wrap;
    margin-left: 11%;
    margin-bottom: 20px;
	}	
  .firstcontentView{
    margin: 5px;
		width:calc(100vw/4);
		display: inline-block;
		padding:8px 0px;
	}
	.mint-main-button{
		background:#C3C3D8;
	}

</style>