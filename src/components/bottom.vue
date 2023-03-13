<template>
	<div style="width:100%;text-align: center;">
		<p @click="showActions" class="bottomFrom" style="width:60%">请输入评论</p>
		<span class="iconM">
			<img src="../assets/evalute.png"/>
			<span class="num">
				{{total}}
			</span>
		</span>
		<span class="iconT" @click="tip"><img :src="tPath.path"/></span>
		<span class="iconC" @click="collect"><img :src="cPath.path"/></span>
		<mt-popup
		  v-model="popupVisible"
		  position="bottom"
		  style="width:100%"
		  >
		  <div class="center" style="">
		  <mt-button size="small" style="right:30px" @click="hidePop">取消</mt-button>
		  <mt-button size="small" style="left:30px" @click="submit">确定</mt-button>
		  </div>
		  <textarea placeholder="请输入评论" @focusin="change"  @blur ="clear" id="mainTxt" type="textarea" rows="5" style="height:160px;" v-model="content"></textarea>
		</mt-popup>
	</div>
</template>

<script>
	import Bus from './bus.js'
	export default{
		name:"bottom",
		props:["list"],
		data(){
			return{
        openId:"",
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
				}
			}
		},
		created(){
      	this.openId = localStorage.getItem("yjqopenId");
    			this.getCollect();
    			this.getPraise();
    		},
		mounted(){
			var _this = this;
			Bus.$on("msg",(total,p,c) =>{
				_this.total = total;
				if(p==1){
					_this.tPath.path ="static/img/tip_after.png"
				}else{
					_this.tPath.path ="static/img/tip.png"
				}
				if(c==1){
					_this.cPath.path ="static/img/collection_after.png"
				}else{
					_this.cPath.path ="static/img/collection.png"
				}
			});
		},
		methods:{
			showActions(){
				this.isStop();
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
				_this.list.ps.openid = _this.openId;
				_this.list.ps.criticismInfo =_this.content;
				$.ajax({
					type:"post",
					url:_this.list.commentUrl,
					data:_this.list.ps,
					success:function(res){
					if(res.result[0].status ==1){
            _this.$toast("你已经被禁言，请联系系统管理员");
            return;
          }
						if(res.success){
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
				_this.list.ps.openid = _this.openId;
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
							document.getElementById('mainTxt').focus();
						}
					}
				});
			},
			tip(){
				var _this = this;
				_this.list.ps.openid = _this.openId;
				$.ajax({
					type:"post",
					url:_this.list.praiseUrl,
					data:_this.list.ps,
					dataType:"json",
					success:function(res){
						if(res.success){
							if(res.result.success ==1){
								_this.$toast("点赞成功");
								_this.tPath.path ="static/img/tip_after.png";
								Bus.$emit("getTotal",res.result.count);
							}
							if(res.result.success ==0){
								_this.$toast("取消点赞");
								_this.tPath.path ="static/img/tip.png";
								Bus.$emit("getTotal",res.result.count);
							}
							if(res.result.success ==2){
								_this.$toast("点赞失败");
							}
						}
					}
				});
			},
			collect(){
				var _this = this;
				_this.list.ps.openid = _this.openId;
				$.ajax({
					type:"post",
					url:_this.list.collectionUrl,
					data:_this.list.ps,
					dataType:"json",
					success:function(res){
						if(res.success){
							if(res.result.msg ==1){
								_this.$toast("收藏成功");
								_this.cPath.path ="static/img/collection_after.png";
							}
							if(res.result.msg ==0){
								_this.$toast("取消收藏");
								_this.cPath.path ="static/img/collection.png";
							}
							if(res.result.msg ==2){
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
            if(res.success){
              if(res.result[0].msg==1){
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
            if(res.success){
              Bus.$emit("praise",res.result[0].count);
              if(res.result[0].msg==1){
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
	.iconC,.iconM,.iconT{
		display: inline-block;
		width:25px;
		height:25px;
		vertical-align: middle;
	}
	.iconM{
		position: relative;
	}
	.iconM img,.iconC img,.iconT img{
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
	#mainTxt{
		width:100%;
		border:none;
		outline:none;
		/*border-top:1px solid #ccc;*/
		height:160px;
		font-size:14px;
	}
</style>
