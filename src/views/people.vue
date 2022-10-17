<template>
	<div class="loginPage">
    <div class="login">
      <div class="loginShow">请完成微信授权以继续使用</div>
      <div class="loginBtn" @click="getLogin()">
        <p>获取用户信息</p>
      </div>
    </div>
	</div>
</template>

<script>
  export default {
    name: "people",
    data() {
      return {
        path:"/interaction",
        title: "个人中心",
		url:"static/img/center2.png",
        };
    },
    methods:{
      getLogin(){
        console.log(1);
      },
      goBack(){
      	this.$router.back(-1);
      }
    }
  }
</script>
<style scoped>
.loginPage{
  position: relative;
}
.login{
  position: absolute;
  left: 50%;
  transform: translate(-50%,0);
  top: 520px;

}
.loginShow{
  width: 200px;
  font-size: 15px;
  margin-bottom: 10px;
}
.loginBtn{
  
  background-color: rgb(138, 207, 138);
  text-align: center;
  border: none;
  border-radius: 5px;
  padding: 20px 30px 20px 30px;
}
</style>
