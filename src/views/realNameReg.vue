<template>
  <div>
    <headernav :title="title"></headernav>
    <div style="height:calc(100vh - 40px);overflow: auto;margin-top:40px">
      <van-form>
        <van-field
          v-model="phone"
          name="手机号码"
          label="手机号码"
          placeholder="请填写手机号码"
          :rules="[{ required: true, message: '请填写手机号码' }]"
        />
        <van-field
          v-model="code"
          center
          clearable
          label="验证码"
          placeholder="请输入验证码"
        >
          <template #right-icon	>
            <img @click="updateCode($event)" width="100px" :src="codeImg">
<!--            <van-button size="small" type="primary">发送验证码</van-button>-->
          </template>
        </van-field>
      </van-form>
      <mt-button @click="verifyCode()" type="primary" size="large" style="width:90%;margin:10px 5%">查询</mt-button>
    </div>

  </div>


</template>

<script>
import headernav from '../components/header.vue'
import {Toast} from "mint-ui";
export default{
  name:"realNameReg",
  data(){
    return{
      title:this.$route.query.type == 1 ? '我的留言' : "利用结果查询",
      phone:'',
      code:'',
      codeImg:'/'+HOST_HOME+'/djlyApp!getCodeImages.action?'+Math.random(),
      type:''
    }
  },
  components:{
    headernav,
  },
  mounted() {
    this.type = this.$route.query.type;

    // this.getCode();
  },
  methods:{
    getCode(){
      $.ajax({
        url:'/'+HOST_HOME+'/djlyApp!getCodeImages.action',
        type:'get',
        success:function () {

        }
      })
    },
    gotoHistory(){
      this.$router.push({
        path:'/historySearch',
        query:{
          phone:this.phone
        }
      })
    },
    updateCode(e){
      this.codeImg = '/'+HOST_HOME+'/djlyApp!getCodeImages.action?'+Math.random()
    },
    /**
     * 验证验证码
     */
    
    verifyCode(){
      let _this = this;
      if(_this.phone == ''){
        Toast('请输入身份证号码~');
        return
      }
      if(_this.code == ''){
        Toast('请输入验证码~');
        return
      }
      $.ajax({
        url:'/'+HOST_HOME+'/djlyApp!validateCode.action',
        type:'post',
        data:{code:_this.code},
        success:function (res) {
          if(res.success){
            if(res.result.state){
              if(_this.type == 1){
                _this.gotoMyBackFeed();
              }else{
                _this.gotoHistory();
              }
            }else{
              Toast(res.result.msg);
            }
          }
        }
      })
    },
    /**
     * 跳转我的意见反馈
     */
    gotoMyBackFeed(){
      this.$router.push({
        path:'/myBackFeed',
        query:{
          phone:this.phone
        }
      })
    }
  }
}
</script>

<style>
</style>
