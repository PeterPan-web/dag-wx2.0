<template>
  <div class="loginPage" v-if="loginId">
    <!--登录后个人页面-->
    <div class="topbox">
      <div class="toplogo">
        <van-image round
                   class="logo"
                   width="60px"
                   height="60px"
                   :src="this.loginId.picture" />
      </div>
        <div class="topword">
          <p>用户名:{{this.loginId.userName}}</p>
          <p>手机号:{{this.loginId.telephone?this.loginId.telephone:"未填写"}}</p>
        </div>
        <div class="arrow-right" @click="editinfo">
        </div>
    </div>
    <div class="middlebox">
    <div class="personalcontentView" v-for="(item , index) in list" :key="index" @click="toNext(item.path)">
			<img :src="item.url" alt="" style="width:35px;height:35px"/>
			<p style="font-size:13px;padding: 2px 0px;margin-left:-200px;margin-top:6px">{{item.content}}</p>
      <div class="arrow-right2">
        </div>
		</div>
    
    </div>
    <div class="clearnull" @click="clearloacal">
      <p>清除缓存</p>
    </div>
  </div>
</template>

<script>
import headernav from '../../components/header.vue'
import { postCode } from '../../http/api/user'
export default {
  name: 'personalspace',
  components: {
    headernav,
  },
  data() {
    return {
      code: '',
      openId:"",
      loginId: '',
// //弋江区档案馆
      // wxAppId: "wxa9d5243ac3ae61f2",
      // wxAppSecret: "3027ce3d1e52acacc9a270723af891e9",
      // http: "http://zt.whztsj.com/dist/index.html#/personalspace",
// // //兰台记忆
//       wxAppId: "wx3426368cce031df0",
//       wxAppSecret: "9b9ba314751829beec9efd5592c643d5",
//       http: "http://zt.whztsj.com/ltjy/index.html#/personalspace",
//测试
      wxAppId: "wx09d4138d7b8a1252",
      wxAppSecret:"6b3f8994da0ff9f4bb02e74840ffc675",
      http:"http://127.0.0.1/#/personalspace",

      userinfo: '',
      user1: '',
      list: [
        {
          content: '我的评论',
          path: '/mycomment',
          url: 'static/img/btnimg/wdpl.png',
        },
        {
          content: '我的收藏',
          path: '/myCollection',
          url: 'static/img/btnimg/wdsc.png',
        },
        {
          content: '我的投稿',
          path: '/myContribution',
          url: 'static/img/btnimg/wdtg.png',
        },
      ],
    }
  },
  created() {
    this.Judgelogin()
  },
  methods: {
   clearloacal(){
    localStorage.removeItem('openId')
},
    editinfo(){
this.$router.push('EditInfo')
    },
    toNext(path){
				this.$router.push({path:path})
			},
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
    async readStorage() {
      if(JSON.parse(localStorage.getItem("openId"))==null){
        let res = await postCode({ code: this.code })
        this.loginId = res.result[0].userInfo
        this.openId = res.result[0].userInfo.openId,
        localStorage.setItem('openId', JSON.stringify(this.openId))
        localStorage.setItem('loginId', JSON.stringify(this.loginId))
        setTimeout(this.$router.push('personalspace'), 1000)
      }else{
         this.openId= JSON.parse(localStorage.getItem("openId"))
           postCode({ openid: this.openId }).then(
            res=>{
               this.loginId = res.result[0].userInfo
            }
          )
      }
    },
  },
}
</script>
<style scoped>
.loginPage {
  position: relative;
}

.topbox {
  width: 100%;
  height: 130px;
  background: #ef6b41;
  border-radius: 0px;
  display: flex;
}
.toplogo{
margin-top: 10%;
margin-left: 6%;
}
.topword {
  margin-top: 9%;
  margin-left: 7%;
  width: 150px;
  height: 30px;
  border-radius: 0px;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei-Normal;
  font-weight: normal;
  text-align: LEFT;
  color: #ffffff;
  
}
.topword p{
  margin-top: 10px;
}
.arrow-right {
    margin-top: 15%;
    margin-left: 22%;
    display: inline-block;
    width: 1.15rem;
    height: 1.15rem;
    border-top: .01rem solid rgb(255, 255, 255);
    border-right: .01rem solid rgb(255, 255, 255);
    transform: rotate(45deg);
}
.middlebox{
width: 100%;
height: 100%;
background: #f6f9f8;
border-radius: 16px 16px 0px 0px;
}
.personalcontentView{
background: #ffffff;
border-radius: 6px;
text-shadow: 0px 3px 6px 0px rgba(0,0,0,0.15); 
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  display: flex;
  justify-content: space-between;
  padding:30px 17px 30px 12px;
}
.arrow-right2 {
    margin-top: 2%;
    display: inline-block;
    width: 1.15rem;
    height: 1.15rem;
    border-top: .01rem solid #000000;
    border-right: .01rem solid #000000;
    transform: rotate(45deg);
}
.clearnull{
  font-size: 10px;
  width: 140px;
  margin: 65% auto;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 15px;
}

</style>
