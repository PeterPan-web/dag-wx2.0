<template>
	<div style="text-align: left;margin-left:10vw;">

		<mt-button style="height:20px;background:#f2f2f2;color:#f8642f">
	  		<img src="../assets/scan.png" height="20" width="20" slot="icon">
		 	 {{r}}
		</mt-button>
	</div>
</template>

<script>
	import Bus from '../components/bus.js'
	export default{
		name:"icon",
		data(){
			return{
				p:0,
				r:0
			}
		},
		mounted(){
			var _this = this;
			Bus.$on("praise",(p,r) =>{
				_this.p = p;
				_this.r = r;
			});
			Bus.$on("getTotal",(p) =>{
				_this.p = p;
			});
		}
	}
</script>

<style>
</style>
