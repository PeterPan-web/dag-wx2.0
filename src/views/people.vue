<template>
	<div class="loginPage">
    <headernav :title="title"></headernav>
    <div class="login" v-if="!this.state">
      <div class="loginShow">请完成微信授权以继续使用</div>
      <div class="loginBtn" @click="getLogin()">
        <p>获取用户信息</p>
      </div>
    </div>
    <!--登录后个人页面-->
    <div class="personal" v-if="this.state">
      <van-image
  round
  width="8rem"
  height="8rem"
  src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"/>
  <van-grid >
  <van-grid-item  icon="setting-o" text="修改资料" />
  <van-grid-item icon="user-o" text="个人中心" />
  <van-grid-item icon="star-o" text="收藏" />
  <van-grid-item icon="info-o" text="关于" />
</van-grid>
    </div>
	</div>
</template>

<script>
import  headernav  from "../components/header.vue";
export default {
  name: "people",
  components:{
    headernav,
		},
  data() {
    return {
      state: true,
      path: "/interaction",
      title: "个人中心",
      url: "static/img/center2.png"
    };
  },
  methods: {
    getLogin() {
      console.log(1);
    },
    goBack() {
      this.$router.back(-1);
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
