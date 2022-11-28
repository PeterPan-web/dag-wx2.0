<template>
	<div class="set">
		<headernav :title="title"></headernav>
		<div class="main" id="btSet">
			<titlecomponent :title="title1" ></titlecomponent>
      <imgcomponent :id="id" :url="url" style="margin-bottom:7rem;"></imgcomponent>
			<textcomponent :text="text" ></textcomponent>
			<loadcomponent :argument="argument" :url="url"></loadcomponent>
		</div>
		<mt-tabbar  v-model="selected">      
	 		  <bottomcomponent :list="help"></bottomcomponent>
	 	</mt-tabbar> 
	</div>
	
</template>

<script>
	import headernav from '../components/header.vue'
	import titlecomponent from '../components/title.vue'
	import textcomponent from '../components/text.vue'
	import imgcomponent from '../components/helpFile.vue'
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
				argument:{},
				imgList:[],
				url:HELP_COMMENT_URL,
				help:{
					addComment:HELP_PUSH_URL,
					forBidden:FORBIDDEN_URL,
					ps:{
						id:""
					}
				},
				text:""
			}
		},
		created(){
			this.getParams();
      console.log(	this.params);
			this.argument = this.params.argument;
			this.id = this.argument.ID;
			this.help.ps.id = this.argument.ID;
			this.title1 = this.argument.TITLE;
			this.text = this.argument.HELPINFO;
			this.title = this.$route.query.title +"详情";
			WeixinJSBridge.call('hideToolbar');
			WeixinJSBridge.call('hideOptionMenu');
		},
		mounted(){
		},
		methods:{
			getParams(){
				this.params = this.$route.query;
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
	#btSet{
		height:calc(100vh - 100px);
		overflow: auto;
		margin-top: 50px;
    
	}
</style>