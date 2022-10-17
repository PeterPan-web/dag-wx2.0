<template>
	<div id="container" style="height:calc(100vh - 50px);overflow: auto;">
		<mt-loadmore :bottom-method="loadBottom"  :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
			<ul>
			    <li v-for="item in imgList" @click="toDetail(item)" style="margin-top:15px;margin-bottom:15px;">
			      <p>{{item.TITLE}}</p>
			      <img v-lazy.container="commonUrl+item.PICTURE">
			      <!--<p>{{item.TITLE}}</p>-->
			      <!--<p>{{item.CONTENT}}</p>-->
			    </li>
			  </ul>
		</mt-loadmore>
	  
	</div>
</template>

<script>
	export default{
		name:"imgFile",
		props:["url"],
		data(){
			return{
				allLoaded:false,
				imgList:[],
				params:{},
				currentPage:1,
				commonUrl:HOST_SERVER,
				pageSize:15,
				total:0
			}
		},
		activated(){
			if(typeof(this.params.top) =="undefined"){
				this.getFile();
			}else{
				document.getElementById("container").scrollTop =this.params.top;
			}
		},
		methods:{
			loadBottom(){
				this.allLoaded = true;
				if(this.total > 0 && this.imgList.length < this.total){
					this.allLoaded = false;
					this.currenPage++;
					this.getFile();
				}
				this.$refs.loadmore.onBottomLoaded();
			},
			toDetail(item){
				this.params.top = document.getElementById("container").scrollTop;
				this.$router.push({path:"/showDetail",query:{top:document.getElementById("container").scrollTop,argument:item}});
			},
			getFile(){
				var _this = this;
				$.ajax({
					type:"post",
					url:_this.url,
					dataType:"json",
					data:{
						currentPage:_this.currentPage,
						pageSize:_this.pageSize
					},
					success:function(res){
						_this.total = res.result[0].count;
						for(var i =0;i<res.result[0].exhibition.length;i++){
							_this.imgList.push(res.result[0].exhibition[i]);
						}
					}
				});
			},
			getParams(){
				this.params = this.$router.history.current.query
			}
		}
	}
</script>

<style>
	img[lazy="loaded"] {
	  width:80vw;
	  height:20vh;
	  margin: auto;
	  margin-bottom:15px;
	}
</style>