<template>
	<div id="container" v-if="imgList==[]">
	  <ul>
	    <li v-for="(item,index) in imgList" :key="index" style="margin-top:15px;margin-bottom:15px;">
	      <img v-lazy.container="com+item" style="width:94vw;height:auto;">
	      <p>{{item.TITLE}}</p>
	      <p>{{item.CONTENT}}</p>
	    </li>
	  </ul>
	</div>
</template>

<script>
	export default{
		name:"imgFile",
		props:["imgList","com"]
	}
</script>

<style>
	img[lazy="loaded"] {
	  width:94vw;
	  margin: auto;
	  margin-bottom:15px;
	}
</style>
