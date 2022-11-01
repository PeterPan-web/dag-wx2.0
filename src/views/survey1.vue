<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <headnav :title="selected" :path="path" :up="up"></headnav>
    </div>
    <div style="height:calc(100vh - 50px);overflow: auto;margin-top:50px;">
      <mt-radio align="left" title="您通过本网站最想获取的信息?" v-model="webStatus" :options="opt1">
      </mt-radio>
      <mt-radio align="left" title="您对本网站信息获取的满意度评价如何？" v-model="searchStatus" :options="opt2">
      </mt-radio>
      <mt-radio align="left" title="您对本网站信息实用性的满意度评价如何？" v-model="searchStatus2" :options="opt3">
      </mt-radio>
      <mt-radio align="left" title="您对本网站信息及时性的满意度评价如何？" v-model="searchStatus3" :options="opt4">
      </mt-radio>
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
        searchStatus: "0",
        searchStatus2: "0",
        searchStatus3: "0",
        opt1: [{
            label: '工作动态',
            value: '1'
          },
          {
            label: '政务信息公开',
            value: '2',
          }, {
            label: '查档咨询',
            value: '3'
          }, {
            label: '开放档案目录',
            value: '4'
          },
          {
            label: '政策法规',
            value: '5'
          }
        ],
        opt2: [{
            label: '非常满意',
            value: '0',
          },
          {
            label: '基本满意',
            value: '1'
          },
          {
            label: '一般满意',
            value: '2'
          },
          {
            label: '不太满意',
            value: '3'
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
            label: '一般满意',
            value: '2'
          },
          {
            label: '不太满意',
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
            label: '一般满意',
            value: '2'
          },
          {
            label: '不太满意',
            value: '3'
          }
        ],

        selected: "满意度调查",
        path: "/interaction",
        up: false,
        to: "",
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
        var openId = localStorage.getItem("openId");
        $.ajax({
          type: "post",
          url: SURVEY_URL,
          data: {
            searchLevel: _this.value,
            openId: openId,
            webStatus: _this.webStatus,
            searchStatus: _this.searchStatus,
            searchStatus2: _this.searchStatus2,
            searchStatus3: _this.searchStatus3
          },
          dataType: "json",
          success: function(res) {
            if (res.success == true || res.success == 'true') {
              Toast("评价成功");
            } else {
              Toast("评价失败，请尝试重新提交");
              console.log(res);
            }
          }
        });
      }
    }

  }
</script>

<style>
  .mint-cell-wrapper {
    text-align: left;
  }

  .mint-radiolist-title {
    font-size: 16px;
  }
</style>
