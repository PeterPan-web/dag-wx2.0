<template>
  <div class="loginPage">
    <headernav :title="title"></headernav>
    <!--登录前个人页面-->
    <div class="login"
         v-if="!this.state">
      <div class="loginShow">请完成微信授权以继续使用</div>
      <div class="loginBtn"
           @click="getLogin()">
        <p>获取用户信息</p>
      </div>
    </div>
    <!--登录后个人页面-->
    <div class="personal"
         v-if="this.state">
      <van-image round
                 width="8rem"
                 height="8rem"
                 src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
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
  </div>
</template>

<script>
import { getUserinfo ,getOpenInfo ,getOpenid} from "../../http/api/user";
import  headernav  from "../../components/header.vue";
import { Checkbox, Dialog } from 'vant'
export default {
  name: "people",
  components:{
    headernav,
		},
  data() {
    return {
      openid:"",
      code:'',
      state: false,
      path: "/interaction",
      title: "个人中心",
      url: "static/img/center2.png"
    };
  },
  created () {
    getUserinfo().then(res=>console.log(res.result[0].getCode))
    // getUserinfo().then(res=>console.log(res))
    //  getOpenInfo().then(res=>console.log(res))
      //  this.CheckID()

    },
  methods: {
    // CheckID(){
    // //   if (localStorage.openId) {
    // //   console.log(localStorage.openId);
    // // }else{
    // //   this.getId()
    // // }
    //  // debugger
    // const user = storage.get("userInfo") || {}
    // if (Tool.isEmpty(user)) {
    //   // 如果缓存localStorage中没有userInfo，则需用code去后台获取
    //   this.getCode();
    // }
    // },
    // getUserinfo(){
    //   getUserinfo().then(res=>
    //   console.log(res.getCode)
      
    //   )
    // },
        // getCode () { 
        //     const code = this.GetUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
        //     const local = window.location.href
        //     if (code == null || code === '') {
        //         window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +" wx1ca21428bbde6b0c"+ '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect',
        //         console.log('qqqq');
        //     } else {
        //       console.log('11');
        //        // this.getOpenId(code) //把code传给后台获取用户信息
        //     }
        // },
       getLogin() {
        // getUserinfo().then(res=>{
        //   console.log(res);
        //    _this.code=res.result[0].getCode
        // })
        // getOpenInfo().then(res=>{
        //   console.log(res);
        // })
        // this.getId()

        // Dialog.alert({
        //     title: '登陆成功!',
        //     message: '',
        //   }).then(()=>{
        //     this.goBack()
        //   })// 非静默授权，第一次有弹框
      this.code = '';
      var callback_url = Wxconst.CALLBACK_URL; // 获取页面url
      var appid = Wxconst.APPID;
      this.code = this.getUrlCode().code; // 截取code
      if (this.code == null || this.code === '') {
        // 如果没有code，则去请求
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(
            callback_url
        )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
      } else {
        // 当code不等于空时，调用后端接口获取用户信息
        this.getUserInfo();
        // 你自己的业务逻辑
      }
          
    },
    // getId(){
    //      let _this=this
    //    getOpenid().then(res=>{
    //    _this.openid=  res.result[0].openid
    //       console.log(_this.openid);

    //     })
    //     localStorage.setItem('OpenId',_this.openid)
    //     console.log(localStorage);
    // },
    goBack() {
      this.$router.back(-1);
    },
    ////截取url中的code方法
    getUrlCode() {
      var url = location.search;
      this.winUrl = url;
      var theRequest = new Object();
      if (url.indexOf('?') != -1) {
        var str = url.substr(1);
        var strs = str.split('&');
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
        }
      }
      return theRequest;
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
}
</style>
