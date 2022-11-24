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
        <div class="arrow-right">
        </div>
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
        {
          content: '我的投稿',
          path: '/myContribution',
          url: 'static/img/btnimg/wdtg.png',
        },
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
.arrow-right {
    display: inline-block;
    margin-top: 7px;
    width: 0.85rem;
    height: 0.85rem;
    border-top: .01rem solid rgb(255, 255, 255);
    border-right: .01rem solid rgb(255, 255, 255);
    transform: rotate(45deg);
}
</style>
