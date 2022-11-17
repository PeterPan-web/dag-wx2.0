<template>
  <div>
    <headernav :title="title" style="margin-bottom:48px"></headernav>
    <div 
         style="overflow: auto;">
      <mt-loadmore :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded"
                   :auto-fill="false"
                   ref="loadmore"
                   :top-method="loadTop">
        <ul>
          <!-- <li class="itemcard"
              v-for="(item,index) in list"
              :key="index"
              @click="toDetail(item)
              "> -->
              <li class="itemcard"
              v-for="(item,index) in list"
              :key="index"
              >
            <div class="itemTime">
              <p>{{item.CRITICISMDATE}}</p>
            </div>
            <div class="itemWord">
              <p>{{item.CRITICISMINFO}}</p>
            </div>
            <div class="bottombox">
              <div>
              <span class="listLeftCenter">
                <img v-if="item.PICTURE ==null"
                     :src="item.PICTURE" />
                <img v-else
                     :src="com+item.PICTURE" />
              </span>  
              </div>
              
              <div class="messageListCenter">
                <p class="centerTitle">{{item.TITLE}}</p>
              </div>
            </div>
          </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import headernav from "../../components/header.vue";
import { readLocalStorageid } from "../../utils/index";
export default {
  name: "myCollection",
  components: {
    headernav
  },
  data() {
    return {
      title: "我的收藏",
      url: COMMENT_URL,
      allLoaded: false,
      list: [],
      total: 0,
      currentPage: 1,
      pageSize: 15,
      com: HOST_HOME,
      imgIcon: "static/img/common.jpg",
      height: $(window).height(),
    };
  },
  created() {
    this.getFile();
  },
  methods: {
    toDetail(item) {
      var _this = this;
      console.log(item);
      this.$router.push({
        path: "/helpDetail",
        query: { title: _this.title, argument: item }
      });
    },
    loadBottom() {
      this.allLoaded = true;
      if (this.total > 0 && this.list.length < this.total) {
        this.allLoaded = false;
        this.currentPage++;
        this.getFile();
      }
    },
    loadTop() {
      this.allLoaded = false;
      this.currentPage = 1;
      this.list = [];
      this.getFile();
    },
    getFile() {
      var _this = this;
      var openId = readLocalStorageid();
      console.log(openId);
      $.ajax({
        type: "post",
        url: _this.url,
        data: {
          openid: openId,
          currentPage: _this.currentPage,
          pageSize: _this.pageSize
        },
        dataTypa: "json",
        success: function(res) {
          console.log(res);
          _this.total = res.result.count;
          console.log(_this.total);
          if (typeof res.result.comments == "undefined") {
            // _this.list.push.apply(_this.list,res.result[0].list);
          } else {
            _this.list.push.apply(_this.list, res.result.comments);
          }
        }
      });
    }
  }
};
</script >

<style scoped>
.centerTitle,
.centerContent {
  overflow: hidden;
  text-align: left;
  width: 100%;
  text-overflow: ellipsis;
}
.centerTitle {
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
}
.centerContent {
  height: 33px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
  margin-bottom: 4px;
  letter-spacing: 3px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.searchContent {
  font-size: 12px;
}
ul {
  list-style: none;
}
.listLeftCenter {
  display: inline-block;
  width: 50px;
  height: 50px;
  vertical-align: top;
}
.listLeftCenter img {
  width: 100%;
  height: 100%;
  margin-top: 10px;
}
.messageListCenter {
  margin-top: 10px;
  font-size: 10px;
  height: 55px;
}
.itemcard {
  background-color: white;
  height: 100px;
  margin: 5px 0px;
  border-bottom: #ccc solid 1px;
  overflow: hidden;
  padding: 10px;
}
.itemTime {
  text-align: left;
  font-size: 10px;
}
.bottombox {
  display: flex;
  text-align: left;
}
.itemWord {
  width: 350px;
  text-align: left ;
  background-color: rgb(255, 255, 255) ;
  font-size: 15px;
}
</style>
