<template>
	<div>
		<iframe id="file_iframe" src="" style="width:100vw;height:100vh" frameborder='1' v-if="show ==0"></iframe>
		<img :src ="href" v-else-if="show ==1" style="width:100vw;height:auto"></img>
		 <video :src="videoLike" id="videoLike"  v-else-if="show ==3" type="video/mp4" autoplay="autoplay" controls="controls" loop="-1" poster="">
		 </video>
		<!--<iframe :src="url"></iframe>-->
		<span v-else style="display: inline-block;text-align:center;width:100vw;height:90vh;line-height: 90vh;">该文件暂不支持查看</span>
	</div>

</template>

<script>
	export default{
		name:"fileDetail",
		data(){
			return{
				href:null,
				url:null,
				videoLike:null,
				params:{},
				type:"",
				path:"",
				hft_event:0,
				show:0
			}
		},
		created(){
		this.hft_event = localStorage.getItem("hft_event");

		},
		mounted(){
		var event=this.hft_event;
		 if(event!=1){
		    WeixinJSBridge.call('hideToolbar');
            WeixinJSBridge.call('hideOptionMenu');
		 }
			this.getParams();
			this.type = this.params.argument.OBJTYPE;
			this.path = this.params.argument.OBJPATH;
			var u = HOST_HOME +this.path;

			if(this.type == ".pdf"){
				$("#file_iframe").attr("src","static/pdf/web/viewer.jsp?file="+u);
			}else if(this.type ==".jpg" ||this.type ==".png"){
				this.show =1;
				this.href =u;
			}else if(this.type ==".doc"||this.type ==".docx"||this.type ==".xlsx"||this.type ==".xlx"){
				$("#file_iframe").attr("src","https://view.officeapps.live.com/op/view.aspx?src="+u);
			}else if(this.type ==".mp4" ||this.type ==".avi"||this.type ==".AVI"){
			  this.show =3;
			  this.videoLike =u;
      }else{
				this.show =2;
			}
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
