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
                       text="个人中心" />
        <van-grid-item icon="star-o"
                       text="收藏" />
        <van-grid-item icon="info-o"
                       text="关于" />
      </van-grid>
    </div>
    <div>
      <center></center>
    </div>
  </div>
</template>

<script>
import {readLocalStorage} from "../../utils/index";
import  headernav  from "../../components/header.vue";
export default {
  name: "peopleSite",
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
  this.$router.push('getLoginSite')
    },
   readStorage(){
    if (this.$store.state.loginStatus==0) {
      this.state=false
      this.$router.push('getLoginSite')
    }else{
      this.loginId=readLocalStorage()
     console.log(this.loginId); 
     this.state=true
    }
   }
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
