<template>
	<div>
		<headernav :title="title"></headernav>
		<div class="search" style="margin-top:40px">
    		<input  type="search" class="searchText" placeholder="请输入题名进行搜索" @keyup.enter ="searchFile" v-model="keyWord" @focus="pushText"/>
    		<div class="btn">
    			<mt-button size="small" slot="right" @click="searchFile">搜索</mt-button>
    		</div>

    	</div>
    	<div id="listContent">
	    	<mt-loadmore :bottom-method="loadBottom" :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
				<ul style="width:100vw;margin:0 auto;overflow: auto;">
				    <li v-for="item in list" @click="toDetail(item)" style="margin:10px 0px;border-bottom:#ccc solid 1px">
				    	<span class="mess">
				    		<p style="font-size:16px;font-weight: 600;">{{item.NAME}}</p>
				    		<p style="height:38px;overflow: hidden;line-height: 18px;font-size:14px">{{item.ADDRESS}}</p>
				    	</span>
				    </li>
				</ul>
			</mt-loadmore>
		</div>
	</div>
</template>

<script>
	import headernav from '../components/header.vue'
	export default{
		name:"nearSearch",
		data(){
			return{
				keyWord:"",
				allLoaded:false,
				title:"就近查档",
				url:NEAR_URL,
				list:[],
				saveList:[],
				total:0,
				currentPage:1,
				pageSize:15,
				params:{}
			}
		},
		created(){
			WeixinJSBridge.call('hideToolbar');
			WeixinJSBridge.call('hideOptionMenu');
		},
		activated(){
        	if(typeof(this.params.top) =="undefined"){
        		this.currentPage =1;
        		this.list=[];
        		this.total =0;
				this.getFile();
        	}else{
        		document.getElementById("listContent").scrollTop = this.params.top;
        	}
		},
		methods:{
			getParams(){
				this.params = this.$router.history.current.query;
			},
			pushText(){

			},
			toDetail(item){
				this.$router.push({path:"/nearSearchDetail",query:{argument:item}})
			},
			searchFile(){
				this.currentPage =1;
				this.list =[];
				$(".searchText").blur();
				this.getFile();
			},
			loadBottom(){
				this.allLoaded = true;
				if(this.total > 0 &&this.list.length < this.total){
					this.allLoaded = false;
					this.currentPage++;
					this.getFile();
				}
				this.$refs.loadmore.onBottomLoaded();

			},
			loadTop(){
				this.allLoaded = false;
				this.$refs.loadmore.onTopLoaded();
				this.currentPage =1;
				this.list =[];
				this.getFile();
			},
			getFile(){
				var _this = this;
				$.ajax({
					type:"post",
					url:_this.url,
					data:{
						key:_this.keyWord,
						currentPage:_this.currentPage,
						pageSize:_this.pageSize
					},
					dataType:"json",
					success:function(res){
						_this.total = res.result[0].total;
						_this.list.push.apply(_this.list,res.result[0].rows);

					}
				});
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
	ul{
		list-style: none;
	}
	.btn{
		display:inline-block;
		width:22%;
		text-align: center;
	}
	#listContent,#listContent1{
		height:calc(100vh - 100px);
		overflow:auto;
	}
	.mess{
		display: inline-block;
		width:95vw;
		text-align: left;
		padding-left:2vw;
		font-size:13px;
		height:68px;
		overflow:hidden;
	}

	.mess p{
		margin:3px 0px;
		width:100%;
		word-wrap: break-word;
  		word-break: break-all;
  		overflow: hidden;
	}
	.mess p:first-child{
		margin:0px 0px 3px 0px;
	}
  .search{
    display: flex;
    align-items: center;
  }
</style>
