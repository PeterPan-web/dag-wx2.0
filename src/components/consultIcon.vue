<template>
	<div style="text-align: left;margin-left:10vw;">
		<mt-button style="height:25px;background:#f2f2f2;color:#f8642f;margin-right:5vw;">
	  		<img src="../assets/tip_after.png" height="20" width="20" slot="icon">
		 	 {{p}}
		</mt-button>
		<mt-button style="height:25px;background:#f2f2f2;color:#f8642f">
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
			Bus.$on("getTotal",(p) =>{
				_this.p = p;
			});
			Bus.$on("getRead",(r) =>{
				_this.r =r;
			});
		}
	}
</script>

<style>
</style>
