<template>
	<div class="mainBtn">
		<div class="contentView" v-for="(item , index) in list" :key="index" @click="toNext(item.path)">
			<img :src="item.url" alt="" style="width:3rem;height:3rem"/>
			<p style="font-size:13px;padding: 2px 0px;">{{item.content}}</p>
		</div>
	</div>
</template>

<script>
	export default{
		name:"mainButton",
		props:["list"],
		methods:{
			toNext(path){
				this.$router.push({path:path})
			}
		}
	}
</script>

<style>
	.mainBtn{
    display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: 12rem;
  margin-bottom: 15px;
	}	
  .contentView{
    flex-shrink:0;
		width:33%;
		display: inline-block;
		padding:8px 0px;
	}
	.mint-main-button{
		background:#C3C3D8;
	}

</style>
