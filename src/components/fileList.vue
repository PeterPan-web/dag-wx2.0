<template>
	<div>
		<p style="border-bottom:1px solid #ccc;text-align:left;padding:8px 15px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" v-for="item in fileList" @click="fileDetail(item)">{{item.OBJNAME}}</p>
	</div>
</template>

<script>
	import Bus from '../components/bus.js'
	export default{
		name:"fileList",
		data(){
			return{
				fileList:[]
			}
		},
		mounted(){
			var _this = this;
			Bus.$on("getFileList",(fileList)=>{
				_this.fileList = fileList;
			});
		},
		methods:{
			fileDetail(item){
				this.$router.push({path:"/fileDetail",query:{argument:item}})
			}
		}
	}
</script>

<style>
</style>
