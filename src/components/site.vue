<template>
  <div>
    <swipercomponent :list="imgList"></swipercomponent>
    <mainbtncomponent :list="list"></mainbtncomponent>
    <navcomponent :nav="nav"></navcomponent>
    <listcomponent :mark="mark" :url="url" style="margin-bottom:15px"></listcomponent>
    <nearcomponent :mark="mark" :url="nearUrl"></nearcomponent>
  </div>
</template>

<script>
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
      	{content:"档案检索",path:"/search",url:"static/img/search2.png"},
      	{content:"移动展厅",path:"/show",url:"static/img/show2.png"},
      	{content:"档案资讯",path:"/consult",url:"static/img/consult2.png"},
      	{content:"信息公开",path:"/open",url:"static/img/open2.png"}
      ],
      mark:"consult",
			nav:"最新资讯",
			url:NEWCONSULT_URL,
			nearUrl:NEAR_URL
    }
  },
  created(){
  	document.title="微服务";
  },
  methods:{
  	next(){
  		this.$router.push({path:"/demo"});
  	}
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
</style>
