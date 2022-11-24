<template>
  <div class="loginPage">
    <headernav :title="title"></headernav>
    <div class="personal">
      <van-cell-group>
        <van-cell title="头像"
                  class="logotext">
          <van-image round
                     class="logo"
                     width="3rem"
                     height="3rem"
                     :src="this.loginId.picture" />
        </van-cell>
        <van-cell title="用户名"
                  :value="this.loginId.userName" />
        <van-cell title="性别"
                  :value="this.loginId.gender" />
        <van-field v-model="telephone"
                   required
                   label="手机号"
                   placeholder="请输入手机号"
                   />
      </van-cell-group>
      <div class="editbtn" @click="editpushinfo">
        <p>保存信息</p>
      </div>
    </div>
  </div>
</template>
<script>
import { readLocalStorage } from '../../utils/index'
import headernav from '../../components/header.vue'
import { Toast } from 'mint-ui'
import {posteditinfo} from '../../http/api/user'
export default {
  name: 'EditInfo',
  components: {
    headernav,
  },
  data() {
    return {
      url:EDITINFO_URL,
      title: '修改信息',
      openid:'',
      loginId: '',
      telephone:""
    }
  },
  created() {
    this.readStorage()
  },
  methods: {
    readStorage() {
      this.loginId = readLocalStorage(),
      this.openid = JSON.parse(localStorage.getItem("openId"));
      this.telephone = this.loginId.telephone;
    },
    editpushinfo(){
      if (!(/^1[34578]\d{9}$/.test(this.telephone))) {
        Toast('请填写正确电话号码!!')
        return false
      }
      posteditinfo({telephone:this.telephone,openid:this.openid}).then(res=>console.log(res))
      Toast('保存成功')
      this.$router.push('personalspace')
    }
  },
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
.logotext {
  height: 5rem;
  line-height: 5rem;
}
.logo {
  margin-top: 0.7rem;
}
.editbtn {
  width: 70px;
  padding: 13px;
  border-radius: 13px ;
  text-align: center;
  margin: 0 auto;
  background-color: rgb(255, 255, 255);
  margin-top: 30px;
}
</style>
