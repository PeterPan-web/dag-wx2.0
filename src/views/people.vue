<template>
  <!-- <headernav :title="title">
      <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
	  <img :src="url" style="width:25px" />
    </headernav> -->
	<div>
		<div><user></user></div>
		<div style="margin-top:30%;left:5%;position:absolute;width:90%"><user1></user1></div>
		
	</div>
</template>

<script>
import {
    Toast
  } from 'mint-ui';
  import headernav from'../components/header.vue'
  import user from'../components/user.vue'
  import user1 from'../components/user1.vue'
  export default {
    name: "people",
    data() {
      return {
        path:"/interaction",
        title: "个人中心",
		url:"static/img/center2.png",
        };
    },
    methods:{
      goBack(){
      	this.$router.back(-1);
      }
    },
    components: {
      headernav,
	  user,
	  user1
    },
  };
</script>

<style>
</style>
