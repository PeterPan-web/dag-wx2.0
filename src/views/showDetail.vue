<template>
	<div>
		<headernav :title="title"></headernav>
		<div style="height: calc(100vh - 82px);overflow: auto;margin-top: 40px;">
			<titlecomponent :title="titleT"></titlecomponent>
			<p style="padding:8px 0px;text-align: left;"><span style="color:#0B8DEF;display: inline-block;padding:0px 15px">{{argument.INFORMATIONTYPE}}</span><span>{{argument.PUBLISHDATE}}</span></p>

			<!--<imgcomponent :imgList="imgList" :com="com"></imgcomponent>-->
			<textcomponent :text="textContent" style="text-align: left;"></textcomponent>
			<!-- <iconcomponent></iconcomponent> -->
			<morecomponent :argument="argument" :url="url"></morecomponent>
		</div>
		<!-- <mt-tabbar v-model="selected" fixed>
	 		   <bottomcomponent :list="List"></bottomcomponent>
	 	</mt-tabbar> -->
	</div>
</template>

<script>
	import headernav from '../components/header.vue'
	import titlecomponent from '../components/title.vue'
	import textcomponent from '../components/text.vue'
	import imgcomponent from '../components/imgFile.vue'
	import iconcomponent from '../components/consultIcon.vue'
	import morecomponent from '../components/more.vue'
	import bottomcomponent from '../components/consultBottom.vue'
	export default{
		name:"showDetail",
		data(){
			return{
				title:"移动展厅详情",
				titleT:"",
				selected:"移动展厅详情",
				params:{},
				textContent:"",
				selectId:"",
				imgList:[],
				argument:{},
				com:HOST_HOME,
				url:SHOWDETAIL_URL,
				List:{
					praiseUrl:SHOWPRAISE_URL,
					collectionUrl:SHOWCOLLECT_URL,
					commentUrl:SHOWADD_URL,
					getComment:SHOWGET_URL,
					forBidden:FORBIDDEN_URL,
					ps:{
						id:"",
						title:"",
						tableName:""
					}
				}
			}
		},
		methods:{
			getParams(){
				this.params = this.$route.query;
			}
		},
		created(){
			this.getParams();
			this.argument = this.params.argument;
			this.getParams();
			this.argument = this.params.argument;
			this.titleT = this.params.argument.TITLE;
			this.textContent = this.params.argument.CONTENTHTML;
			this.selectId = this.params.argument.ID;
			this.imgList.push(this.params.argument.PICTURE);
			this.List.ps.id =this.params.argument.ID;
			this.List.ps.title =this.params.argument.TITLE;
			var _this = this;
			WeixinJSBridge.call('hideToolbar');
			WeixinJSBridge.call('hideOptionMenu');
		},
		components:{
			headernav,
			titlecomponent,
			textcomponent,
			imgcomponent,
			iconcomponent,
			morecomponent,
			bottomcomponent
		}
	}
</script>

<style>
</style>
