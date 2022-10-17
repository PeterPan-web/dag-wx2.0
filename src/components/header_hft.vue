<template>
	<div>
		<mt-header :title="title" fixed>
		<i class="icon ion-ionic"></i>
		    <mt-button slot="right" @click="goBack"><img :src="url"/></mt-button>

		</mt-header>
	</div>
</template>

<script>
	export default{
		name:"headernav",
		props:["title","up","show"],
		data(){
			return{
				url:"static/img/close.png"
			}
		},
		methods:{
			goBack(){
				if(this.up){
					return;
				}
				this.$router.back(-1);
			},


			searchHistory(){
				this.$router.push({path:"/historySearch"});
			}
		}
	}
</script>

<style>
</style>
