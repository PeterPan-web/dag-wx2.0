<template>
	<div>
		<headernav :title="title" ></headernav>
		<div class="search" style="margin-top:50px;display: flex;align-items: center">
    		<input  type="search" class="searchText" placeholder="请输入关键字" v-model="keyWord" @keyup.enter ="searchFile" />
    		<div class="btn">
    			<mt-button style="line-height: 33px" size="small" slot="right" @click="searchFile">搜索</mt-button>
    		</div>

    	</div>
    	<div id="listContent">
    		<mt-loadmore :bottom-method="loadBottom"  :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
				<ul>
				    <li v-for="(item,index) in fileList" :key="index" @click ="toDetail(item)" class="items">
				    	<span class="mainTitle">{{item.CONTENT}}</span>
				    	<span class="mainTitle1">浏览{{item.BROWSE}}</span>
				    	<span class="time">{{item.CREATEDATE}}</span>
				    </li>
				</ul>
			  </mt-loadmore>
        <mt-button @click="toWrite()" type="primary" size="large" style="position:fixed;bottom:0;width:100%;margin:10px 0%">我要留言咨询</mt-button>
      </div>
  </div>
</template>

<script>
	import headernav from '../components/writeMessage.vue'
	export default{
		name:"backfeed",
		data(){
			return{
				path:"/interaction",
				title:"留言咨询",
				keyWord:"",
				t:"",
				url:FEED_URL,
				fileList:[],
				total:0,
				currentPage:1,
				pageSize:15,
				params:{},
				allLoaded:false
			}
		},
		activated(){
			var _this = this;
			if(typeof(this.params.top)=="undefined"){
				this.fileList =[];
				this.getFile();
			}else{
				document.getElementById("listContent").scrollTop = this.params.top;
			}
		},
		methods:{
			searchFile(){
				var _this = this;
				this.currentPage =1;
				this.fileList =[];
				$(".searchText").blur();
				this.getFile();
			},
			getFile(){
				var _this = this;
				var openId = localStorage.getItem("openId");
				$.ajax({
					type:"post",
					url:_this.url,
					data:{
						key:_this.keyWord,
						// openid:openId,
						currentPage:_this.currentPage,
						pageSize:_this.pageSize
					},
					dataType:"json",
					success:function(res){
						_this.total = res.result[0].count;
						_this.fileList.push.apply(_this.fileList,res.result[0].backfeed);
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
			toDetail(item){
				this.params.top = document.getElementById("listContent").scrollTop;
				this.$router.push({path:"/feedDetail",query:{argument:item}});
			},
      toWrite(){
        this.$router.push({path:"/write"});
      },
		},
		components:{headernav}
	}
</script>

<style>
	.main{
		height: calc(100vh - 40px);
		overflow: auto;
		margin-top:50px;
	}
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
	.searchTitle,.searchContent{
		text-align: left;
		width:100%;
		text-overflow:ellipsis;
		margin:5px 0px;
	}
	.searchContent{
		font-size:12px;
	}
	.btn{
		display:inline-block;
		width:22%;
		text-align: center;
	}
	#listContent{
		height:calc(100vh - 10px);
    overflow: auto;
	
	}
	.mainTitle{
		display: inline-block;
		width:50vw;
		overflow: hidden;
		text-align: left;
		white-space:nowrap;
		text-overflow:ellipsis;
		font-size:13px;
	}
	.mainTitle1{
  		width:50vw;
  		text-align: center;
  		white-space:nowrap;
  		font-size:10px;
  		color:#828080;
  	}
	.time{
		display: inline-block;
		width:35vw;
		text-align: right;
		font-size:13px;
	}
  .items{
    height: 30px;
    font-size: 17px;
    padding:15px 0px 15px 0px;
    border-bottom:1px solid #ccc
  }
</style>
