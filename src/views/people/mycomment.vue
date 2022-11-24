<template>
  <div class="mycomment">
  <myCentercom :title="title" :url="url" :type="type"></myCentercom>
  </div>
</template>

 <script>
import headernav from '../../components/header.vue'
import myCentercom  from "../../components/myCentercom.vue";
export default {
  components: {
    headernav,
    myCentercom
  },
  name: 'mycomment',
  data() {
    return {
      title: '我的评论',
      url: COMMENT_URL,
      type:'comments'
    }
  }
}
</script>
