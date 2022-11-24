<template>
	<div style="width:100%;text-align: center;">
		<p @click="showActions" class="bottomFrom" style="width:80vw;">请输入评论</p>
		<mt-popup
		  v-model="popupVisible"
		  position="bottom"
		  style="width:100%"
		  >
		  <div class="center">
		  <mt-button size="small" style="right:30px" @click="hidePop">取消</mt-button>
		  <mt-button size="small" style="left:30px" @click="submit">确定</mt-button>
		  </div>
		  <textarea placeholder="请输入评论" @focusin="change"  @blur ="clear" type="textarea" rows="5" id ="mainTxt" style="" v-model="content"></textarea>
		</mt-popup>
	</div>
</template>

<script>
import { Judgelogin } from "../utils/index";
	export default{
		name:"bottom",
		props:["list"],
    mounted(){
     Judgelogin()
    },
		data(){
			return{
				popupVisible:false,
        openid:'',
				content:"",
				interval:null,
				bfscrolltop:document.body.scrollTop
			}
		},
		methods:{
      getcode(){

      }


,
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
				this.popupVisible = false;
				var _this = this;
				if(_this.content ==""){
					_this.$toast("评论不能为空");
					return;
				}
        let openid= JSON.parse(localStorage.getItem("openId"))
				_this.list.ps.commentInfo = _this.content;
				_this.list.ps.openid = openid;
        console.log(_this.list.ps);
				$.ajax({
					type:"post",
					url:_this.list.addComment,
					data:_this.list.ps,
					dataType:"json",
					success:function(res){
						if(res.success){
						 if(res.result[0].loginS==0){
              _this.$toast("请关注公众号");
              return;
             }
							if(res.result[0].msg ==1){
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
_this.openid=JSON.parse(localStorage.getItem("openId"))
				_this.list.ps.openid = _this.openid;
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
							$("#mainTxt").trigger("click");
    						$("#mainTxt").trigger("focus");
						}
					}
				});
			},
		}
	}
</script>

<style>
	.bottomFrom{
		display: inline-block;
		text-align: left;
		background:#D7D7D7;
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
/*	.iconC{
		background:url(../assets/collection.png);
		background-size:100% 100%;
	}
	.iconT{
		background:url(../assets/tip.png);
		background-size:100% 100%;
	}
	.iconM{
		position: relative;
		background:url(../assets/evalute.png);
		background-size:100% 100%;
	}*/
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
