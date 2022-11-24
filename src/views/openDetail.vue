<template>
	<div>
		<headernav :title="title"></headernav>
		<div style="height:calc(100vh - 95px);overflow-y:auto;margin-top:50px">
			<titlecomponent :title="titleT"></titlecomponent>
			<p style="padding:8px 0px;text-align: center;color:#CCC"><span>发布时间：{{argument.PUBLISHDATE}}</span></p>
			<textcomponent :text="textContent"></textcomponent>
      <!-- 图片的显示与否 -->
			<imgcomponent></imgcomponent>
      <!-- 点赞和浏览 -->
			 <iconcomponent></iconcomponent>
       <!-- 下方评论 -->
			<morecomponent :argument="argument" :url="url" :getComment="List.getComment"></morecomponent> 
		</div>
    <!-- 下方评论 -->
		 <mt-tabbar v-model="selected" fixed>
	 		   <bottomcomponent :list="List"></bottomcomponent>
	 	</mt-tabbar> 
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
		name:"openDetail",
		data(){
			return{
				path:"open",
				title:"信息公开详情",
				params:{},
				titleT:"",
				textContent:"",
				selected:"",
				argument:{},
				com:HOST_HOME,
				url:OPEN_DETAIL_URL,
				imgList:[],
				List:{
					praiseUrl:OPEN_PRAISE_URL,
					collectionUrl:OPEN_COLLECT_URL,
					commentUrl:OPEN_ADD_URL,
					getComment:OPEN_COMMENT_URL,
					forBidden:FORBIDDEN_URL,
					ps:{
						id:"",
						tableName:""
					}
				}
			}
		},
		created(){
			this.getParams();
			this.argument = this.params.argument;
			this.titleT = this.params.argument.TITLE;
			this.textContent = this.params.argument.CONTENTHTML;
			this.selectId = this.params.argument.ID;
			this.imgList.push(this.params.argument.PICTURE);
			this.List.ps.id =this.params.argument.ID;
			this.List.ps.title =this.params.argument.TITLE;
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
		},
		methods:{
			getParams(){
				this.params = this.$route.query;
			}
		}
	}
</script>

<style>
</style>
