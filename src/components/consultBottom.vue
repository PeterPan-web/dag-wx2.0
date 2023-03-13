<template>
	<div style="width:100%;text-align: center;">
		<p @click="showActions" class="bottomFrom" style="width:55%">请输入评论</p>
    <span class="iconM">
			<img src="../assets/evalute.png"/>
			<span class="num">    
				{{total}}
			</span>
		</span>  
    <!-- 点赞 -->
		<span class="iconT" @click="tip"><img :src="tPath.path"/></span>
    <!-- 收藏 -->
		<span class="iconC" @click="collect"><img :src="cPath.path"/></span>
		<span class="iconS" @click="toAccu"><img :src="sPath.path"/></span>
		<mt-popup
		  v-model="popupVisible"
		  position="bottom"
		  style="width:100%"
		  >
		  <div class="center">
		  <mt-button size="small" style="right:30px" @click="hidePop">取消</mt-button>
		  <mt-button size="small" style="left:30px" @click="submit">确定</mt-button>
		  </div>
		  <mt-field placeholder="请输入评论" @focusin="change"  @blur ="clear" id="mainTxt" type="textarea" rows="5" style="height:160px;" v-model="content"></mt-field>
		</mt-popup>
	</div>
</template>

<script>
import {Judgelogin } from "../utils/index";
	import Bus from './bus.js'
	export default{
		name:"bottom",
		props:["list"],
		data(){
			return{
        // 评论
        Remark:false,
        loginId:'',
				popupVisible:false,
				content:"",
				total:0,
				interval:null,
				bfscrolltop:document.body.scrollTop,
				tPath:{
					status:false,
					path:"static/img/tip.png"
				},
				cPath:{
					status:false,
					path:"static/img/collection.png"
				},
				sPath:{
					status:true,
					path:"static/img/consultS.png"
				}
			}
		},
		created(){
      
			this.getCollect();
			this.getPraise();
		},
		mounted(){
			var _this = this;
			Bus.$on("msg",(total) =>{
				_this.total = total;
			});

			Bus.$on("getStatus",(c,p) =>{
				if(c=="1"){
					_this.cPath.path ="static/img/collection_after.png";
				}
				if(p=="1"){
					_this.tPath.path ="static/img/tip_after.png";
				}
			});
		},
		methods:{
      //读取本地记录
			toAccu(){
				var _this = this;
				_this.$router.push({
					path: "/addReason",
					query: { id:_this.list.ps.id ,TABLENAME:_this.list.ps.TABLENAME},
				});
			},
			showActions(){
        if (JSON.parse(localStorage.getItem("yjqopenId"))==null) {
          Judgelogin();
        }else{
         this.isStop(); 
        }
			},
			hidePop(){
				this.popupVisible = false;
			},
			change(){
				this.interval = setInterval(function(){
		        	document.body.scrollTop = document.body.scrollHeight;
		        },20);
			},
			clear(){
				var _this = this;
				clearInterval(_this.interval);
        		document.body.scrollTop = this.bfscrolltop;
			},
			submit(){
				var _this = this;
				this.popupVisible = false;
				_this.list.ps.criticismInfo =_this.content;
				_this.list.ps.openid =JSON.parse(localStorage.getItem("yjqopenId"));
				$.ajax({
					type:"post",
					url:_this.list.commentUrl,
					data:_this.list.ps,
					success:function(res){
            console.log(res);
						if(res.result[0].status ==1){
							_this.$toast("你已经被禁言，请联系系统管理员");
							return;
						}
						if(res.success){
						  if(res.result[0].loginS==0){
                _this.$toast("请先登陆");
                return;
						  }
							if(res.result[0].msg==1){
								_this.$toast("发表成功");
								_this.content ="";
							}else if(res.result[0].msg==0){
							  _this.$toast("请勿输入非法字符");
							}else if(res.result[0].msg==3){
               	_this.$toast("评论不能为空");
              }
						}
					}
				});
			},
			isStop(){
				var _this = this;
				this.popupVisible = false;
				_this.list.ps.openid = JSON.parse(localStorage.getItem("yjqopenId"));
				$.ajax({
					type:"post",
					url:_this.list.forBidden,
					data:_this.list.ps,
					success:function(res){
						if(res.success){
							if(res.result[0].status ==1){
								_this.$toast("你已经被禁言，请联系系统管理员");
								return;
							}
							_this.popupVisible = true;
							_this.content = "";
							document.getElementById('mainTxt').click();
						}
					}
				});
			},
			tip(){
        Judgelogin();
				var _this = this;
				_this.list.ps.openid =JSON.parse(localStorage.getItem("yjqopenId"));
				$.ajax({
					type:"post",
					url:_this.list.praiseUrl,
					data:_this.list.ps,
					dataType:"json",
					success:function(res){
            console.log(res);
						if(res.success){
						  if(res.result[0].loginS==0){
							_this.$toast("请先登陆");
							return;
						}
							if(res.result[0].success ==1){
								_this.$toast("点赞成功");
								_this.tPath.path ="static/img/tip_after.png";
								Bus.$emit("getTotal",res.result[0].count);
							}
							if(res.result[0].success ==0){
								_this.$toast("取消点赞");
								_this.tPath.path ="static/img/tip.png";
								Bus.$emit("getTotal",res.result[0].count);
							}
							if(res.result[0].success ==2){
								_this.$toast("点赞失败");
							}
						}
					}
				});
			},
			collect(){
        Judgelogin();
				var _this = this;
				_this.list.ps.openid =JSON.parse(localStorage.getItem("yjqopenId"));
				$.ajax({
					type:"post",
					url:_this.list.collectionUrl,
					data:_this.list.ps,
					dataType:"json",
					success:function(res){
            console.log(res);
						if(res.success){
						  if(res.result[0].loginS==0){
                _this.$toast("请先登陆");
                return;
              }
							if(res.result[0].success ==1){
								_this.$toast("收藏成功");
								_this.cPath.path ="static/img/collection_after.png";
							}
							if(res.result[0].success ==0){
								_this.$toast("取消收藏");
								_this.cPath.path ="static/img/collection.png";
							}
							if(res.result[0].success ==2){
								_this.$toast("收藏失败");
							}
						}
					}
				});
			},
			getCollect(){
				var _this = this;
				$.ajax({
					type:"post",
					url:_this.list.isCollectUrl,
					data:_this.list.ps,
					dataType:"json",
					success:function(res){
            console.log(res);
						if(res.success){
							if(res.result[0].status==1){
								_this.cPath.path ="static/img/collection_after.png"
							}
						}
					}
				});
			},
			getPraise(){
				var _this = this;
				$.ajax({
					type:"post",
					url:_this.list.isPraiseUrl,
					data:_this.list.ps,
					dataType:"json",
					success:function(res){
            console.log(res);
						if(res.success){
							Bus.$emit("getRead",res.result[0].count);
							if(res.result[0].status==1){
								_this.tPath.path ="static/img/tip_after.png";
							}
						}
					}
				});
			}
		}
	}
</script>

<style>
	.bottomFrom{
		display: inline-block;
		width:60%;
		text-align: left;
		background:#D7D7D7;
		margin:5px 0px;
		margin-left:2%;
		padding:5px 10px;
		border-radius: 10px;
	}
	.center{
		margin:5px 0px;
	}
	.iconC,.iconM,.iconT,.iconS{
		display: inline-block;
		width: 7%;
		height:25px;
		vertical-align: middle;
	}
	.iconM{
		position: relative;
	}
	.iconM img,.iconC img,.iconT img,.iconS img{
		width:100%;
	}
	.num{
		font-size:12px;
		color:#fff;
		display:inline-block;
		background:red;
		width:15px;
		height:15px;
		border-radius: 50%;
		position:absolute;
		right:-3px;
		top:-2px;
	}
	.mint-cell-wrapper{
		padding:0px!important;
	}
  .Remark{
    position: fixed;
    bottom: 0px;
    height: 30%;
    width: 100%;
    background-color: white;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  .Remarkicon{
        padding: 4px;
				border-radius: 50%;
        width: 20px;
        height: 20px;
        position: absolute;
        right: 5px;
        top: 5px;
  }
</style>
