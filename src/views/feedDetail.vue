<template>
	<div>
		<headernav :path="path" :title="title"></headernav>
		<div style="height:calc(100vh - 50px);overflow: auto;margin-top:50px;">
			<p style="text-align: left;font-size:14px;font-weight: 600;margin:5px 10px">意见内容</p>
			<textcomponent :text="createDate" style="text-align: left;"></textcomponent>
			<textcomponent :text="text" style="text-align: left;"></textcomponent>
			<imgcomponent :imgList="imgList" :com="com"></imgcomponent>
			<p style="border-top:#ccc solid 1px;text-align: left;font-size:14px;font-weight: 600;padding:10px 0px;margin:0px 10px">回复的信息</p>
			<textcomponent v-if="replyDate==null" :text="无" style="text-align: left;"></textcomponent>
      <textcomponent v-else :text="replyDate" style="text-align: left;"></textcomponent>
			<textcomponent v-if="replay==null" :text="无" style="text-align: left;"></textcomponent>
			<textcomponent v-else :text="replay" style="text-align: left;"></textcomponent>
		</div>
	</div>
</template>

<script>
	import headernav from '../components/header.vue'
	import textcomponent from '../components/text.vue'
	import imgcomponent from '../components/feedFile.vue'
	export default{
		name:"feedDetail",
		data(){
			return{
				params:{},
				path:"/backfeed",
				title:"问题反馈详情",
				replay:"",
				text:"",
				id:"",
				createDate:"",
				replyDate:"",
				browse:"",
				com:HOST_SERVER,
				argument:{},
				imgList:[]
			}
		},
		created(){
			this.getParams();
			this.argument = this.params.argument;
			this.text = this.argument.CONTENT;
			this.replay = this.argument.REPLYCONTENT;
			this.createDate = this.argument.CREATEDATE;
			this.replyDate = this.argument.REPLYDATE;
			this.browse = this.argument.BROWSE;
			this.id = this.argument.ID;
			WeixinJSBridge.call('hideToolbar');
			WeixinJSBridge.call('hideOptionMenu');
		},
		mounted(){
			this.getFile();
			this.addBrowse();
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
					url:SUGGESTION_DETAIL_URL,
					data:{
						id:_this.id,
						openid:openId
					},
					dataType:"json",
					success:function(res){
						_this.imgList = res.result[0].attachment;
					}
				});
			},
			addBrowse(){
          var _this = this;
          var openId = localStorage.getItem("openId");
          $.ajax({
            type:"post",
            url:BROWSE_URL,
            data:{
              id:_this.id,
              openid:openId,
              browse:_this.browse,
              createDate:_this.createDate
            },
            dataType:"json",
            success:function(res){

            }
          });
        }
		},
		components:{headernav,textcomponent,imgcomponent}
	}
</script>

<style>
</style>
