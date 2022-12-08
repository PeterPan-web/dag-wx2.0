<template>
	<div>
    	<div :id="id" style="height:calc(100vh - 105px);overflow: auto;">
	    	<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" :top-method="loadTop">
				<ul style="width:100vw;margin:0 auto;overflow: auto;">
				    <li v-for="(item,index) in list" :key="index" @click="toDetail(item)" style="height:81px;margin:5px 0px;border-bottom: #ccc solid 1px;overflow: hidden;">
				    	<span class="listLeftCenter">
				    		<img v-if="item.PICTURE ==null"  style="display:none;margin-top:5px"/>
				    		<img v-else :src="com+item.PICTURE" style="margin-top:5px"/>
				    	</span>
			    		<span class="messageListCenter" style="height:78px;">
			    		<p class="centerTitle" style="white-space: nowrap;">{{item.TITLE}}</p>
			    		<p  style="text-align: left;">日期 ：{{item.PUBLISHDATE}}</p>
			    		<p  style="text-align: left;">审核状态 ：{{item.IS_VERIFY}}</p>
			    		<p class="centerContent" style="height:33px;overflow: hidden;text-overflow: ellipsis;">{{item.MAINWORD}}</p>
			    	</span>
				    </li>
				</ul>
			</mt-loadmore>
		</div>
	</div>
</template>

<script>
	export default{
		name:"centerSearch",
		props:["id","url","title"],
		data(){
			return{
				keyWord:"",
				allLoaded:false,
				list:[],
				total:0,
				currentPage:1,
				pageSize:15,
				com:HOST_SERVER,
				imgIcon:"static/img/common.jpg",
				height:$(window).height(),
				params:{},
				name:"",
				argument:{
					have:{

					},
					had:{

					},
					myArch:{

					}
				}
			}
		},
		activated(){
			var _this = this;
			window.onresize=function(){
				var curentHeight = $(window).height();
				if(curentHeight == _this.height){
					_this.setKeyBord();
				}else{
					_this.pushText();
				}
			}
			if(typeof(this.params.top) =="undefined"){
				this.searchFile();
			} else{
				document.getElementById(_this.id).scrollTop = this.params.top;
			}

		},
		methods:{
			pushText(ev){
				$(".mint-tabbar").css("display","none");
				$(".mint-tab-container").attr("style","height:calc(100vh - 50px);overflow:hidden");
				$("#"+this.id).attr("style","height:calc(100vh - 100px);overflow:auto");
			},
			setKeyBord(){
				$(".mint-tabbar").css("display","flex");
				$(".mint-tab-container").attr("style","height:calc(100vh - 105px);overflow:hidden");
				$("#"+this.id).attr("style","height:calc(100vh - 160px);overflow:auto");
			},
			toDetail(item){
				var _this = this;
				this.params.top = document.getElementById(_this.id).scrollTop;
				this.$router.push({path:"/haveDetail",query:{title:_this.title,argument:item}})
			},
			searchFile(){
				this.currentPage =1;
				this.list =[];
				$(".searchText").blur();
				this.getFile();
			},
			loadBottom(){
				this.allLoaded = true;
				if(this.total >0 &&this.list.length <this.total){
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
			getParams(){
				this.params = this.$router.history.current.query;
			},
			getFile(){
				var _this = this;
        var openId = JSON.parse(localStorage.getItem("ltjyopenId"))
				$.ajax({
					type:"post",
					url:_this.url,
					data:{
						key:_this.keyWord,
						openid:openId,
						currentPage:_this.currentPage,
						pageSize:_this.pageSize
					},
					dataType:"json",
					success:function(res){
						_this.total = res.result.count;
						_this.list.push.apply(_this.list,res.result.archives);
					}
				});
			}
		}
	}
</script>

<style>
	.search{
		margin-top:50px;
		height:50px;
		background:#D7D7D7;
		line-height:50px;
		text-align: left;
		margin:0 auto;
	}
	.searchText{
		width:72%;
		height:33px;
		margin-left:2%;
		padding-left:1%;
		border: none;
		border-radius: 4px;
	}
	.searchTitle{
		overflow: hidden;
		white-space:nowrap;
		font-size:15px;
		font-weight: 600;
	}
	.centerTitle,.centerContent{
		overflow: hidden;
		text-align: left;
		width:100%;
		text-overflow:ellipsis;
	}
	.searchContent{
		font-size:12px;
	}
	ul{
		list-style: none;
	}
	.btn{
		display:inline-block;
		width:22%;
		text-align: center;
	}
	.listLeftCenter{
		display: inline-block;
		width:50px;
		height:50px;
		vertical-align: top;
		margin-left:10px;
	}
	.listLeftCenter img{
		width:100%;
		height:100%;
	}
	.messageListCenter{
		display: inline-block;
		width:75vw;
		text-align: left;
		padding-left:2vw;
		font-size:13px;
	}

	.messageListCenter p{
		margin:3px 0px;
		width:100%;
		word-wrap: break-word;
  		word-break: break-all;
  		overflow: hidden;
	}
	.messageListCenter p:first-child{
		margin:0px 0px 3px 0px;
	}
</style>
