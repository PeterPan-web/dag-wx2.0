<template>
	<div>
		<headernav :title="title" :up="up"></headernav>
		<div style="height: calc(100vh - 50px);overflow: auto;margin-top:45px;">
    <van-cell-group>
          <van-field v-model="username"
                     label="*姓名"
                     placeholder="请输入姓名" />
          <van-field v-model="phone"
                     label="*联系电话"
                     placeholder="请输入联系电话" />
                      <van-field v-model="email"
                     label="*电子邮箱"
                     placeholder="请输入电子邮箱" />
          <van-field v-model="address"
                     label="*联系地址"
                     placeholder="请输入联系地址" />
<van-field v-model="content"
id="content"
                     label="*咨询内容"
                      type="textarea" rows="5"
                     placeholder="说说你的看法..." 
                      style="border-bottom:1px solid #ccc;height:140px"/>
      </van-cell-group>
      <!-- <mt-field label="*姓名" placeholder="请输入姓名" v-model="username"></mt-field>
      <mt-field label="*联系电话" placeholder="请输入联系电话" v-model="phone"></mt-field>
      <mt-field label="电子邮箱" placeholder="请输入电子邮箱" v-model="email"></mt-field>
      <mt-field label="*联系地址" placeholder="请输入联系地址" v-model="address"></mt-field>
			<mt-field label="*咨询内容" id="content" placeholder="说说你的看法..." type="textarea" rows="5" v-model="content" style="border-bottom:1px solid #ccc;height:140px"></mt-field> -->
<!--			<uploadcomponent style="text-align: left;"></uploadcomponent>-->
      <div style="text-align: left">
<!--        <van-uploader result-type="dataUrl" v-model="list" multiple :max-count="6" />-->
      </div>
			<mt-switch v-model="value" style="margin-left:20px;margin-top:20px">{{isOpen}}</mt-switch>
			<!-- <span class="submitFlieBtn" @click="isStop">提交</span> -->
      <div class="writesubmitBtn"  @click="isStop">
                  提交
      </div>
		</div>

	</div>
</template>

<script>
import {readLocalStorage} from "../utils/index";
	import Bus from '../components/bus.js'
  import {Switch, Toast} from 'mint-ui';
	import { Indicator } from 'mint-ui';
	import headernav from '../components/header.vue'
	import uploadcomponent from '../components/uploadPic.vue'
	export default{
		name:"write",
		data(){
			return{
        content:'',
        username:'',
        phone:'',
        cardNo:'',
        address:'',
				title:"留言咨询",
				path:"/backfeed",
				dataBase:[],
				list:[],
				up:false,
				value:false,
				isOpen:"公开",
				status:0,
        email:'',
        ltjyloginId:''
			}
		},
		mounted(){
			var _this = this;
			this.content ="";
			Bus.$on("getList",(list) =>{
        console.log(list)
				_this.list =list;
			});
			mui.back = function() {
				if(_this.up){
					return;
				}
				_this.$router.back(-1);
			};
      this.readStorage()
		},
		watch:{
			value(newValue,oldValue){
					this.isOpen ="公开";
					if(newValue){
						this.isOpen ="隐私";
					}
			}
		},
		methods:{
      readStorage() {
      this.ltjyloginId = readLocalStorage();
      if (this.ltjyloginId!=='') {
       this.username = this.ltjyloginId.userRealName;
      this.phone = this.ltjyloginId.telephone; 
      }
    },

			isStop(){
				var _this = this;
				this.popupVisible = false;
				var openId = localStorage.getItem("ltjyopenId");
				$.ajax({
					type:"post",
					url:FORBIDDEN_URL,
					data:{
						openid:openId
					},
					success:function(res){
						if(res.success){
							if(res.result[0].status ==1){
								_this.$toast("你已经被禁言，请联系系统管理员");
								return;
							}
							_this.submitFile();
						}
					}
				});
			},
			submitFile(){
        console.log(this.list)
				var _this = this;
				var openId = localStorage.getItem("ltjyopenId");
        if(_this.username ==""){
          _this.$toast("申请人不能为空~");
          return;
        }
        if(_this.phone ==""){
          _this.$toast("联系电话不能为空~");
          return;
        }
        if(_this.phone.length != 11){
          Toast('联系电话必须为11位数');
          return false;
        }
				if(_this.content ==""){
					_this.$toast("说明内容不能为空");
					return;
				}
				if(_this.value){
						_this.status = 1;
				}
				$.ajax({
					type:"post",
					url:SUGGESTION_URL,
					data:{
						applicant:_this.username,
            phone:_this.phone,
            cardNo:_this.cardNo,
						address:_this.address,
						content:_this.content,
						opennessPrivacy:_this.status,
						imgStr:_this.list,
            email:_this.email,
					},
					beforeSend:function(){

						Indicator.open({
							text:"正在上传，请稍等...",
							spinnerType: 'fading-circle'
						});
						_this.up =true;
					},
					dataType:"json",
					success:function(res){
						if(res.success){
						// if(res.result[0].loginS==0){
            //   Indicator.close();
            //   _this.$toast("请关注公众号");
            //   return;
            //  }
						  Indicator.close();
							_this.up = false;
              _this.$toast("提交成功~");
              _this.title ="";
							_this.content ="";
							Bus.$emit("clear",1);
              _this.$router.go(-1);
						}else{
              _this.$toast("提交失败~");
            }
					},
          error:function (err) {
            _this.$toast("服务异常~");
          }
				});
			},
			getBase64Image(img) {
			    var canvas = document.createElement("canvas");   //创建canvas DOM元素，并设置其宽高和图片一样
				var width = img.width;
				var height = img.height;
				if (width > height) {
				    if (width > 1080) {
				        height = Math.round(height *= 1080 / width);
				        width = 1080;
				    }
				} else {
				    if (height > 1080) {
				        width = Math.round(width *=	1080 / height);
				        height = 1080;
				    }
				}
				canvas.width=width;
				canvas.height=height;
				var ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, width,height); //使用画布画图
				var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();  //动态截取图片的格式
				var dataURL = canvas.toDataURL("image/" + ext,1);
				//	//返回的是一串Base64编码的URL并指定格式
				return dataURL;
			}
		},
		components:{
			headernav,
			uploadcomponent
		}
	}
</script>

<style>
.writesubmitBtn{
		display: inline-block;
		padding:7px 50px;
		background:#169bd5;
		color:#fff;
		font-size:16px;
		border-radius: 5px;
		margin-top:40px;
		margin-bottom:30px;
}
  .mint-cell-title{
    text-align: left;
  }
  #content .mint-cell-wrapper{
    display: flex;
    align-items: self-start;
  }
</style>
