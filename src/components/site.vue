<template>
  <div class="site"> 
    <swipercomponent :list="imgList"></swipercomponent>
    <div style=" width: calc(100vw)">
    <mainbtncomponent :list="list"></mainbtncomponent>  
    </div>
    <navcomponent :nav="nav" :pathto="pathto" ></navcomponent>
     <!-- <listcomponent :mark="mark" :url="url" style="margin-bottom:15px"></listcomponent> 
     <nearcomponent :mark="mark" :url="nearUrl"></nearcomponent>  -->
     <!-- <div @click="pushname">1111111111111</div> -->
     <!-- <div class="clearnull" v-if="clearlogin" @click="clearloacal">
      <p>清除缓存</p>
    </div> -->
  </div>
</template>

<script>

import { postSlow } from "../http/api/Universal";
import swipercomponent from '../components/swiper.vue'
import navcomponent from '../components/nav.vue'
import listcomponent from '../components/list.vue'
import nearcomponent from '../components/near.vue'
import mainbtncomponent from '../components/mainButton.vue'
export default {
  name: 'site',
  data () {
    return {
      list:[
      	{content:"档案检索",path:"/search",url:"static/img/btnimg/dajs.png"},
        {content:"红色记忆",path:"/redlist",url:"static/img/btnimg/hsjy.png"},
      	{content:"档案资讯",path:"/consult",url:"static/img/btnimg/dazx.png"},
        {content:"信息公开",path:"/open",url:"static/img/btnimg/xxgk.png"},
      	{content:"移动展厅",path:"/show",url:"static/img/btnimg/yycd.png"},
        {content:"就近查档",path:"/nearSearch",url:"static/img/btnimg/jjcd.png"},
      ],
      mark:"consult",
			nav:"个人中心",
			url:NEWCONSULT_URL,
			nearUrl:NEAR_URL,
      imgList:[],
      pathto:"/peopleSite",
      // clearlogin:false,
    }
  },
  created(){
  	document.title="微服务";
    postSlow();
     if (JSON.parse(localStorage.getItem("yjqloginId"))==null) {
      this.$router.push('peopleSite')
      //  this.clearlogin=false
     }else{
      //  this.clearlogin=true
     }
  },
  methods:{
    pushname(){
     this.$router.push('personalspace')
    },
//     clearloacal(){
//     localStorage.removeItem('yjqloginId');
//     location.reload();
// },
  },
  components:{
  	swipercomponent,
  	navcomponent,
  	listcomponent,
  	mainbtncomponent,
  	nearcomponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
