<template>
	<div>
		<headnav :path="path" :title="title"></headnav>
		<div class="guideContent" v-html="message" style="color:#444;margin-top:40px;height:calc(100vh - 40px);overflow: auto;background:url(static/img/u244.jpg);background-size: 100% 100%;"></div>
	</div>
</template>

<script>
	import headnav from '../components/header.vue'
	export default{
		name:"guide",
		data(){
			return {
				message:"",
				path:"/interaction",
				title:"查档指南"
			}
		},
		components:{headnav},
		created:function(){
			this.getMessage();
			WeixinJSBridge.call('hideToolbar');
			WeixinJSBridge.call('hideOptionMenu');
		},
		methods:{
			getMessage(){
				var _this = this;
				$.ajax({
					type:"post",
					url:GUIDE_URL,
					dataType:"json",
					data:{
						type:"1"
					},
					success: function (res) {
			        	_this.message = res.result[0].search[0].CONTENT;
			        },
			        error:function(status){
			        }
				});
			}
		}
	}
</script>

<style>
	.mint-header.is-fixed{
		z-index:2;
	}
	.guideContent{
		margin-top:50px;
		text-align: left;
		height:calc(100vh - 40px);
		overflow: auto;
	}
	.guideContent p{
		margin:10px 3vw;
		font-size:14px;
	}
</style>