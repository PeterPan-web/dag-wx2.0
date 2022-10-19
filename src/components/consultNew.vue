<template>
	<div>
    	<div id="listContent">
	    	<mt-loadmore :bottom-method="loadBottom" :top-method="loadTop" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
				<ul style="width:100vw;margin:0 auto;overflow: auto;">
					<li v-for="item in list">
						<div  class="a1" >
							<p class="message" >{{item.TITLE}}</p>
						</div>
						<div class="a2">
							<div class="a2-1">
								<span class="left">
									<img  v-if ="item.PICTURE ==null" :src="item.PICTURE" style="display:none"/>
									<img  v-else :src="com+item.PICTURE"/>
								</span>
							</div>
							<div class="a2-2">
								<p style="font-size:12px;">日期 ：{{item.PUBLISHDATE}}</p>
								<p style="font-size:12px;height:34px;overflow: hidden;line-height: 18px;">{{item.CONTENT}}</p></div>
							<div class="a2-3">
								<img  @click="toDetail(item)" src="static/img/xiao.png"  />
							</div>
						</div>	
					
					</li>
				</ul>
			</mt-loadmore>
		</div>
	</div>
</template>

<script>
	import Bus from '../components/bus.js'
	export default{
		name:"consultSearch",
		props:["name","ps"],
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
				params:{},
				url:"static/img/xiao.png"
			}
		},
		created(){
			this.getFile();
			var _this = this;
			Bus.$on("search",(curName,key)=>{
				if(curName ==_this.name){
					_this.keyWord = key;
					_this.currentPage =1;
					_this.list =[];
					_this.getFile();
				}
			});

		},
		activated(){
        	if(typeof(this.params.top) =="undefined"){
        		this.currentPage =1;
				this.list =[];
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
				if(this.ps.mark ==1){
					this.$router.push({path:"/showDetail",query:{argument:item}})
				}else{
					this.$router.push({path:"/consultDetail",query:{argument:item}})
				}

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
						informationType:_this.name,
						type:"1"
					},
					dataType:"json",
					success:function(res){
						_this.total = res.result[0].count;
						_this.list.push.apply(_this.list,res.result[0].searchInfo)
					}
				});
			}
		}
	}
</script>

<style>
	.a1{
		vertical-align:top;
		
		width:100%;
		height:30%;
	}
	.a2{
		vertical-align:bottom;
		
		height:70%;

	}
	.a2-1{
		
        position:flex;
		flex-direction:row;
		width:25%;
		
		height:100%;
		display:inline-block;
		vertical-align:bottom;
	}
	.left{
		
		display:inline-block;
		width:70px;
		height:70px;
		
		padding:0px;
		
		
	}
	.left img{
		width:100%;
		height:100%;
	}
	.a2-2{
		position:flex;
		flex-direction:row;
		width:60%;
		
		height:100%;
		display:inline-block;
		vertical-align:bottom;
	}
	.a2-3{
		vertical-align:bottom;
		position:flex;
		flex-direction:row;
		width:10%;
		
		height:100%;
		display:inline-block;
		
		
	}
	.a2-3 img{
		padding:15px 0px;
		width:25px;
		height:25px;
	}
	#listContent{
		height:calc(100vh - 309px);
		overflow: auto;
		background-color:Gainsboro;
		
	}
	.message{
		display: inline-block;
		text-align: center;
		font-size:20px;
	
	}
	
	li{
		height:120px;
		margin:15px 15px;
		background-color:white;

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
	
</style>
