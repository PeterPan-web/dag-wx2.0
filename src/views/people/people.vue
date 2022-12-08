<template>
  <div class="loginPage">
    <headernav :title="title"></headernav>
    <!--登录后个人页面-->
        <div class="personal"
     v-if="this.loginId"
         >
<van-cell-group>
<van-cell title="头像" class="logotext">
  <van-image round class="logo"
                 width="3rem"
                 height="3rem"
                 :src="this.loginId.picture" />
</van-cell>
  <van-cell title="用户名" :value="this.loginId.userName" />
   <van-cell title="性别"
                  :value="this.loginId.gender" />
         <van-field v-model="this.loginId.userRealName"
                   label="真实姓名"
                   placeholder="请输入真实姓名"
                   />
                  <van-field v-model="this.loginId.cardNo"
                   label="身份证号码"
                   placeholder="请输入身份证号码"
                   />
        <van-field v-model="this.loginId.telephone"
                   label="手机号"
                   placeholder="请输入手机号"
                   />
        <van-field v-model="this.loginId.address"
                   label="住址"
                   placeholder="请输入地址"
                   />
</van-cell-group>
<div class="editbtn" @click="editpushinfo">
        <p>保存信息</p>
      </div>
</div>
  </div>
</template>

<script>
import  headernav  from "../../components/header.vue";
import {  postCode } from '../../http/api/user';
import { Toast } from 'mint-ui'
import {posteditinfo} from '../../http/api/user'
export default {
  name: "people",
  components:{
    headernav,
		},
  data() {
    return {
      title:'',
      code:'',
      openId:"",
      loginId:'',
// //弋江区档案馆
      // wxAppId: "wxa9d5243ac3ae61f2",
      // wxAppSecret: "3027ce3d1e52acacc9a270723af891e9",
      // http: "http://zt.whztsj.com/dist/index.html#/people",
// //兰台记忆
      // wxAppId: "wx3426368cce031df0",
      // wxAppSecret: "9b9ba314751829beec9efd5592c643d5",
      // http: "http://zt.whztsj.com/ltjy/index.html#/people",
//测试
      wxAppId: "wx09d4138d7b8a1252",
      wxAppSecret:"6b3f8994da0ff9f4bb02e74840ffc675",
      http:"http://127.0.0.1/#/people",
      // userinfo:"",
      // user1:'',
    };
  },
  created () {
    this.Judgelogin()
    },
 methods: {
//判断是否登陆
    Judgelogin() {
      this.code = this.getUrlCode().code // 截取code
      if (this.code == null || this.code === '') {
        // 如果没有code，则去请求
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
          this.wxAppId
        }&redirect_uri=${encodeURIComponent(
          this.http
        )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
      } else {
        // 当code不等于空时，调用后端接口获取用户信息
        this.readStorage()
        //this.getaccessToken(this.code)
      }
    },
    // 从url中获取code返回
    getUrlCode() {
      // 截取url中的code方法
      var url = location.search
      this.winUrl = url
      var theRequest = new Object()
      if (url.indexOf('?') != -1) {
        var str = url.substr(1)
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
        }
      }
      return theRequest
    },
//      getaccessToken(code) {
//       var _this = this;
//       var url1 = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${this.wxAppId}&secret=${this.wxAppSecret}&code=${code}&grant_type=authorization_code`
//      axios.get(url1)
// 			.then(res=>{
//         console.log(res.data) 
//           _this.user1  =res.data
//       this.getUserinfo(this.user1)
//       })
//       localStorage.setItem("accessToken",JSON.stringify(this.user1))
//     },
//     getUserinfo(res){
//       var url2 = `https://api.weixin.qq.com/sns/userinfo?access_token=${res.access_token}&openid=${res.openid}&lang=zh_CN`
// axios.get(url2)
// 			.then(res=>{
//         console.log(res.data) 
//          _this.userinfo  =res.data
//         //发出去
//   console.log('发送');

//       postUserinfo(this.userinfo)
//       localStorage.setItem("loginId",JSON.stringify(this.userinfo));
//       })
//       this.$router.push('interaction')
//     },

    readStorage() {
this.openId= JSON.parse(localStorage.getItem("ltjyopenId"))
       if(this.openId==null){
         postCode({ code: this.code }).then(
          res=>{
        this.loginId = res.result[0].userInfo
        this.openId = res.result[0].userInfo.openId,
        localStorage.setItem('ltjyopenId', JSON.stringify(this.openId))
        localStorage.setItem('ltjyloginId', JSON.stringify(this.loginId))
        this.$router.push('interaction')
          }
         )
      }else{
           postCode({ openid: this.openId }).then(
            res=>{
            this.loginId = res.result[0].userInfo;
              if(JSON.parse(localStorage.getItem("ltjyloginId"))==null){
                localStorage.setItem('ltjyloginId', JSON.stringify(this.loginId))
                this.$router.push('interaction')
              }
            }
          )
      }
    },
    editpushinfo(){
      if (!(/^1[34578]\d{9}$/.test(this.telephone))) {
        Toast('请填写正确电话号码!!')
        return false
      }
      if((/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(this.cardNo) === false){
        Toast('请填写正确的身份证号码!!')
        return false
      }
      if(!(/^[\u4e00-\u9fa5]{2,4}$/).test(this.userRealName)){
        Toast('请填写正确的姓名!!')
        return false
      }
      posteditinfo({telephone:this.loginId.telephone,address:this.loginId.address,userRealName:this.loginId.userRealName,cardNo:this.loginId.cardNo,openid:this.openid})
      Toast('保存成功')
      this.$router.push('interaction')
    }
}
};
</script>
<style scoped>
.loginPage {
  position: relative;
}
.personal {
  margin-top: 45px;
  text-align: left;
  
}
.logotext{
  height: 5rem;
  line-height: 5rem;
}
.logo{
margin-top:0.7rem;
}
.editbtn {
  width: 70px;
  padding: 13px;
  border-radius: 13px ;
  text-align: center;
  margin: 0 auto;
  background-color: #26a2ff;
  margin-top: 30px;
}
</style>
