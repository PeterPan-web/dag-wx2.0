<template>
	<div>
		<headernav :title="title"></headernav>
		<div class="main">
			<titlecomponent :title="title1"></titlecomponent>
			<textcomponent :text="text"></textcomponent>
			<imgcomponent :com="com" :imgList="imgList"></imgcomponent>
			<p style="text-align: left;margin-left:15px;">回复信息：{{msg}}</p>
		</div>
	</div>
	
</template>

<script>
	import headernav from '../components/header.vue'
	import titlecomponent from '../components/title.vue'
	import textcomponent from '../components/text.vue'
	import imgcomponent from '../components/haveFile.vue'
	import loadcomponent from '../components/helpMore.vue'
	import bottomcomponent from '../components/bottomNormal.vue'
	export default{
		name:"helpDetail",
		data(){
			return{
				list:[],
				title:"我来帮忙详情",
				path:"/center",
				selected:"我来帮忙详情",
				title1:"",
				id:"",
				msg:"",
				argument:{},
				imgList:[],
				com:HOST_SERVER,
				url:HELP_COMMENT_URL,
				help:{
					addComment:HELP_PUSH_URL,
					ps:{
						id:""
					}
				},
				text:""
			}
		},
		created(){
			this.getParams();
			this.argument = this.params.argument;
			this.id = this.argument.ID;
			this.help.ps.id = this.argument.ID;
			this.title1 = this.argument.TITLE;
			this.text = "<p style='text-align:left;margin-left:15px;font-size:16px'>"+this.argument.MAINWORD+"</p>";
			this.msg = this.argument.VERIFYINFO;
			this.title = this.$route.query.title +"详情";
			WeixinJSBridge.call('hideToolbar');
			WeixinJSBridge.call('hideOptionMenu');
		},
		mounted(){
			var _this = this;
			_this.getFile();
			window.onresize=function(){
			}
		},
		methods:{
			getParams(){
				this.params = this.$route.query;
			},
			getFile(){
				var _this = this;
				var openId = localStorage.getItem("openId");
				$.ajax({
					type:"post",
					url:HAVE_DETAIL_URL,
					data:{
						id:_this.id,
						openid:openId
					},
					dataType:"json",
					success:function(res){
						_this.imgList = res.result.archPic;
					}
				});
			}
		},
		components:{
			headernav,
			titlecomponent,
			textcomponent,
			imgcomponent,
			loadcomponent,
			bottomcomponent
		}
	}
</script>

<style>
	.main{
		height:calc(100vh - 50px);
		overflow: auto;
		margin-top: 50px;
	}
</style>