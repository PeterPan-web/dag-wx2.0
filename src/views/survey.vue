<template>
  <div class="page-tabbar surveyContent">
    <div class="page-wrap">
      <headnav :title="selected"
               :path="path"
               :up="up"   v-if="shownav" :style="shownav?'margin-bottom:45px;':''"></headnav>
    </div>
    <div style="height:calc(100vh - 50px);overflow: auto;">
      <div>
        <label class="title">1.您的联系方式是？</label>
        <input type="text"
               placeholder="请输入正确的手机号码"
               v-model="Satisfaction.phone">
      </div>

      <van-radio-group v-model="Satisfaction.webStatus"
                       style="text-align: left!important;">
        <van-cell-group title="2.您的职业/工作性质是？">
          <van-cell title="政府/机关单位/公务员"
                    clickable
                    @click="Satisfaction.webStatus = '1'">
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <van-cell title="职员/工人"
                    clickable
                    @click="Satisfaction.webStatus = '2'">
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
          <van-cell title="专业人员（医生、护士、律师、老师、记者等）"
                    clickable
                    @click="Satisfaction.webStatus = '3'">
            <template #right-icon>
              <van-radio name="3" />
            </template>
          </van-cell>
          <van-cell title="其他"
                    clickable
                    @click="Satisfaction.webStatus = '4'">
            <template #right-icon>
              <van-radio name="4" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>

      <van-radio-group v-model="Satisfaction.searchStatus"
                       style="text-align: left!important;">
        <van-cell-group title="3.您通过本网站最想获取的信息是？">
          <van-cell title="网站动态"
                    clickable
                    @click="Satisfaction.searchStatus = '1'">
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <van-cell title="政务信息公开"
                    clickable
                    @click="Satisfaction.searchStatus = '2'">
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
          <van-cell title="开放档案目录"
                    clickable
                    @click="Satisfaction.searchStatus = '3'">
            <template #right-icon>
              <van-radio name="3" />
            </template>
          </van-cell>
          <van-cell title="政策法规"
                    clickable
                    @click="Satisfaction.searchStatus = '4'">
            <template #right-icon>
              <van-radio name="4" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>

      <van-radio-group v-model="Satisfaction.searchLevel"
                       style="text-align: left!important;">
        <van-cell-group title="4.您对本网站信息获取的满意度评价如何？*">
          <van-cell title="非常满意"
                    clickable
                    @click="Satisfaction.searchLevel = '1'">
            <template #right-icon>
              <van-radio name="1" />
            </template>
          </van-cell>
          <van-cell title="基本满意"
                    clickable
                    @click="Satisfaction.searchLevel = '2'">
            <template #right-icon>
              <van-radio name="2" />
            </template>
          </van-cell>
          <van-cell title="一般"
                    clickable
                    @click="Satisfaction.searchLevel = '3'">
            <template #right-icon>
              <van-radio name="3" />
            </template>
          </van-cell>
          <van-cell title="不满意"
                    clickable
                    @click="Satisfaction.searchLevel = '4'">
            <template #right-icon>
              <van-radio name="4" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>

      <div>
        <label class="title">5.您的意见或建议是？</label>
        <textarea placeholder="请输入意见或建议"
                  v-model="Satisfaction.suggestion"></textarea>
      </div>
      <mt-button type="primary"
                 size="large"
                 @click.native="submit">提交</mt-button>
    </div>
  </div>

</template>

<script>
import {readLocalStorage} from "../utils/index";
import { Toast } from 'mint-ui'
import headnav from '../components/header.vue'
export default {
  name: 'survey',
  data() {
    return {
      title: '评价',
      shownav:true,
        ltjyloginId:"",
      Satisfaction: {
        openId: '',
        webStatus: "2",
        searchStatus:"2",
        searchLevel:"2",
        
        suggestion: '',
        phone: '',
      },
      selected: '满意度调查',
      path: '/interaction',
      up: false,
      to: '/',
    }
  },
  created() {
      if(this.$route.query.alone){
    this.shownav=false
  }
    this.readStorage()
  },
  components: {
    headnav,
  },
  methods: {
        readStorage() {
      this.ltjyloginId = readLocalStorage();
      if (this.ltjyloginId!=='') {
      this.Satisfaction.phone = this.ltjyloginId.telephone;
      }
    },
    submit() {
      var _this = this;
      var phone = this.Satisfaction.phone
      var reg = /^1[3|4|5|7|8][0-9]{9}$/
      if(phone = !'' && !reg.test(phone)){
        Toast("请填写正确的手机号码！");
        return false;
      }
      if (this.Satisfaction.searchLevel == '') {
        Toast('必须填写该项目')
        return false
      };
      $.ajax({
        type: 'get',
        url:
          SURVEY_URL +
          '?job=' +
          _this.Satisfaction.webStatus +
          '&phone=' +
          _this.Satisfaction.phone +
          '&webStatus=' +
          _this.Satisfaction.searchStatus +
          '&searchLevel=' +
          _this.Satisfaction.searchLevel +
          '&advice=' +
          _this.Satisfaction.suggestion,
        success: function (res) {
          if (res.success == true || res.success == 'true') {
            Toast('评价成功')
            setTimeout(_this.goback(), 20000)
          } else {
            Toast('评价失败，请尝试重新提交')
          }
        },
      })
    },
    goback() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
.surveyContent .mint-cell-wrapper {
  text-align: left;
  padding: 0px;
  background-size: 120% 2px;
  height: 35px;
  line-height: 35px;
}
.surveyContent .mint-cell {
  height: 35px;
  line-height: 35px;
}
.surveyContent .mint-radiolist-title {
  font-size: 15px;
  text-align: left !important;
}
.surveyContent .title {
  margin: 8px;
  display: block;
  color: #888;
  font-size: 20px;
  text-align: left !important;
}
.surveyContent input,
textarea {
  border: 1px solid #ccc;
  border-radius: 3px;
}
.surveyContent input {
  height: 50px;
  font-size: 14px;
  width: 99%;
  text-indent: 20px;
}
.surveyContent textarea {
  height: 70px;
  font-size: 14px;
  width: 99%;
  text-indent: 20px;
  padding: 10px 0;
}
.surveyContent .mint-button {
  margin-top: 15px;
}
.surveyContent .mint-radio-label {
  font-size: 14px;
  text-align: left !important;
}
</style>
