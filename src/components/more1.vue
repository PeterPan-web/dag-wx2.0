<template>
	<div>
		<mt-loadmore :bottom-method="loadBottom"  :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
			<ul>
			    <li v-for="(item,index) in fileList" :key="index" style="padding:6px 0px;border-bottom:1px solid #ccc" @click="goNext">
			    	<span class="mainTitle">{{item.CONTENT}}</span>
			    	<span class="time">{{item.CREATEDATE}}</span>
			    </li>
			    <li style="padding:6px 0px;" v-if="footer">
			    	<span class="footerMsg">已经到底了</span>
			    </li>
			</ul>
		</mt-loadmore>
	</div>
</template>

<script>
	export default{
		name:"loadMore",
		props:["params"],
		data(){
			return{
				allLoaded:false,
				fileList:[],
				footer:false
			}
		},
		mounted(){
			this.getFile();
		},
		methods:{
			getFile(){
				var _this = this;
				$.ajax({
					type:"get",
					url:_this.params.url,
					data:this.params.argument,
					dataType:"json",
					success:function(res){
						_this.params.fn(res,_this);
					}
				});
			},
			goNext(){
				this.$router.push({path:"/index?top=11"});
			},
			loadBottom(){
				if(this.params.argument.total >0 && this.fileList.length < this.params.argument.total){
					this.params.argument.currentPage++;
					this.allLoaded = false;
					console.log(this.params.argument.currentPage)
				}else{
					this.allLoaded = true;
					this.footer = true;
				}
				this.$refs.loadmore.onBottomLoaded();
				
			},
			loadTop(){
				this.allLoaded = false;
				this.footer =false;
				this.$refs.loadmore.onTopLoaded();
			}
		}
	}
</script>

<style>
	.mainTitle{
		display: inline-block;
		width:50vw;
		overflow: hidden;
		text-align: left;
		white-space:nowrap;
		text-overflow:ellipsis;
		font-size:13px;
	}
	.time{
		display: inline-block;
		width:35vw;
		text-align: right;
		font-size:13px;
	}
	.footerMsg{
		display: inline-block;
	}
</style>