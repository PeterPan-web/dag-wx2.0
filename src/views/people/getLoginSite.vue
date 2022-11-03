<template>
  <div class="loginPage">
    <headernav :title="title"></headernav>
    <div class="personal"
         v-if="this.state">
      <van-image round
                 width="6rem"
                 height="6rem"
                 :src="this.userinfo.headimgurl" />
      
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
import headernav from '../../components/header.vue'
import { currencyGet, postUserinfo } from '../../http/api/user'
export default {
  name: 'people',
  components: {
    headernav,
  },
  data() {
    return {
      code: '',
      title:"",
      state: false,
      wxAppId: 'wx09d4138d7b8a1252',
      wxAppSecret: '6b3f8994da0ff9f4bb02e74840ffc675',
      http: 'http://127.0.0.1/#/getLoginSite',
      userinfo:"",
    }
  },
  created() {
    this.$store.commit('showStatus')
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
        this.getaccessToken(this.code)
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
    async getaccessToken(code) {
      
      this.state=true
      var url1 = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${this.wxAppId}&secret=${this.wxAppSecret}&code=${code}&grant_type=authorization_code`
      let user1  =await currencyGet(url1)
      console.log(user1);
      this.getUserinfo(user1)
      localStorage.setItem("accessToken",JSON.stringify(this.user1))
    },
   async getUserinfo(res){
      var url2 = `https://api.weixin.qq.com/sns/userinfo?access_token=${res.access_token}&openid=${res.openid}&lang=zh_CN`
      let user2=await currencyGet(url2)
       this.userinfo= user2 
      postUserinfo(user2)
      localStorage.setItem("loginId",JSON.stringify(this.userinfo));
      this.$router.push('site')
    },

  },
}
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
