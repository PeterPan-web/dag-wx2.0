<template>
  <div>
    <swipercomponent></swipercomponent>
    <mainbtncomponent :list="list"></mainbtncomponent>
    <near :url="nearUrl"></near>
  </div>
</template>

<script>
import swipercomponent from "../components/swiper.vue";
import navcomponent from "../components/nav.vue";
import mainbtncomponent from "../components/mainButton.vue";
import Near from "./near";
export default {
  name: "site",
  data() {
    return {
      list: [
        {
          content: "预约查档",
          path: "/archDetail_sq",
          url: "static/img/center2.png"
        },
        {
          content: "留言咨询",
          path: "/backfeed",
          url: "static/img/backfeed3.png"
        },
        {
          content: "满意度调查",
          path: "/survey",
          url: "static/img/consult3.png"
        },
        { content: "个人中心", path: "/people", url: "static/img/people.png" }
      ],
      mark: "feed",
      nav: "问题反馈",
      url: FEED_URL,
      nearUrl: NEAR_URL,
      allLoaded: false,
      fileList: []
    };
  },
  created() {
    this.getFile();
    document.title = "微服务";
  },
  methods: {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
