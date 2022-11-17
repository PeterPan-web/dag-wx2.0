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
                 :src="this.loginId.headimgurl" />
</van-cell>
  <van-cell title="用户名" :value="this.loginId.nickname" />
  <van-cell title="手机号" value="" />
  <!-- <van-cell title="退出登录" style="text-align:center"  @click="signout"/> -->
</van-cell-group>
    </div>
  </div>
</template>

<script>
import {readLocalStorage} from "../../utils/index";
import  headernav  from "../../components/header.vue";
import { postCode } from '../../http/api/user.js'
export default {
  name: "peopleSite",
  components:{
    headernav,
		},
  data() {
    return {
      title:'',
      code:'',
      loginId:'',
      wxAppId: 'wxa9d5243ac3ae61f2',
      wxAppSecret: '3027ce3d1e52acacc9a270723af891e9',
      http: 'http://zt.whztsj.com/dist/index.html#/peopleSite',
      //测试
      //  wxAppId: 'wx09d4138d7b8a1252',
      //  wxAppSecret: '6b3f8994da0ff9f4bb02e74840ffc675',
      // http:'http://127.0.0.1/#/peopleSite',
      userinfo:"",
      user1:'',
    };
  },
  created () {
    this.Judgelogin()
    },
 methods: {
  //判断是否登陆
    Judgelogin() {
      this.code = this.getUrlCode().code // 截取code
      console.log(this.code);
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
       // this.getaccessToken(this.code)
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
    //  getaccessToken(code) {
    //   var _this = this;
    //   var url1 = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${this.wxAppId}&secret=${this.wxAppSecret}&code=${code}&grant_type=authorization_code`
    // axios.get(url1)
		// 	.then(res=>{
    //     console.log(res.data) 
    //       _this.user1  =res.data
    //   this.getUserinfo(this.user1)
    //   })
    //   // localStorage.setItem("accessToken",JSON.stringify(this.user1))
    // },
//     getUserinfo(res){
//       var _this =this
//       var url2 = `https://api.weixin.qq.com/sns/userinfo?access_token=${res.access_token}&openid=${res.openid}&lang=zh_CN`
//  axios.get(url2)
// 			.then(res=>{
//         console.log(res.data) 
//          _this.userinfo  =res.data
//         //发出去
//   console.log('发送');
//       postUserinfo(this.userinfo)
//       localStorage.setItem("loginId",JSON.stringify(this.userinfo));
//       })
//       this.$router.push('site')
//        console.log('跳转');
//     }, 
async readStorage(){
  console.log(readLocalStorage());
  console.log(readLocalStorage()==null)
    if (readLocalStorage()==null) {
    let res=  await postCode({code:this.code})      
    console.log(res)
    this.loginId =res.result[0].userInfo
    sessionStorage.setItem("loginId",JSON.stringify( this.loginId));
    console.log(this.loginId);
    setTimeout(this.$router.push('site'),1000)
    console.log('一秒后跳转');
     }else{
       this.loginId=readLocalStorage()
       console.log(this.loginId);
     }
    }
}
}
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
</style>
