<template>
  <div>
    <swipercomponent></swipercomponent>
    <mainbtncomponent :list="list"></mainbtncomponent>
        <navcomponent :nav="nav" :pathto="pathto" :login="login"></navcomponent>
    <!-- <near :url="nearUrl"></near> -->
  </div>
</template>

<script>
import {readLocalStorage} from "../utils/index";
import {postSlow} from "../http/api/Universal";
import swipercomponent from "../components/swiper.vue";
import navcomponent from "../components/nav.vue";
import mainbtncomponent from "../components/mainButton.vue";
import Near from "./near.vue";
export default {
  name: "site",
  data() {
    return {
      list: [
        {
          content: "预约查档",
          path: "/archDetail_sq",
          url: "static/img/btnimg/yycd.png"
        },
        {
          content: "留言咨询",
          path: "/backfeed",
          url: "static/img/btnimg/lyzx.png"
        },
        {
          content: "满意度调查",
          path: "/survey",
          url: "static/img/btnimg/myddc.png"
        },
        //  { content: "我来帮忙", path: "/help", url: "static/img/btnimg/wlbm.png" },
         {content:"互动中心",path:"/interactioncenter",url:"static/img/btnimg/hdzx.png"},
          {content:"就近查档",path:"/nearSearch",url:"static/img/btnimg/jjcd.png"},
           
         //{ content: "个人中心", path: "/people", url: "static/img/btnimg/yycd.png" }
        //{ content: "登陆页面", path: "/getLogin", url: "static/img/people.png" }
      ],
      mark: "feed",
      nav:"个人中心",
      url: FEED_URL,
      nearUrl: NEAR_URL,
      pathto:"/people",
      login:false,
    };
  },
  created() {
     postSlow()
     this.iflogin()
    this.getFile();
    document.title = "微互动";
  },
  methods: {
    // 判断是否登陆
    iflogin(){
      if (readLocalStorage()==null) {
          this.login=false
      }else{
        this.login=true
      }
         
    },

    loadTop() {
      this.allLoaded = false;
      this.$refs.loadmore.onTopLoaded();
      this.getFile();
    },
    getFile() {
      var _this = this;
      $.ajax({
        type: "post",
        url: _this.url,
        data: {
          key: null,
          currentPage: 1,
          pageSize: 5
        },
        dataType: "json",
        success: function(res) {
          _this.fileList = res.result[0].backfeed;
        }
      });
    },
    toDetail(item) {
      this.$router.push({ path: "/feedDetail", query: { argument: item } });
    }
  },
  components: {
    Near,
    swipercomponent,
    navcomponent,
    mainbtncomponent
  }
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
