<template>
	<div id="container">
	  <ul>
	    <li v-for="item in imgList" style="margin-top:15px;margin-bottom:15px;">
	      <img v-lazy.container="com+item.PICTURE" style="width:80vw;height:40vh">
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
	  width:80vw;
	  height:40vh;
	  margin: auto;
	  margin-bottom:15px;
	}
</style>