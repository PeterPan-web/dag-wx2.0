<template>
  <div>
    <swipercomponent></swipercomponent>
    <firstmainButton :list="list"></firstmainButton>
        <navcomponent :nav="nav" :pathto="pathto"></navcomponent>
    <!-- <near :url="nearUrl"></near> -->
         <!-- <div @click="pushname">1111111111111</div>  -->
    <div class="clearnull" v-if="clearlogin" @click="clearloacal">
      <p>清除缓存</p>
    </div>
  </div>
</template>

<script>
import {postSlow} from "../http/api/Universal";
import swipercomponent from "../components/swiper.vue";
import navcomponent from "../components/nav.vue";
import firstmainButton from "../components/firstmainButton.vue";
import Near from "./near.vue";
export default {
  name: "site",
  data() {
    return {
      list: [
        {
          content: "预约查档",
          path: "/center",
          url: "static/img/btnimg/yycd.png"
        },
        // {
        //   content: "预约查档",
        //    path: "/archDetail_sq",
        //   url: "static/img/btnimg/yycd.png"
        // },
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
      clearlogin:false
    };
  },
  created() {
     postSlow()
    // this.getFile();
    document.title = "微互动";
    if (JSON.parse(localStorage.getItem("ltjyloginId"))==null) {
      this.clearlogin=false
    }else{
      this.clearlogin=true
    }
  },
  methods: {
     clearloacal(){
    localStorage.removeItem('ltjyloginId');
    location.reload();
},
        pushname(){
     this.$router.push('personalspace')
    },

    // loadTop() {
    //   this.allLoaded = false;
    //   this.$refs.loadmore.onTopLoaded();
    //   this.getFile();
    // },
    // getFile() {
    //   var _this = this;
    //   $.ajax({
    //     type: "post",
    //     url: _this.url,
    //     data: {
    //       key: null,
    //       currentPage: 1,
    //       pageSize: 5
    //     },
    //     dataType: "json",
    //     success: function(res) {
    //       _this.fileList = res.result[0].backfeed;
    //     }
    //   });
    // },
  },
  components: {
    Near,
    swipercomponent,
    navcomponent,
    firstmainButton
  }
};
</script>

<style scoped>
.clearnull{
  font-size: 10px;
  width: 140px;
  margin: 12% auto;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 15px;
}
</style>
