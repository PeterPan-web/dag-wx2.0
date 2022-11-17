<template>
  <div class="site"> 
    <swipercomponent :list="imgList"></swipercomponent>
    <mainbtncomponent :list="list"></mainbtncomponent>
    <navcomponent :nav="nav" :pathto="pathto" :login="login"></navcomponent>
     <!-- <listcomponent :mark="mark" :url="url" style="margin-bottom:15px"></listcomponent> 
     <nearcomponent :mark="mark" :url="nearUrl"></nearcomponent>  -->
  </div>
</template>

<script>
import {readLocalStorage} from "../utils/index"
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
        {content:"公开信息",path:"/open",url:"static/img/btnimg/xxgk.png"},
      	{content:"移动展厅",path:"/show",url:"static/img/btnimg/yycd.png"},
        {content:"就近查档",path:"/nearSearch",url:"static/img/btnimg/jjcd.png"},
      ],
      mark:"consult",
			nav:"个人中心",
			url:NEWCONSULT_URL,
			nearUrl:NEAR_URL,
      imgList:[],
      pathto:"/peopleSite",
      login:false,
    }
  },
  created(){
  	document.title="微服务";
    postSlow()
    console.log(readLocalStorage());
    this.iflogin()
  },
  methods:{
    // 判断是否登陆
    iflogin(){
      if (readLocalStorage()==null) {
          this.login=false
      }else{
        this.login=true
      }
    },

    // changeName(){
    //     if(readLocalStorage()==null){
    //         this.nav="登陆"
    //     }else{
    //        this.nav="个人中心"
    //     }
    // }
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
h1, h2 {
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
.site{
width: 100%;
}
</style>
