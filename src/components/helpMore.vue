<template>
	<div>
		<mt-loadmore :bottom-method="loadBottom"  :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
			<ul>
			    <li v-for="item in fileList" style="padding:6px 0px;border-bottom:1px solid #ccc">
			    	<span class="loadLeft">
			    		<img v-if ="item.PICTURE ==null":src="comPath" style="border-radius: 15px;"/>
			    		<img v-else :src="item.PICTURE" style="border-radius: 15px;"/>
			    	</span>
			    	<span class="messageLoad">
			    		<p>{{item.USER_NAME}}</p>
			    		<p>{{item.COMMENTINFO}}</p>
			    		<p>{{item.COMMENTDATE | capitalize}}</p>
			    	</span>
			    </li>
			</ul>
		</mt-loadmore>
	</div>
</template>

<script>
	import Bus from './bus.js'
	export default{
		name:"helpMore",
		props:["argument","url"],
		data(){
			return{
				fileList:[],
				files:[],
				total:0,
				id:"",
				allLoaded:false,
				currentPage:1,
				pageSize:15,
				com:HOST_HOME,
				comPath:"static/img/photo_user.jpg"
			}
		},
		filters: {
            capitalize: function (value) {
            	var t = new Date(value).getTime();
            	var cur = new Date().getTime();
            	var data = cur -t;
            	if(data/1000/60 <=3){
            		return "刚刚";
            	}else if(data/1000/60 <=30){
            		return "半小时前"
            	}else if(data/1000/60 < 60){
            		return "1小时前";
            	}else if(data/1000/60/60 <24){
            		return parseInt(data/1000/60/60)+"小时前";
            	}else{
            		return value;
            	}
            }
       	},
		mounted(){
			this.id =  this.argument.ID;
			this.getFile();
		},
		methods:{
			loadBottom(){
				this.allLoaded = true;
				if(this.total >0 &&this.fileList.length <this.total){
					this.allLoaded = false;
					this.currentPage++;
					this.getFile();
				}
				this.$refs.loadmore.onBottomLoaded();
				
			},
			getFile(){
				var _this = this;
				$.ajax({
					type:"post",
					url:_this.url,
					data:{
						id:_this.id,
						currentPage:_this.currentPage,
						pageSize:_this.pageSize
					},
					dataType:"json",
					success:function(res){
						_this.total = res.result[0].count;
						for(var i=0;i<res.result[0].comment.length;i++){
							_this.fileList.push(res.result[0].comment[i]);
						}
					}
				});
			}
		}
	}
</script>

<style>
	.loadLeft{
		display: inline-block;
		width:30px;
		height:30px;
		vertical-align: top;
	}
	.loadLeft img{
		width:100%;
		height:100%;
	}
	.messageLoad{
		display: inline-block;
		width:75vw;
		text-align: left;
		padding-left:2vw;
		font-size:13px;
	}
	
	.messageLoad p{
		margin:3px 0px;
		width:100%;
		word-wrap: break-word;
  		word-break: break-all;
  		overflow: hidden;
	}
	.messageLoad p:first-child{
		margin:0px 0px 3px 0px;
	}
</style>