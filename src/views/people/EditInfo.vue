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
         <van-field v-model="userRealName"
                   label="真实姓名"
                   placeholder="请输入真实姓名"
                   />
                  <van-field v-model="cardNo"
                   label="身份证号码"
                   placeholder="请输入身份证号码"
                   />
        <van-field v-model="telephone"
                   label="手机号"
                   placeholder="请输入手机号"
                   />
        <van-field v-model="address"
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
      telephone:"",
      address:'',
      cardNo:'',
      userRealName:''
    }
  },
  created() {
    this.readStorage()
  },
  methods: {
    readStorage() {
      this.loginId = readLocalStorage(),
      this.openid = JSON.parse(localStorage.getItem("ltjyopenId"));
      this.telephone = this.loginId.telephone;
      this.address = this.loginId.address;
      this.cardNo = this.loginId.cardNo;
      this.userRealName = this.loginId.userRealName;
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
      posteditinfo({telephone:this.telephone,address:this.address,userRealName:this.userRealName,cardNo:this.cardNo,openid:this.openid}).then(res=>console.log(res))
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
  background-color: #26a2ff;
  margin-top: 30px;
}
</style>
