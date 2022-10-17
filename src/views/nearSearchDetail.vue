<template>
	<div>
		<headernav :title="title"></headernav>
		<div class="nearContent">
			<div class="nearBg" :style="objStyle">
				<div style="margin-bottom:40px">
					<strong style="font-size: 18px;color:#fff;padding:15px;text-align: center;">{{content.NAME}}</strong>
				</div>
				<div>
					<span><img :src="leftImg.phone" width="100%"/></span>
					<p>{{content.PHONE}}</p>
				</div>
				<div>
					<span><img :src="leftImg.address" width="100%"/></span>
					<p>{{content.ADDRESS}}</p>
				</div>
				<div>
					<span><img :src="leftImg.date" width="100%"/></span>
					<p>{{content.OPENDATE}}</p>
				</div>
				<div>
					<span><img :src="leftImg.instroduce" width="100%"/></span>
					<p>{{content.BRIEFINTRODUCTION}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import headernav from '../components/header.vue'
	export default{
		name:"nearSearchDetail",
		data(){
			return{
				title:"就近查档详情",
				params:{},
				content:{},
				objStyle:{
					background:"url(static/img/bg.jpg) no-repeat",
					backgroundSize:"100% 100%",
					height:"calc(100vh - 85px)",
					paddingTop:"45px",
					overflow:"auto"
				},
				leftImg:{
					instroduce:"static/img/instroduce.png",
					phone:"static/img/phone.png",
					address:"static/img/address.png",
					date:"static/img/date.png"
				}
			}
		},
		created(){
			this.getParams();
			this.getFile();
			WeixinJSBridge.call('hideToolbar');
			WeixinJSBridge.call('hideOptionMenu');
		},
		methods:{
			getParams(){
				this.params = this.$route.query;
			},
			getFile(){
				var _this = this;
				$.ajax({
					type:"post",
					url:NEARDETAIL_URL,
					data:{
						id:_this.params.argument.ID
					},
					dataType:"json",
					success:function(res){
						console.log(res)
						_this.content = res.result[0].nears[0];
					}
				});
			}
		},
		components:{
			headernav
		}
	}
</script>

<style>
	.nearContent{
		margin-top:40px;
		height:calc(100vh - 40px);
		overflow: auto;
	}
	.nearBg div{
		margin:15px 15px;
	}
	.nearBg div span{
		display: inline-block;
		width:30px;
		height:40px;
		margin:0px 0px;
	}
	.nearBg div p{
		display:inline-block;
		text-align: left;

		color:#fff;
		font-size:16px;
		width:calc(100vw - 80px);
		vertical-align: top;
	}
</style>
