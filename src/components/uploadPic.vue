<template>
	<div style="text-align: center;">
		<div v-for ="(item,index) in imgPath" style="display:inline-block" class="upload">
			<div style="position:relative">
				<span class="close" @click="del(index)" v-if ="item.isShow">x</span>
				<img :src="item.url" alt="" @click ="actionPicture(index,item.isShow)" width ="80px" height="80px"/>
			</div>

		</div>

		<mt-actionsheet
		  :actions="actions"
		  v-model="sheetVisible">
		</mt-actionsheet>
	</div>
</template>

<script>
	import Bus from '../components/bus.js'
	export default{
		name:"upload",
		data(){
			return{
				sheetVisible:false,
				imgPath:[],
				localId:[],
				localImg:[],
				value:false,
				status:0,
				count:6,
				actions:[

				]
			}
		},
		created(){
		},
		mounted(){
			var _this = this;

			Bus.$on("clear",(m) =>{
				_this.imgPath =[];
				_this.localImg =[];
				_this.imgPath.push({url:"static/img/add.png",isShow:false});
			});
				$.ajax({
				type:"post",
				url:PARAMS_URL,
				data:{url:window.location.href.split('#')[0]},
				dataType:"json",
				success:function(res){
					wx.config({
	                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	                appId: res.result[0].appid, // 必填，企业号的唯一标识，此处填写企业号corpid
	                timestamp: res.result[0].timestamp, // 必填，生成签名的时间戳
	                nonceStr: res.result[0].nonceStr, // 必填，生成签名的随机串
	                signature: res.result[0].signature, // 必填，签名，见附录1
	                jsApiList: ['checkJsApi',
	                       'chooseImage','uploadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	           });
	           wx.ready(function(){
				});
			}
			});

		},
		activated(){
			this.imgPath =[];
			this.imgPath.push({url:"static/img/add.png",isShow:false});
		},
		methods:{
			actionPicture(index,status){
				var _this =this;
				if(index == this.imgPath.length-1 && !status){
					if(_this.imgPath.length ==1){
						_this.count =6;
					}else{
						_this.count = 7 - _this.imgPath.length;
					}
					wx.chooseImage({
			        count:_this.count, // 默认9
			        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			        sourceType: ['album','camera'], // 可以指定来源是相册还是相机，默认二者都有
			        success: function (res) {
			        	var imgList = res.localIds;
			        	var arrlocal = res.localIds;
			        	for(var i=0;i< imgList.length;i++){
			        		var obj ={};
					 		obj.isShow = true;
					 		obj.url = imgList[i];
					 		_this.imgPath.unshift(obj);
			        	}
			        	_this.upload(arrlocal);
			        }
			    });
				}
			},
			upload(localIds){
				var localId =localIds.shift();
				var _this = this;
	        	wx.uploadImage({
					localId:localId, // 需要上传的图片的本地ID，由chooseImage接口获得
					isShowProgressTips: 1, // 默认为1，显示进度提示
					success: function (res) {
						var serverId = res.serverId; // 返回图片的服务器端ID
						_this.localImg.push(serverId);
						Bus.$emit("getList",_this.localImg);
						if(localIds.length >0){
							_this.upload(localIds); 
						}
					}
				});
			},
	        del(index){
	        	var _this = this;
	        	this.$messagebox({
					title:"提示",
					message:"确认删除该图片吗",
					showCancelButton:true
				}).then(function(e){
					if(e =="confirm"){
						_this.localImg.splice(index,1);
						_this.imgPath.splice(index,1);
						if(_this.imgPath.length ==5){
							if(_this.imgPath[_this.imgPath.length-1].isShow){
								_this.imgPath.push({url:"static/img/add.png",isShow:false});
							}

						}
					}
				});
	        }
		}
	}
</script>

<style>
	.upload img{
		margin-left:calc((100vw - 240px)/4);
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.close{
		display:inline-block;
		width:20px;
		height:20px;
		text-align: center;
		line-height: 20px;
		font-size:16px;
		position:absolute;
		top:3px;
		right:-10px;
		border-radius: 50%;
		background: #ccc;
		color:#fff;
	}

</style>
