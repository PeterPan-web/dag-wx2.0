<template>
	<div>
    <headernav :title="title" :show="show" style="padding-bottom:50px"></headernav>
		<div class="search" style="background:#ef6b42">
      
    		<input  type="search" class="searchText" placeholder="请输入内容进行搜索" @keyup.enter ="searchFile" v-model="keyWord" @focus="pushText"/>
    		<div class="btn">
    			<mt-button size="small" slot="right" @click="searchFile">搜索</mt-button>
    		</div>
    	</div>
    	<div class="swiper-container" style="height:200px">
		  <div class="swiper-wrapper">
		    <div class="swiper-slide" v-for="(item,index) in imgList" :key="index" :style="item.obj" @click="toDetail(item)">
		    	<p class="bottom" style="z-index:10;color:white;">
		    		<span >{{item.TITLE}}</span>
		    		<span >{{total==0?0:index+1}}/{{total}}</span>
		    	</p>
		    </div>

		  </div>

		</div>
    
		<div style="height:calc(100vh -255px);">
			<div style="height:49px;width:100%;overflow: hidden;">
				<mt-navbar v-model="selected" style="height:55px;display:block;overflow-y:hidden;overflow-x: auto;overflow-x: none;white-space:nowrap">
				  <mt-tab-item v-for="(item,index) in list" :id="item.OPTIONNAME" :key="index" style="text-align:center;display: inline-block;padding:17px 0px;width:25%">{{item.OPTIONNAME}}</mt-tab-item>
				</mt-navbar>
			</div>
			<!-- tab-container -->
			<mt-tab-container v-model="selected" style="height:calc(100vh - 309px);overflow: auto;">
			  <mt-tab-container-item v-for="(item,index) in list" :id="item.OPTIONNAME" :key="index">
			    	<searchcomponent :name="item.OPTIONNAME" :ps="params" style="height:calc(100vh - 306px);overflow: auto;"></searchcomponent>
			  </mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>

</template>

<script>
  import headernav from '../components/header.vue'
	import Bus from '../components/bus.js'
	import searchcomponent from '../components/consultNew.vue'
	export default{
		name:"show",
		data(){
			return{
				title:"移动展厅",
        show:true,
				selected:"",
				keyWord:"",
				selectTitle:"",
				list:[],
				imgList:[],
				cur:0,
				curPage:"",
				total:0,
				com:HOST_HOME,
				url:SHOW_URL,
				params:{
					url:TYPESHOW_URL,
					mark:1
				}
			}
		},
		components:{
			searchcomponent,
      headernav
		},
		created(){
			this.getFile();
			WeixinJSBridge.call('hideToolbar');
			WeixinJSBridge.call('hideOptionMenu');
		},
		watch:{
			selected(newVal,oldVal){
				this.curPage = newVal;
			}
		},
		methods:{
			searchFile(){
				var _this = this;
        
				Bus.$emit("search",_this.curPage,_this.keyWord);
			},
			pushText(){

			},
			getFile(){
				var _this = this;
				$.ajax({
					type:"post",
					url:_this.url,
					data:{
						encode:"YDZTXXLB",
						type:"1"
					},
					dataType:"json",
					success:function(res){
            res.result[0].encodes.splice(3,1)
						_this.list =res.result[0].encodes
						_this.imgList = res.result[0].pic;
						if(_this.imgList.length>0){
							_this.total = _this.imgList.length;
							_this.cur =1;
							for(var i=0;i<_this.imgList.length;i++){
								_this.imgList[i].obj={
									"background":"url("+_this.com+_this.imgList[i].PICTURE+")",
									"backgroundSize":"100% 100%"
								}
							}
							_this.selected = res.result[0].encodes[0].OPTIONNAME;
							_this.selectTitle = _this.imgList[0].TITLE;
							_this.curPage = _this.imgList[0].OPTIONNAME;
							_this.$nextTick(() => {  // 下一个UI帧再初始化swiper
						       _this.initSwiper();
						     });
							/*_this.initSwiper();*/
						}

					}
				});
			},
			initSwiper(){
				var _this = this;
				var mySwiper = new Swiper('.swiper-container', {
					  autoplay: {
			            disableOnInteraction: false
			          },
					  speed:1000,
					  loop:true,
					  effect:"slide",
					  observer:true,
					  observeParents:true
					});
			},
			toDetail(item){
				this.$router.push({path:"/showDetail",query:{argument:item}})
			}
		}
	}
</script>

<style>
.search{
  display: flex;
  align-items: center;
  
}
.bottom{
	margin-top:150px;
  text-align: center;
  background-color: rgba(0,0,0,0);
  
}

</style>
