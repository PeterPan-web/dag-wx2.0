<template>
  <div class="myContribution">
    <headernav :title="title"
               style="margin-bottom:45px"></headernav>
<mt-navbar v-model="selected1">
  <mt-tab-item id="1">档案投稿</mt-tab-item>
  <mt-tab-item id="2">帮忙投稿</mt-tab-item>
</mt-navbar>

<!-- tab-container -->
<mt-tab-container v-model="selected1">
  <mt-tab-container-item id="1">
  <contribute :propsurl="url"></contribute>
  </mt-tab-container-item>
  <mt-tab-container-item id="2">
     <contributehelp :propsurl="helpurl"></contributehelp>
  </mt-tab-container-item>
</mt-tab-container>
  </div>
</template>

<script>
import contribute from './contribute.vue'
import contributehelp from './contributehelp.vue'
import headernav from '../../components/header.vue'
export default {
  name: 'myContribution',
  components: {
    headernav,
    contribute,
    contributehelp
  },
  data() {
    return {
      title: '我的投稿',
      selected1: "1",
      url: HAVE_URL,
      helpurl:MYHELP_URL,
    }
  },
  created(){
  },

  methods:{

  }
}
</script >

<style scoped>
.myContribution{
  background: rgba(0,0,0,0.00);}

</style>