<template>
  <div class="page-tabbar surveyContent">
    <div class="page-wrap">
      <headnav :title="selected" :path="path" :up="up"></headnav>
    </div>
    <div style="height:calc(100vh - 50px);overflow: auto;margin-top:50px;">
      <div>
        <label class="title">1.您的联系方式是？</label>
        <input type="text" placeholder="请输入正确的手机号码" v-model="mobile">
      </div>
      <mt-radio align="left" title="2.您的职业/工作性质是？" v-model="webStatus" :options="opt1">
      </mt-radio>

      <mt-radio align="left" title="3.您通过本网站最想获取的信息是？" v-model="searchStatus" :options="opt2">
      </mt-radio>
      <mt-radio align="left" title="4.您对本网站信息获取的满意度评价如何？" v-model="searchStatus2" :options="opt3">
      </mt-radio>
    <!-- <mt-radio align="left" title="您对本网站信息实用性的满意度评价如何？" v-model="searchStatus3" :options="opt4">

      </mt-radio>
      <mt-radio align="left" title="您对本网站信息及时性的满意度评价如何？" v-model="searchStatus5" :options="opt6">

      </mt-radio>
      <mt-radio align="left" title="您认为本网站有哪些不足？" v-model="searchStatus4" :options="opt5">

      </mt-radio> -->
      <div>
        <label class="title">5.您的意见或建议是？</label>
        <textarea placeholder="请输入意见或建议" v-model="suggestion"></textarea>
      </div>
      <mt-button type="primary" size="large" @click.native="submit">提交</mt-button>
    </div>
  </div>



</template>

<script>
  import {
    Toast
  } from 'mint-ui';
  import headnav from '../components/header.vue'
  export default {
    name: "survey",
    data() {
      return {
        title: "评价",
        webStatus: "1",
        searchStatus: "1",
        searchStatus2: "1",
        searchStatus3: "1",
        searchStatus4: "1",
        searchStatus5: "1",
        suggestion:'',
        mobile:'',
        opt1: [{
            label: '政府/机关单位/公务员',
            value: '0'
          },
          {
            label: '职员/工人',
            value: '1',
          }, {
            label: '专业人员（医生、护士、律师、老师、记者等）',
            value: '2'
          }, {
            label: '其他',
            value: '3'
          }
        ],
        opt2: [{
            label: '网站动态',
            value: '0',
          },
          {
            label: '政务信息公开',
            value: '1'
          },
          {
            label: '查档咨询',
            value: '2'
          },
          {
            label: '开放档案目录',
            value: '3'
          },
          {
            label: '政策法规',
            value: '4'
          }
        ],
        opt3: [{
            label: '非常满意',
            value: '0',
          },
          {
            label: '基本满意',
            value: '1'
          },
          {
            label: '一般',
            value: '2'
          },
          {
            label: '不满意',
            value: '3'
          }
        ],
        opt4: [{
            label: '非常满意',
            value: '0',
          },
          {
            label: '基本满意',
            value: '1'
          },
          {
            label: '一般',
            value: '2'
          },
          {
            label: '不满意',
            value: '3'
          }
        ],
        opt5: [{
            label: '功能菜单不实用',
            value: '0',
          },
          {
            label: '网站不稳定经常遇到问题',
            value: '1'
          },
          {
            label: '常用功能找不到',
            value: '2'
          },
          {
            label: '其他',
            value: '3'
          }
        ],
        opt6: [{
            label: '非常满意',
            value: '0',
          },
          {
            label: '基本满意',
            value: '1'
          },
          {
            label: '一般',
            value: '2'
          },
          {
            label: '不满意',
            value: '3'
          }
        ],
        selected: "满意度调查",
        path: "/interaction",
        up: false,
        to: "/",
        params: {

        }
      }
    },
    created() {

    },
    components: {
      headnav,
    },
    methods: {
      submit() {
        var _this = this;
        var phone = _this.mobile;
        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
        if(phone != '' && !reg.test(phone)){
          Toast("请填写正确的手机号码！");
          return false;
        }
        
        $.ajax({
          type: "get",
          url: SURVEY_URL+'?job='+_this.webStatus+'&phone='+phone+'&webStatus='+_this.searchStatus+'&searchLevel='+_this.searchStatus2+'&advice='+_this.suggestion,
          success: function(res) {
            if (res.success == true || res.success == 'true') {
              Toast("评价成功");
            } else {
              Toast("评价失败，请尝试重新提交");
            }
          }
        });
}
      
    }

  }
</script>

<style>
   .surveyContent .mint-cell-wrapper {
    text-align: left;
    padding:0px;
    background-size: 120% 2px;
    height:35px;
    line-height: 35px;
  }
.surveyContent .mint-cell {
  height:35px;
  line-height: 35px;
}
   .surveyContent .mint-radiolist-title {
    font-size: 15px;
     text-align: left!important;
   }
  .surveyContent .title {
    margin: 8px;
    display: block;
    color: #888;
    font-size: 20px;
    text-align: left!important;
  }
  .surveyContent input,textarea {
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .surveyContent input{
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
    padding:10px 0;
  }
   .surveyContent .mint-button {
    margin-top: 15px;
  }
   .surveyContent .mint-radio-label {
    font-size: 14px;
  }
</style>
