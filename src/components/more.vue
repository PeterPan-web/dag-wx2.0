<template>
	<div>
		<mt-loadmore :bottom-method="loadBottom"  :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
			<ul>
			    <li v-for="(item,index) in fileList" :key="index" style="padding-top:10px;border-bottom:1px solid #ccc">
			    	<span class="loadLeft">
			    		<img v-if="item.PICTURE ==null" :src="comPath" style="border-radius: 15px;"/>
			    		<img v-else :src="item.PICTURE" style="border-radius: 15px;"/>
			    	</span>
			    	<span class="messageLoad">
			    		<p>{{item.USER_NAME}}</p>
			    		<p>{{item.CRITICISMINFO}}</p>
			    		<p>{{item.CRITICISMDATE | capitalize}}</p>
			    	</span>
			    </li>
			</ul>
		</mt-loadmore>
	</div>
</template>

<script>
	import Bus from './bus.js'
	export default{
		name:"more",
		props:["argument","url","getComment"],
		data(){
			return{
				fileList:[],
				total:0,
				id:"",
				currentPage:1,
				pageSize:15,
				optionName:"",
				allLoaded:false,
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
			this.optionName = this.argument.INFORMATIONTYPE;
      this.getFile();
		},
		methods:{
			loadBottom(){
				this.allLoaded = true;
				if(this.total >0 &&this.fileList.length <this.total){
					this.allLoaded = false;
					this.currePage++;
					this.getMore();
				}
				this.$refs.loadmore.onBottomLoaded();
				
			},
			loadTop(){
				this.allLoaded = false;
				this.currePage=1;
				this.fileList =[];
				this.getMore();
				this.$refs.loadmore.onTopLoaded();
			},
			getFile(){
        var openid = JSON.parse(localStorage.getItem("openId"));
				var _this = this;
				$.ajax({
					type:"post",
					url:_this.url,
					data:{
						openid:openid,
						id:_this.id,
						informationType:_this.optionName
					},
					dataType:"json",
					success:function(res){
            console.log(res);
						_this.total = res.result[0].criticismCount;
						_this.fileList = res.result[0].criticism;
						Bus.$emit("msg",_this.total);
						Bus.$emit("getRead",res.result[0].count);
						Bus.$emit("getTotal",res.result[0].praiseCount);
						Bus.$emit("getStatus",res.result[0].c,res.result[0].p);
					}
				});
			},
			getMore(){
				var _this = this;
				var openid = JSON.parse(localStorage.getItem("openId"));
				$.ajax({
					type:"post",
					url:_this.getComment,
					data:{
						id:_this.id,
						openid:openid,
						currentPage:_this.currentPage,
						pageSize:_this.pageSize
					},
					dataType:"json",
					success:function(res){
            console.log(res);
						_this.total = res.result[0].count;
						_this.fileList.push.apply(_this.fileList,res.result[0].criticism);
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