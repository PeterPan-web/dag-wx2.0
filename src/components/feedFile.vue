<template>
	<div id="container" style="text-align: left;">
	  <ul>
	    <li v-for="item in imgList" style="margin-top:15px;margin-left:15px;display:inline-block;width:22vw">
	      <img v-lazy.container="com+item.PICTURE" style="width:22vw;height: 22vw;">
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
	  margin: auto;
	  margin-bottom:15px;
	}
</style>