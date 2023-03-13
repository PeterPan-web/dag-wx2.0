<template>
  <div>
    <div class="helpsearch">
      <input type="helpsearch"
             class="helpsearchText"
             placeholder="请输入内容进行搜索"
             v-model="keyWord"
             @keyup.enter="searchFile"
             @focusin="pushText($event)"
             @blur="setKeyBord" />
      <div class="helpbtn">
        <mt-button size="small"
                   slot="right"
                   @click="searchFile">搜索</mt-button>
      </div>
    </div>
    <div :id="id">
      <mt-loadmore :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded"
                   :auto-fill="false"
                   ref="loadmore"
                   :top-method="loadTop">
        <div>
          <div class="helplistcell"
               v-for="(item,index) in list"
               :key="index"
               @click="toDetail(item)">
            <div class="helplistLeftCenter">
              <img v-if="item.PICTURE ==null"
                   :src="item.PICTURE" />
              <img v-else
                   :src="com+item.PICTURE" />
            </div>
            <div class="helpmessageListCenter"
                 >
              <p class="helpcenterTitle"
                 >{{item.TITLE}}</p>
              <p >日期 :{{item.PUBLISHDATE}}</p>
              <p class="helpcenterContent"
                 >{{item.HELPINFO}}</p>
            </div>
          </div>
        </div>
      </mt-loadmore>
    </div>

  </div>
</template>

<script>
export default {
  name: 'centerSearch',
  props: ['id', 'url', 'title'],
  data() {
    return {
      openId:'',
      keyWord: '',
      allLoaded: false,
      list: [],
      total: 0,
      currentPage: 1,
      pageSize: 15,
      com: HOST_HOME,
      imgIcon: 'static/img/common.jpg',
      height: $(window).height(),
      params: {},
      name: '',
      argument: {
        have: {},
        had: {},
        myArch: {},
      },
    }
  },
  created() {
    this.openId = JSON.parse(localStorage.getItem('yjqopenId'))
    
  },
  activated() {
    var _this = this
    if (typeof this.params.top == 'undefined') {
      this.searchFile()
      window.onresize = function () {
        var curentHeight = $(window).height()
        if (curentHeight == _this.height) {
          _this.setKeyBord()
        } else {
          _this.pushText()
        }
      }
    } else {
      document.getElementById(_this.id).scrollTop = this.params.top
    }
    WeixinJSBridge.call('hideToolbar')
    WeixinJSBridge.call('hideOptionMenu')
  },
  methods: {
    pushText(ev) {
      $('.mint-tabbar').css('display', 'none')
      $('.mint-tab-container').attr(
        'style',
        'height:calc(100vh - 50px);overflow:hidden'
      )
      $('#' + this.id).attr('style', 'height:calc(100vh - 100px);overflow:auto')
    },
    setKeyBord() {
      $('.mint-tabbar').css('display', 'flex')
      $('.mint-tab-container').attr(
        'style',
        'height:calc(100vh - 105px);overflow:hidden'
      )
      $('#' + this.id).attr('style', 'height:calc(100vh - 160px);overflow:auto')
    },
    toDetail(item) {
      var _this = this
      this.params.top = document.getElementById(_this.id).scrollTop
      if(this.title=='我来帮忙'){
      this.$router.push({
        path: '/lethelpDetail',
        query: { title: _this.title, argument: item },
      }) 
    }else{
    this.$router.push({
        path: '/helpDetail',
        query: { title: _this.title, argument: item },
      }) 
    }
    },
    searchFile() {
      this.currentPage = 1
      this.list = []
      $('.searchText').blur()
      this.getFile()
    },
    loadBottom() {
      this.allLoaded = true
      if (this.total > 0 && this.list.length < this.total) {
        this.allLoaded = false
        this.currentPage++
        this.getFile()
      }
      this.$refs.loadmore.onBottomLoaded()
    },
    loadTop() {
      this.allLoaded = false
      this.currentPage = 1
      this.list = []
      this.getFile()
      this.$refs.loadmore.onTopLoaded()
    },
    getParams() {
      this.params = this.$router.history.current.query
    },
    getFile() {
      var _this = this
      $.ajax({
        type: 'post',
        url: _this.url,
        data: {
          key: _this.keyWord,
          openid:  _this.openId,
          currentPage: _this.currentPage,
          pageSize: _this.pageSize,
        },
        dataTypa: 'json',
        success: function (res) {
          _this.total = res.result[0].count
          if (typeof res.result[0].helpInfo == 'undefined') {
            _this.list.push.apply(_this.list, res.result[0].list)
          } else {
            _this.list.push.apply(_this.list, res.result[0].helpInfo)
          }
        },
      })
    },
  },
}
</script>

<style >
.helpsearch {
  margin-top: 50px;
  height: 50px;
  background: #d7d7d7;
  line-height: 50px;
  text-align: left;
  margin: 0 auto;
}
.helpsearchText {
  width: 72%;
  height: 33px;
  margin-left: 2%;
  padding-left: 1%;
  border: none;
  border-radius: 4px;
}
.helpsearchTitle {
  overflow: hidden;
  white-space: nowrap;
  font-size: 15px;
  width: 100%;
  font-weight: 600;
}
.helplistcell {
  display: flex;
  height: 6rem;
  margin: 5px 0px;
  border-bottom: #ccc solid 1px;
}
.helplistLeftCenter {
  
  width:6rem;
  height: 5rem;
}
.helplistLeftCenter img {
  width: 100%;
  height: 100%;
  margin-left: .7rem;
  margin-top: .5rem;
}


.helpmessageListCenter {
  width: 100%;
  padding-left: 2rem;
  padding-top: 1em;
  text-align: left;
  font-size: 13px;
}
.helpmessageListCenter p {
  width: 100%;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}


.helpcenterTitle {
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
}.helpcenterTitle,
.helpcenterContent {
  overflow: hidden;
  text-align: left;
  width: 100%;
  text-overflow: ellipsis;
}
.helpcenterContent {
  margin-top: 0.7rem;
  height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
  letter-spacing: 3px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.helpsearchContent {
  font-size: 12px;
}

ul {
  list-style: none;
}
.helpbtn {
  display: inline-block;
  width: 22%;
  text-align: center;
}

</style>
