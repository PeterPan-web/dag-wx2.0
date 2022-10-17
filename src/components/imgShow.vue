<template>
	<div id="container">
	  <ul>
	    <li v-for="item in imgList" style="margin-top:30px;margin-bottom:15px;">
	      <p>{{item.TITLE}}</p>
	      <img v-lazy.container="com+item.PICTURE">
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
	  width:80vw;
	  height:20vh;
	  margin: auto;
	  margin-bottom:15px;
	}
</style>
