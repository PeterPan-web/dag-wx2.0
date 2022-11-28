<template>
<div>
    <headernav :title="title"  v-if="shownav" :style="shownav?'margin-bottom:45px;':''"></headernav>
    <div class="centerimg" >
        <img src="../../static/img/interactioncenter.jpg">
    </div>
    <div class="centerp">
<p>在您的身边，或许还保留有记录着珍贵历史的信函、
日记、书稿、报刊、字画、谱牒、砖瓦、照片、录像，
甚至在您脑海中还留存有过去岁月的难忘回忆。这些
都是那样真实、亲切，汇集在一起，将使弋江区的历
史记忆更完整、更深邃。
</p> 
<p>
  在此，诚挚欢迎您以及您周围的人们，踊跃提供线索，
积极捐献，和我们一起努力，让传统与开放在这里兼
容互动、历史遗存与现在文明在这里交相辉映。
</p>
    </div>
<div class="centerbtn">
 <mainbtncomponent :list="list"></mainbtncomponent>
</div>
</div>
</template>
<script>
import headernav from "../../components/header.vue";
import mainbtncomponent from "../../components/mainButton.vue";
export default {
  components: {
    headernav,
    mainbtncomponent
  },
  data() {
    return {
      title: "互动中心",
            shownav:true,
      list: [
        {
          content: "我来帮忙",
          path: "/lethelp",
          url: "static/img/btnimg/wlbm.png"
        },
        // {
        //   content: "我来帮忙",
        //   path: "/help",
        //   // path: "/center",
        //   url: "static/img/btnimg/wlbm.png"
        // },
        {
          content: "我有档案",
          path: "/haveHelp",
          url: "static/img/btnimg/wyda.png"
        }
      ]
    };
  },
  created(){
          if(this.$route.query.alone){
   this.shownav=false
  }
  }
};
</script >

<style scoped>
.centerimg {
  margin-top: 48px;
  width: 100%;
}
.centerimg img {
  width: 23em;
}
.centerp{
  text-align: left;
  font-size: 13px;
  padding: 0.5em;
background-color: whitesmoke;
}
</style>
