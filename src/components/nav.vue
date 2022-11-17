<template>
  <div>
    <div v-if="!login">
      <div class="nav1"
           @click="toNext(pathto)">
        <p >登陆</p>
      </div>
    </div>
    <div v-if="login">
      <div class="nav"
           @click="toNext(pathto)">
        <p>{{nav}}</p>
        <img style="width:28px;height:28px;transform:rotateY(180deg);margin-top:1px"
             src="static/img/xiao.png">
      </div>
      <div>
        <mainbtncomponent :list="list"></mainbtncomponent>
      </div>
    </div>
  </div>
</template>

<script>
import mainbtncomponent from '../components/mainButton.vue'
export default {
  name: 'navContent',
  data() {
    return {
      list: [
        {
          content: '我的评论',
          path: '/mycomment',
          url: 'static/img/btnimg/wdpl.png',
        },
        {
          content: '我的收藏',
          path: '/myCollection',
          url: 'static/img/btnimg/wdsc.png',
        },
        // {
        //   content: '我的投稿',
        //   path: '/myContribution',
        //   url: 'static/img/btnimg/wdtg.png',
        // },
      ],
    }
  },
  props: ['nav', 'pathto', 'login'],
  methods: {
    toNext(path) {
      this.$router.push({ path: path })
    },
  },
  components: {
    mainbtncomponent,
  },
}
</script>

<style>
.nav {
  display: flex;
  height: 30px;
  line-height: 30px;
  background: #ef6b42;
  color: #fff;
  padding: 0em 0.5em 0em 0.5em;
  justify-content: space-between;
}
.nav1{
  height: 30px;
  line-height: 30px;
  background: #ef6b42;
  color: #fff;
  padding: 0em 0.5em 0em 0.5em;
}
</style>
