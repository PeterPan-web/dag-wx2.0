<template>
	<div>
		<mt-loadmore :bottom-method="loadBottom"  :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
			<ul>
			    <li v-for="item in fileList" @click ="toDetail" style="padding:6px 0px;border-bottom:1px solid #ccc">
			    	
			    	<span class="mainTitle">{{item.CONTENT}}</span>
			    	<span class="time">{{item.CREATEDATE}}</span>
			    </li>
			</ul>
		</mt-loadmore>
	</div>
</template>

<script>
	import Bus from '../components/bus.js'
	export default{
		name:"feedList",
		props:["url","key"],
		data(){
			return{
				fileList:[],
				t:"",
				total:0,
				currentPage:1,
				pageSize:15,
				params:{},
				allLoaded:false
			}
		},
		mounted(){
			var _this = this;
			Bus.$on("updata",(key)=>{
				_this.key =key;
				_this.currentPage =1;
				_this.fileList =[];
				_this.getFile();
			});
		},
		/*activated(){
			this.getParams();
			if(typeof(this.params.top)=="undefined"){
				this.key ="";
				this.getFile();
			}else{
				document.getElementById("listContent").scrollTop = this.params.top;
			}
			
		},*/
		methods:{
			getFile(){
				var _this = this;
				var openId = localStorage.getItem("yjqopenId");
				$.ajax({
					type:"post",
					url:_this.url,
					data:{
						key:_this.key,
						openid:openId,
						currentPage:_this.currentPage,
						pageSize:_this.pageSize
					},
					dataType:"json",
					success:function(res){
						_this.total = res.result[0].count;
						for(var i=0;i<res.result[0].backfeed.length;i++){
							_this.fileList.push(res.result[0].backfeed[i]);
						}
					}
				});
			},
			getParams(){
				this.params = this.$router.history.current.query;
			},
			loadBottom(){
				this.allLoaded = true;
				if(this.total >0 &&this.fileList.length <this.total){
					this.allLoaded = false;
					this.currentPage++;
					this.getFile();
				}
	        	this.$refs.loadmore.onBottomLoaded();
			},
			loadTop(){
				this.allLoaded = false;
				this.currentPage =1;
				this.fileList =[];
				this.getFile();
				this.$refs.loadmore.onTopLoaded();
			},
			toDetail(){
				this.ScollPostion();
				this.$router.push({name:"feedDetail",params:{back:"backfeed",top:document.getElementById("listContent").scrollTop}});
			},
			ScollPostion() {
			    this.t = document.getElementById("listContent").scrollTop;
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
</style>