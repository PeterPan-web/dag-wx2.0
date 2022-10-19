<template>
	<div style="position:relative">
		<p class="near">就近查档</p>
		<span class="more" @click="toNearSearch()">更多></span>
		<mt-loadmore  :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
			<ul >
			    <li v-for="(item,index) in list" :key="index" @click="toDetail(item)" style="height:40px;border-bottom: #ccc solid 1px;overflow: hidden;">
				    	<span class="nearList" style="padding:8px 0px;width:95vw;overflow: hidden;">
				    		<p style="overflow: hidden;white-space:nowrap;text-overflow:ellipsis;font-weight: 800;">{{item.NAME}}&nbsp;&nbsp;{{item.ADDRESS}}</p>
				    	</span>
			    </li>
			</ul>
		</mt-loadmore>
	</div>
</template>

<script>
	export default{
		name:"near",
		props:["mark","url"],
		data(){
			return{
				list:[],
				allLoaded:false
			}
		},
		created(){
			this.getFile();
		},
		methods:{
			loadTop(){
				this.allLoaded =false;
				this.$refs.loadmore.onTopLoaded();
				this.list = [];
				this.getFile();
			},
			toDetail(item){
				this.$router.push({path:"/nearSearchDetail",query:{argument:item}})
			},
			toNearSearch(){
				this.$router.push({path:"/nearSearch"})
			},
			getFile(){
				var _this = this;
				$.ajax({
					type:"post",
					url:_this.url,
					data:{
						currentPage:1,
						pageSize:6
					},
					dataType:"json",
					success:function(res){
						_this.list.push.apply(_this.list,res.result[0].rows);
					}
				});
			}
		}
	}
</script>

<style>
	.near{
		width:100%;
		height:30px;
		line-height: 30px;
		text-align: center;
		background:#ef6b42;
		color:#fff;
	}
	.more{
		display:inline-block;
		position:absolute;
		right:10px;
		color:#fff;
		z-index:99;
		top:3px;
	}
	.nearList p{
		width:100%;
		margin:5px 0px;
		word-wrap: break-word;
  		word-break: break-all;
  		overflow: hidden;
		text-align: left;
		margin-left:10px;
	}
</style>
