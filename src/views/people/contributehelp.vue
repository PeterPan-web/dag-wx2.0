<template>
  <div style="width: 100%;
  height: 100%;">
    <mt-navbar v-model="selected1" >
      <div class="selectbox">
              <div class="selectitem">
       <mt-tab-item id="1">全部</mt-tab-item> 
      </div>
  <div class="selectitem">
  <mt-tab-item id="2">审核中</mt-tab-item>  
  </div>
  <div class="selectitem">
   <mt-tab-item id="3">审核成功</mt-tab-item> 
  </div>
  <div class="selectitem">
 <mt-tab-item id="4">审核驳回</mt-tab-item>
  </div>
      </div>

</mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected1">
      <mt-tab-container-item id="1">
        <listcellhelp style="margin-top:0.5rem"
                      :mylist="this.listAll"></listcellhelp>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <listcellhelp style="margin-top:0.5rem"
                      :mylist="this.listin"></listcellhelp>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <listcellhelp style="margin-top:0.5rem"
                      :mylist="this.listsuc"></listcellhelp>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <listcellhelp style="margin-top:0.5rem"
                      :mylist="this.listdef"></listcellhelp>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import listcellhelp from '@/components/listcellhelp.vue'
export default {
  name: 'contribute',
  components: {
    listcellhelp,
  },
  data() {
    return {
      selected1: '1',
      openid: '',
      currentPage: 1,
      url: HAVE_URL,
      helpurl: MYHELP_URL,
      pageSize: 30,
      listAll: [],
      listin: [],
      listsuc: [],
      listdef: [],
    }
  },
  props: {
    propsurl: {
      type: String,
    },
  },
  created() {
    this.openid = JSON.parse(localStorage.getItem('ltjyopenId'))
    this.getlistAll()
    // 待审核
    this.getlistin()
    // 成功
    this.getlistsuc()
    this.getlistdef()
  },
  methods: {
    getlistAll() {
      let _this = this
      $.ajax({
        type: 'post',
        url: _this.propsurl,
        data: {
          openid: _this.openid,
          currentPage: _this.currentPage,
          pageSize: _this.pageSize,
        },
        dataType: 'json',
        beforeSend: function () {},
        success: function (res) {
          if (res.result.archives) {
            _this.listAll = res.result.archives
          } else {
            _this.listAll = res.result[0].list
          }
        },
        error: function () {},
      })
    },
    getlistin() {
      let _this = this
      $.ajax({
        type: 'post',
        url: _this.propsurl,
        data: {
          openid: _this.openid,
          currentPage: _this.currentPage,
          pageSize: _this.pageSize,
          verify: '0',
        },
        dataType: 'json',
        beforeSend: function () {},
        success: function (res) {
          if (res.result.archives) {
            _this.listin = res.result.archives
          } else {
            _this.listin = res.result[0].list
          }
        },
        error: function () {},
      })
    },
    getlistsuc() {
      let _this = this
      $.ajax({
        type: 'post',
        url: _this.propsurl,
        data: {
          openid: _this.openid,
          currentPage: _this.currentPage,
          pageSize: _this.pageSize,
          verify: '1',
        },
        dataType: 'json',
        beforeSend: function () {},
        success: function (res) {
          if (res.result.archives) {
            _this.listsuc = res.result.archives
          } else {
            _this.listsuc = res.result[0].list
          }
        },
        error: function () {},
      })
    },
    getlistdef() {
      let _this = this
      $.ajax({
        type: 'post',
        url: _this.propsurl,
        data: {
          openid: _this.openid,
          currentPage: _this.currentPage,
          pageSize: _this.pageSize,
          verify: '2',
        },
        dataType: 'json',
        beforeSend: function () {},
        success: function (res) {
          if (res.result.archives) {
            _this.listdef = res.result.archives
          } else {
            _this.listdef = res.result[0].list
          }
        },
        error: function () {},
      })
    },
  },
}
</script >

<style scoped>
.mint-tab-item{
width: 3rem;
}
.mint-navbar .mint-tab-item.is-selected{
  color: #EA6F46;

border-bottom:3px solid #EA6F46;
}
.selectbox{
display: flex;
margin: 0 auto;
}
.selectitem{
  flex: 1;
width: 4rem;
padding-left:1rem ;
padding-right:1rem ;
}
</style>