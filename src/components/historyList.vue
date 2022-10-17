<template>
	<div>
		<mt-loadmore :bottom-method="loadBottom" :top-method="top" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
			<ul style="width:90vw;margin:0 auto;overflow: auto;">
			    <li v-for="item in list" @click="toDetail(item)" style="border-bottom:#ccc solid 1px;width:100%">
			    	<p class="searchTitle" >{{item.TITLE}}</p>
			    	<p class="searchContent" >{{item.QUERYDATE}}</p>
			    </li>
			</ul>
		</mt-loadmore>
	</div>
</template>

<script>
	export default{
		name:"historyList",
		data(){
			return{
				allLoaded:false,
				currentPage:1,
				pageSize:15,
				total:0,
				url:HISARCH_URL,
				list:[]
			}
			
		},
		mounted(){
			this.getFile();
			// WeixinJSBridge.call('hideToolbar');
			// WeixinJSBridge.call('hideOptionMenu');
		},
		methods:{
			loadBottom(){
				this.allLoaded = true;
				if(this.total > 0 && this.list.length <this.total){
					this.allLoaded = false;
					this.currentPage++;
					this.getFile();
				}
				this.$refs.loadmore.onBottomLoaded();
			},
			loadTop(){
				this.allLoaded = false;
				this.currentPage=1;
				this.list =[];
				this.getFile();
				this.$refs.loadmore.onTopLoaded();
			},
			toDetail(item){
				localStorage.setItem("argument",JSON.stringify(item));
				localStorage.setItem("mark",1);
				this.$router.push({path:"/archDetail",query:{argument:item,mark:1}});
			},
			getFile(){
				var _this = this;
				var openId= localStorage.getItem("openId");
				$.ajax({
					type:"post",
					url:_this.url,
					data:{
						openid:openId,
						currentPage:_this.currentPage,
						pageSize:_this.pageSize,
					},
					dataType:"json",
					success:function(res){
						_this.total = res.result[0].count;
						_this.list.push.apply(_this.list,res.result[0].history)
					}
				});
			}
		}
	}
</script>

<style>
	.searchTitle{
		overflow: hidden;
		white-space:nowrap;
		font-size:15px;
		font-weight: 600;
	}
	.searchTitle,.searchContent{
		text-align: left;
		width:100%;
		text-overflow:ellipsis;
		margin:5px 0px; 
	}
	.searchContent{
		font-size:12px;
	}
</style>