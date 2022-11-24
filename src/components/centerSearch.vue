<template>
	<div>
		<div class="search">
    		<input  type="search" class="searchText" placeholder="请输入题名进行搜索" v-model="keyWord" @keyup.enter ="searchFile" @focusin="pushText($event)" @blur="setKeyBord"/>
    		<div class="btn">
    			<mt-button size="small" slot="right" @click="searchFile">搜索</mt-button>
    		</div>

    	</div>
    	<div :id="id" style="height:calc(100vh - 160px);overflow: auto;">
	    	<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" :top-method="loadTop">
				<ul style="width:100vw;margin:0 auto;overflow: auto;">
				    <li v-for="(item,index) in list" :key="index" @click="toDetail(item)" style="height:81px;margin:5px 0px;border-bottom: #ccc solid 1px;overflow: hidden;">
				    	<span class="listLeftCenter" style="margin-left:15px;">
				    		<img v-if ="item.PICTURE ==null" :src="item.PICTURE"/>
				    		<img v-else :src="com+item.PICTURE"/>
				    	</span>
			    		<span class="messageListCenter" style="height:78px;">
			    		<p class="centerTitle" style="text-align: center;">{{item.TITLE}}</p>
			    		<p style="text-align: center;">日期 ：{{item.PUBLISHDATE}}</p>
			    		<p class="centerContent" style="height: 33px;overflow: hidden;text-overflow: ellipsis;">{{item.HELPINFO}}</p>
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
				com:HOST_HOME,
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
    created(){
    },
		activated(){
			var _this = this;
			if(typeof(this.params.top) =="undefined"){
				this.searchFile();
				window.onresize=function(){
					var curentHeight = $(window).height();
					if(curentHeight == _this.height){
						_this.setKeyBord();
					}else{
						_this.pushText();
					}
				}
			}else{
				document.getElementById(_this.id).scrollTop = this.params.top;
			}
			 WeixinJSBridge.call('hideToolbar');
			 WeixinJSBridge.call('hideOptionMenu');
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
				this.$router.push({path:"/helpDetail",query:{title:_this.title,argument:item}})
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
        var openId = JSON.parse(localStorage.getItem("openId"))
				$.ajax({
					type:"post",
					url:_this.url,
					data:{
						key:_this.keyWord,
						 openid:openId,
						currentPage:_this.currentPage,
						pageSize:_this.pageSize
					},
					dataTypa:"json",
					success:function(res){
						_this.total = res.result[0].count;
						if(typeof(res.result[0].helpInfo) =="undefined"){
							_this.list.push.apply(_this.list,res.result[0].list);
						}else{
							_this.list.push.apply(_this.list,res.result[0].helpInfo);
						}
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
		width:100%;
		font-weight: 600;
	}
	.centerTitle,.centerContent{
		overflow: hidden;
		text-align: left;
		width:100%;
		text-overflow:ellipsis;
	}
	.centerTitle{
		font-size:16px;
		font-weight: 600;
		white-space: nowrap;
	}
	.centerContent{
		font-size:13px;
		margin-bottom:4px;
		letter-spacing:3px;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
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
	}
	.listLeftCenter img{
		width:100%;
		height:100%;
		margin-top:10px;
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
