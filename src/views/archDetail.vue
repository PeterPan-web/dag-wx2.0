<template>
	<div>
		<headnav :title="title"></headnav>
		<div class="mainCont">
			<titlecomponet :title="titleContent"></titlecomponet>
			<txtcomponet></txtcomponet>
			<!-- <imgcomponent></imgcomponent> -->
			<filecomponent></filecomponent>
			<!-- <iconcomponent style="margin-top:10px"></iconcomponent> -->
			<morecomponent :argument="List.ps" :url="url"></morecomponent>
		</div>
		 <mt-tabbar v-model="selected" fixed>
	 		   <bottomcomponent :list="List"></bottomcomponent>
	 	</mt-tabbar> 
	</div>
</template>

<script>
	import headnav from '../components/header.vue'
	import titlecomponet from '../components/title.vue'
	import txtcomponet from '../components/txt.vue'
	import filecomponent from '../components/fileList.vue'
	import morecomponent from '../components/loadMore.vue'

	export default{
		name:"archDetail",
		data(){
			return{
				selected:"我的档案详情",
				params:{},
				list:[],
				argument:{},
				path1:"/search",
				title:"档案检索详情",
				titleContent:"",
				url:ARCHDETAIL_URL,
				mark:0,
				List:{
					praiseUrl:ARCHPRAISE_URL,
					collectionUrl:ARCHCOLLECT_URL,
					commentUrl:ARCHCOMMENT_URL,
					forBidden:FORBIDDEN_URL,
					ps:{
						id:"",
						title:"",
						tableName:"",
						primaryKey:""
					}
				}

			}
		},
		components:{
			headnav,
			titlecomponet,
			txtcomponet,
			// iconcomponent,
			morecomponent,
			filecomponent,
			// bottomcomponent
		},
		created(){
			this.argument = JSON.parse(localStorage.getItem("argument"));
			this.mark = localStorage.getItem("mark");
			/*this.getParams();
			this.argument = this.params.argument;
			this.mark = this.params.mark;*/
			this.titleContent = this.argument.TITLE;
			this.List.ps.primaryKey = this.argument.PRIMARYKEY;
			this.List.ps.id =  this.argument[this.List.ps.primaryKey];
			if(this.mark ==1){
				this.List.ps.id =  this.argument.PID;
			}else{
				this.List.ps.id =  this.argument[this.List.ps.primaryKey];
			}
			this.List.ps.tableName =  this.argument.TABLENAME;
			this.List.ps.title =  this.argument.TITLE;
			var _this = this;
			 WeixinJSBridge.call('hideToolbar');
			 WeixinJSBridge.call('hideOptionMenu');
		},
		methods:{
			getParams(){
				this.params = this.$route.query;
			}
		}
	}
</script>

<style>
	.mainCont{
		margin-top:50px;
		margin-bottom:50px;
		height:calc(100vh - 100px);
		overflow:auto;
	}
</style>
