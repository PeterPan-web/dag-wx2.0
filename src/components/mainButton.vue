<template>
	<div class="mainBtn">
		<div class="contentView" v-for="(item , index) in list" :key="index" @click="toNext(item.path)">
			<img :src="item.url" alt="" style="width:5.5rem;height:5.5rem"/>
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
   justify-content: space-evenly;
    margin-bottom: 20px;
	}	
  .contentView{
    flex:1;
    margin: 5px;
		width:calc(100vw/4);
		display: inline-block;
		padding:8px 0px;
	}
	.mint-main-button{
		background:#C3C3D8;
	}

</style>
