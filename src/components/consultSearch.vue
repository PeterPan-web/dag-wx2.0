<template>
	<div>
		<div class="search">
    		<input  type="search" class="searchText" placeholder="请输入题名进行搜索" @keyup.enter ="searchFile" v-model="keyWord" @focus="pushText"/>
    		<div class="btn">
    			<mt-button size="small" slot="right" @click="searchFile">搜索</mt-button>
    		</div>

    	</div>
    	<div id="listContent">
	    	<mt-loadmore :bottom-method="loadBottom" :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
				<ul style="width:100vw;margin:0 auto;overflow: auto;">
<<<<<<< HEAD
				    <li v-for="(item,index) in list" :key="index" @click="toDetail(item)" style="margin:10px 0px;border-bottom:#ccc solid 1px ;background:white;">
=======
				    <li v-for="item in list" @click="toDetail(item)" style="margin:10px 10px;border-bottom:#ccc solid 1px">
>>>>>>> 06ee563b0651b9860474fa93c0190af15ced1840
				    	<span class="Left">
				    		<img v-if ="item.PICTURE ==null" style="display: false;"/>
				    		<img v-else :src="com+item.PICTURE"/>
				    	</span>
				    	<span class="Left1">
				    		<p style="font-size:20px;width:calc(100vw - 100px);overflow:auto;white-space: nowrap;text-overflow:ellipsis;">{{item.TITLE}}</p>
				    		<p>日期 ：{{item.PUBLISHDATE}}</p>
				    		<p style="height:34px;overflow: hidden;line-height: 18px;">{{item.CONTENT}}</p>
				    	</span>
				    </li>
				</ul>
			</mt-loadmore>
		</div>
	</div>
</template>

<script>
	export default{
		name:"consultSearch",
		props:["ps"],
		data(){
			return{
				keyWord:"",
				allLoaded:false,
				list:[],
				saveList:[],
				imgIcon:"static/img/common.jpg",
				total:0,
				currentPage:1,
				pageSize:15,
				com:HOST_HOME,
				params:{}
			}
		},
		created(){
			/*this.getFile();*/
		},
		activated(){
			var _this = this;
			if(typeof (this.params.top)=="undefined"){
				this.fileList =[];
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
				this.params.top = document.getElementById("listContent").scrollTop;
				this.$router.push({path:"/openDetail",query:{argument:item}})

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
					url:_this.ps.url,
					data:{
						key:_this.keyWord,
						currentPage:_this.currentPage,
						pageSize:_this.pageSize,
						type:"1"
					},
					dataType:"json",
					success:function(res){
						console.log(res)
						_this.total = res.result[0].count;
						if(typeof(res.result[0].files) =="undefined"){
							for(var i=0;i<res.result[0].info.length;i++){
								_this.list.push(res.result[0].info[i]);
							}
						}else{
							for(var i=0;i<res.result[0].files.length;i++){
								_this.list.push(res.result[0].files[i]);
							}
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
		height:calc(100vh - 95px);
		overflow:auto;
	}
	.Left{
		position:flex;
		flex-direction:row;
		display: inline-block;
		width:71px;
		height:71px;
		vertical-align:left;
		
	}
	.Left img{
		width:100%;
		height:100%;
		
	}
	.Left1{
		position:flex;
		flex-direction:row;
		display: inline-block;
		width:300px;
		height:100px;
		vertical-align:left;
		
		background-color:	Gainsboro;
		margin-bottom:10px;
		box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.5);
	}
/*	.message{
		position:flex;
		flex-direction:row;
		display: inline-block;
		width:35px;
		text-align: center;
		padding-left:2vw;
		font-size:13px;
		height:78px;
		overflow:hidden;
		
		
	}

	.message p{
		margin:3px 0px;
		width:100%;
  		overflow: hidden;
	}
	.message p:first-child{
		margin:0px 0px 3px 0px;
	}*/
  .search{
    display: flex;
    align-items: center;
  }
</style>
