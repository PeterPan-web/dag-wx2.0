<template>
  <div class="mylist">
    <headernav :title="title"
               style="margin-bottom:48px"></headernav>
    <div style="overflow: auto;">
      <mt-loadmore :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded"
                   :auto-fill="false"
                   ref="loadmore"
                   :top-method="loadTop">
        <div>
          <!-- <li class="itemcard"
              v-for="(item,index) in list"
              :key="index"
              @click="toDetail(item)
              "> -->
          <div class="myitemcard"
               v-for="(item,index) in list"
               :key="index">
            <div class="myitemTime">
              <p>{{item.CRITICISMDATE?item.CRITICISMDATE:item.CREATEDATE}}</p>
            </div>
            <div class="myitemWord"
                 v-if="item.CRITICISMINFO">
              <p>{{item.CRITICISMINFO}}</p>
            </div>
            <div class="mybottombox">
              <!-- <div>
              <span class="listLeftCenter">
                <img v-if="item.PICTURE ==null"
                     :src="item.PICTURE" />
                <img v-else
                     :src="com+item.PICTURE" />
              </span>  
              </div> -->
              <div class="mymessageListCenter">
                <p>{{item.TITLE}}</p>
              </div>
            </div>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

 <script>
import headernav from '../components/header.vue'
export default {
  components: {
    headernav,
  },
  props: ['url', 'title', 'type'],
  name: 'myCentercom',
  data() {
    return {
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
    this.getFile()
  },
  methods: {
    toDetail(item) {
      var _this = this
      console.log(item)
      this.$router.push({
        path: '/helpDetail',
        query: { title: _this.title, argument: item },
      })
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
      var openId = JSON.parse(localStorage.getItem('ltjyopenId'))
      if (_this.type == 'comments') {
        $.ajax({
          type: 'post',
          url: _this.url,
          data: {
            openid: openId,
            currentPage: _this.currentPage,
            pageSize: _this.pageSize,
          },
          dataTypa: 'json',
          success: function (res) {
            console.log(res)
            _this.total = res.result.count
            if (typeof res.result.comments == 'undefined') {
              // _this.list.push.apply(_this.list,res.result[0].list);
            } else {
              _this.list.push.apply(_this.list, res.result.comments)
              console.log(_this.list)
            }
          },
        })
      }
      if (_this.type == 'collects') {
        $.ajax({
          type: 'post',
          url: _this.url,
          data: {
            openid: openId,
            currentPage: _this.currentPage,
            pageSize: _this.pageSize,
          },
          dataTypa: 'json',
          success: function (res) {
            console.log(res)
            _this.total = res.result.count
            if (typeof res.result.collects == 'undefined') {
              // _this.list.push.apply(_this.list,res.result[0].list);
            } else {
              _this.list.push.apply(_this.list, res.result.collects)
              console.log(_this.list)
            }
          },
        })
      }
    },
  },
}
</script>

<style  scoped>
.mylistLeftCenter {
  display: inline-block;
  width: 50px;
  height: 50px;
  vertical-align: top;
}
.mylistLeftCenter img {
  width: 100%;
  height: 100%;
  margin-top: 10px;
}

.myitemcard {
  background-color: white;
  margin: 5px 0px;
  border-bottom: #ccc solid 1px;
  overflow: hidden;
  padding: 10px;
}
.myitemTime {
  text-align: left;
  font-size: 12px;
}
.mybottombox {
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.myitemWord {
  text-align: left ;
  background-color: rgb(255, 255, 255) ;
}
.mymessageListCenter {
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;

  height: 55px;
  line-height: 55px;
  width: 100%;
  background-color: rgb(235, 235, 232);
}
</style>