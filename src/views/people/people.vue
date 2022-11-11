<template>
  <div class="loginPage">
    <headernav :title="title"></headernav>
    <!--登录前个人页面-->
     <div class="login"
         v-if="!this.state">
      <div class="loginShow">请完成微信授权以继续使用</div>
      <div class="loginBtn"
          @click="loginRouter()" >
        <p>获取用户信息</p>
      </div>
    </div> 
    
    <!--登录后个人页面-->
    <div class="personal"
         v-if="this.state">
      <van-image round
                 width="8rem"
                 height="8rem"
                 :src="this.loginId.headimgurl" />
                 <div>
         {{this.loginId.nickname}} 
        
                 </div>
      <van-grid>
        <van-grid-item icon="setting-o"
                       text="修改资料" />
         <van-grid-item icon="user-o"
                       text="个人信息" /> 
        <van-grid-item icon="star-o"
                       text="收藏" />
        <van-grid-item icon="info-o"
                       text="关于" 
                       
                       />
      </van-grid>
    </div>
    <div>
      <center></center>
    </div>
  </div>
</template>

<script>
import {readLocalStorage} from "../../utils";
import  headernav  from "../../components/header.vue";
export default {
  name: "people",
  components:{
    headernav,
		},
  data() {
    return {
      title:'',
      openid:"",
      code:'',
      state: false,
      loginId:'',
    };
  },
  created () {
    this.readStorage()
    },
 methods: {
loginRouter(){
  this.$router.push('getLogin')
},
//  getCode() {
//       // 非静默授权，第一次有弹框
//       var appid = "wx09d4138d7b8a1252";
//       var http="http://127.0.0.1/#/getLogin";
//       let  loginId= this.loginId;
     
//       this.code = this.getUrlCode().code; // 截取code
      
//       if (this.code == null || this.code === '') {
//         // 如果没有code，则去请求
//         window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
//            http
//         )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
//       } else {
//         // 当code不等于空时，调用后端接口获取用户信息
        
//         // 你自己的业务逻辑
//       }
//       if (loginId == null || loginId === ''||loginId == undefined) {
//         // 如果没有openid，则去请求
//         window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
//            http
//         )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
//       } else {
//         this.state=true;
//       }
//     },
   readStorage(){
    console.log(this.$store.state.loginStatus);
       if (this.$store.state.loginStatus==0) {
      this.state=false
      this.loginRouter()
    }else{
      this.loginId=readLocalStorage()
     this.state=true
    }
      //this.getCode()
   },
  //  delLogin(){
  //   localStorage.removeItem("loginId");
  //     this.$router.push('interaction');
      
  //  }
}
};
</script>
<style scoped>
.loginPage {
  position: relative;
}
.login {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  top: 520px;
}
.loginShow {
  width: 200px;
  font-size: 15px;
  margin-bottom: 10px;
}
.loginBtn {
  background-color: rgb(138, 207, 138);
  text-align: center;
  border: none;
  border-radius: 5px;
  padding: 20px 30px 20px 30px;
}
.personal {
  margin-top: 48px;
  margin-bottom: 20px;
}
</style>
