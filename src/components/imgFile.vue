<template>
	<div id="container" v-if="!imgList==[]">
	  <ul>
	    <li class="imgli" v-for="(item,index) in imgList" :key="index" >
	      <img v-lazy.container="com+item"  class="imgshow">
	      <p>{{item.TITLE}}</p>
	      <p>{{item.CONTENT}}</p>
	    </li>
	  </ul>
	</div>
</template>

<script>
	export default{
		name:"imgFile",
		props:["imgList","com"],
	}
  
</script>

<style scoped>
	img[lazy="loaded"] {
	  /* width:94vw; */
	  margin: auto;
	  margin-bottom:15px;
	}
  .imgli{
margin-top:15px;margin-bottom:15px;
  }
.container{
  width: calc(100vw);
  margin-bottom: 0.5rem;
}
.imgshow{
width:calc(80vw);
height:calc(30vh);
}
</style>
