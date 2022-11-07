<template>
	<div class="page-tabbar">
		<div class="page-wrap">
			<headnav :title="selected" :path="path" :up="up"></headnav>
			<mt-tab-container class="page-tabbar-container" v-model="selected">
				 <mt-tab-container-item id="我来帮忙">
					<searchcomponent :id="selectedId" :url="mainList.help.baseUrl" :title="selected"></searchcomponent>
				</mt-tab-container-item>
				<mt-tab-container-item id="我的帮忙">
					<searchcomponent :id="selectedId1" :url="mainList.help.otherUrl" :title="selected"></searchcomponent>
				</mt-tab-container-item>
				<mt-tab-container-item id="我有档案">
					<havecomponent></havecomponent>
				</mt-tab-container-item>
				<mt-tab-container-item id="我的档案">
					<searchcomponent1 :id="selectedId2" :url="mainList.have.otherUrl" :title="selected"></searchcomponent1>
				</mt-tab-container-item> 
				<mt-tab-container-item id="预约登记">
        	<register :id="selectedId3" :url="mainList.register.otherUrl" :title="selected"></register>
        </mt-tab-container-item>
			</mt-tab-container>
		</div>
		<mt-tabbar v-model="selected" >
			 <mt-tab-item id="我来帮忙">
				<img slot="icon" :src="imgList[0].url">
				      我来帮忙
			</mt-tab-item>
			<mt-tab-item id="我的帮忙">
				<img slot="icon" :src="imgList[1].url">
				      我的帮忙
			</mt-tab-item>
			<mt-tab-item id="我有档案" >
				<img slot="icon" :src="imgList[2].url">
				      我有档案
			</mt-tab-item>
			<mt-tab-item id="我的档案">
				<img slot="icon" :src="imgList[3].url">
				      我的档案
			</mt-tab-item>
			<mt-tab-item id="预约登记">
        <img slot="icon" :src="imgList[4].url">
              预约登记
      </mt-tab-item> 
		</mt-tabbar>
	</div>



</template>

<script>
import { JudgeloginInteraction } from "../../utils/index";
	import headnav from '../../components/header.vue'
	import havecomponent from '../../components/have.vue'
	import searchcomponent from '../../components/centerSearch.vue'
	import searchcomponent1 from '../../components/haveSearch.vue'
	import register from '../../components/register.vue'
	import Bus from '../../components/bus.js'
	export default{
		name:"help",
		data(){
			return{
				selected:"预约登记",
				path:"/interaction",
				selectedId:"listContent",
				selectedId1:"listContent1",
				selectedId2:"listContent2",
				selectedId3:"listContent3",
				watchId:"",
				up:false,
				imgList:[
				{
					id:"我来帮忙",
					url:"static/img/help.png",
					url_after:"static/img/help_after.png"
				},{
					id:"我的帮忙",
					url:"static/img/my_help.png",
					url_after:"static/img/my_help_after.png"
				},
				{
					id:"我有档案",
					url:"static/img/my_have.png",
					url_after:"static/img/my_have_after.png"
				},
				{
					id:"我的档案",
					url:"static/img/person_arch.png",
					url_after:"static/img/person_arch_after.png"
				},
				{
          id:"预约登记",
          url:"static/img/my_register.png",
          url_after:"static/img/my_register_after.png"
        }
				],
				imgLists:[],
				to:"",
				mainList:{
					help:{
						baseUrl:HELP_URL,
						otherUrl:MYHELP_URL
					},
					have:{
						baseUrl:MYHAVE_URL,
						otherUrl:HAVE_URL
					},
					register:{
            baseUrl:"",
            otherUrl:"",
          }
				},
				result:[],
		        params:{}
			}
		},
		created(){
      JudgeloginInteraction()
			var _this = this;
			this.imgLists = this.imgList;
      this.imgLists[4].url = "static/img/my_register_after.png";
		//	this.imgLists[0].url = "static/img/help_after.png";
			Bus.$on("setUp",(status)=>{
				_this.up = status;
			});
			WeixinJSBridge.call('hideToolbar');
			WeixinJSBridge.call('hideOptionMenu');
		},
		components:{
			headnav,
			searchcomponent,
			havecomponent,
			searchcomponent1,
			register
		},
		watch:{
			selected(newVal,oldVal){
				this.imgList = [
				{
					id:"我来帮忙",
					url:"static/img/help.png",
					url_after:"static/img/help_after.png"
				},{
					id:"我的帮忙",
					url:"static/img/my_help.png",
					url_after:"static/img/my_help_after.png"
				},
				{
					id:"我有档案",
					url:"static/img/my_have.png",
					url_after:"static/img/my_have_after.png"
				},
				{
					id:"我的档案",
					url:"static/img/person_arch.png",
					url_after:"static/img/person_arch_after.png"
				},
				{
          id:"预约登记",
          url:"static/img/my_register.png",
          url_after:"static/img/my_register_after.png"
        }
				];
				for(var i=0;i<this.imgLists.length;i++){
					if(newVal == this.imgLists[i].id){
						this.imgList[i].url = this.imgList[i].url_after;
					}
				}

			}
		},
		methods:{
			// getParams(){
			// this.to = this.$router.history.current.query.to
			// }
		}

	}
</script>

<style>
	.page-tabbar-container{
		margin:40px 0px 0px 0px;
	}
	.mint-tab-container{
		height: calc(100vh - 40px);
		overflow: hidden;
		background-color: white;
	}
</style>
