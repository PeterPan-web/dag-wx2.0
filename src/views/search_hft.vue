<template>
	<div>
		<headernav :title="title" :show="show"></headernav>
		<div class="search" style="margin-top:50px;">
    		<div class="searchLeft">
    			<input  style="width:97%;padding-left:3%" type="search" class="searchText" placeholder="请输入关键字" @keyup.enter ="searchFile" v-model="keyWord" @focusin="pushText"/>
    		</div>

    		<div class="btn">
    			<mt-button size="small" slot="right" @click="searchFile">搜索</mt-button>
    		</div>
    	</div>
    		<div id="listContent">
    		<div v-if="focus">
		    	<mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
					<ul style="width:90vw;margin:0 auto;overflow: auto;">
					    <li v-for="item in list" @click="toDetail(item)" style="border-bottom:#ccc solid 1px;width:100%">
					    	<p class="searchTitle" >{{item.TITLE}}</p>
					    	<p class="searchContent" >{{item.ARCHNO}}&nbsp;&nbsp;{{item.FILEYEAR}}&nbsp;&nbsp;{{item.LIMITED}}</p>
					    </li>
					</ul>
				</mt-loadmore>
			</div>
			<div v-else>
				<div style="height:24px;line-height: 24px;margin-top:15px">
					<span class="his">历史记录</span>
					<span class="clear" @click="clearCode"></span>
				</div>
				<ul style="margin-top:30px;text-align:left;">
				    <li v-for="item1 in historyList" @click="toSearch(item1.TITLE)" style="display:inline-block">
				    	<span style="font-size:13px;display: inline-block;padding:3px 7px;background:#ddd;border-radius: 3px;margin:0px 15px 15px 15px">{{item1.TITLE}}</span>
				    </li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import headernav from '../components/header_hft.vue'
	export default{
		name:"index",
		data(){
			return{
				title:"档案检索",
				keyWord:"",
				list:[],
				historyList:[],
				allLoaded:false,
				currentPage:1,
				pageSize:15,
				total:0,
				focus:false,
				show:true,
				maKey:"",
				ticket:"",
				hft_id:"",
				params:{}
			}
		},
		activated(){
			WeixinJSBridge.call('hideToolbar');
			WeixinJSBridge.call('hideOptionMenu');
			if(typeof(this.params.top) =="undefined"){
				this.getHistory();
			}else{
				document.getElementById("listContent").scrollTop = this.params.top;
			}
		},
    created(){
    var _this=this;
    _this.maKey=this.$route.query.maKey;
    _this.ticket=this.$route.query.ticket;
    this.getHFTUserInfo();
    },
		methods:{
		  getHFTUserInfo(){
		     var _this=this;
		    $.ajax({
          type:"post",
          url:HFT_SEARCH_USER_URL,
          data:{
            maKey:_this.maKey,
            ticket:_this.ticket
          },
          dataType:"json",
          success:function(res){
           if(res.success){
           _this.hft_id=res.result.hftId;
           localStorage.setItem("hft_id",res.result.hftId);
           }
          }
        });
		  },
		  addHFTUserId(hft_id){
		  var _this=this;
		    $.ajax({
          type:"post",
          url:ADD_HFT_USERID_URL,
          data:{
            hft_id:hft_id,
          },
          dataType:"json",
          success:function(res){
          if(res.success){
            if(res.result.loginS==0){
              _this.$toast("请登录");
              return;
            }
            }
          }
        });
		  },
			loadBottom(){
        		this.allLoaded = true;
        		if(this.total > 0 && this.list.length < this.total){
        			this.allLoaded = false;
        			this.currentPage++;
        			this.commonGet();
        		}
	        	this.$refs.loadmore.onBottomLoaded();

			},
			searchFile(){
				this.list = [];
				this.focus = true;
				this.addHFTUserId(this.hft_id);
				$(".searchText").blur();
				this.commonGet();
			},
			commonGet(){
				var _this = this;
				var openId = localStorage.getItem("openId");
				$.ajax({
					type:"post",
					url:HFT_SEARCH_URL,
					data:{
						key:_this.keyWord,
						currentPage:_this.currentPage,
						hft_id:_this.hft_id,
						pageSize:_this.pageSize
					},
					dataType:"json",
					success:function(res){
            if(res.success){
              _this.total = res.result[0].count;
              _this.list.push.apply(_this.list,res.result[0].rows);
              _this.historyList = res.result[0].history;
            }
					}
				});
			},

			toDetail(item){
				this.params.top=document.getElementById("listContent").scrollTop;
				localStorage.setItem("argument",JSON.stringify(item));
				localStorage.setItem("mark",0);
				this.$router.push({path:"/archDetail_hft",query:{argument:item,mark:0}});
			},
			getParams(){
				this.params = this.$router.history.current.query;
			},
			pushText(){
				this.focus = false;
			},
			toSearch(title){
				this.keyWord = title;
				this.searchFile();
			},
			getHistory(){
				var _this = this;
				var openId = localStorage.getItem("openId");
				$.ajax({
	          		url: HISTORY_URL,
			        type: 'post',
			        data:{
			        	openid:openId
			        },
			        success: function (res) {
		            	_this.historyList=res.result[0].history;
			        },
			        error:function(status){
			        }
			   });
			},
			clearCode(){
				var _this = this;
				var openId = localStorage.getItem("openId");
				$.ajax({
					type:"post",
	          		url:CLEAR_URL,
	          		data:{
	          			openid:openId
	          		},
			        dataType: 'json',
			        success: function (res) {
		            	_this.historyList = [];
			        }
			   });
			},
			setColor(){
	        	var _this = this;
	        	var txt = this.txt;
	        	var newRegExp = new RegExp(_this.keyWord, 'gm');
				this.txt1 = txt.replace(newRegExp,"<span style='color:red'>"+_this.keyWord+"</span>");
			}
		},
		components:{
			headernav
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
	.searchLeft{
		width:72%;
		height:50px;
		margin-left:2%;
		padding-left:1%;
		display:inline-block;
	}
	.searchText{
		width:100%;
		height:33px;
		padding-left:2%;
		border: none;
		border-radius: 4px;
	}
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
	ul{
		list-style: none;
	}
	.btn{
		display:inline-block;
		width:22%;
		text-align: center;
	}
	#listContent{
		height:calc(100vh - 100px);
		overflow:auto;
	}
	.his{
		display:inline-block;
		font-size:14px;
		float:left;
		margin-left:10vw;
	}
	.clear{
		display:inline-block;
		width:20px;
		height:20px;
		background:url(../static/img/clear.jpg);
		background-size:100% 100%;
		float:right;
		margin-right:10vw;
		margin-top:2px;
	}
</style>
