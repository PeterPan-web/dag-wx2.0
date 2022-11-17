 <template>
 <div style="padding:4px">
     <headernav :title="headtitle" style="margin-bottom:48px"></headernav>
  <div style="overflow: auto;height:calc(100vh - 110px);text-align: center;">
		<mt-field  placeholder="请输入档案主题" v-model="title" style="border-bottom:1px solid #ccc;"></mt-field>
    <div style="text-align:left;margin-left:8px">
      <p>档案介绍</p>
    </div>
		<mt-field placeholder="档案介绍" type="textarea" rows="5" v-model="content" style="border-bottom:1px solid #ccc;height:140px"></mt-field>
    <div>
    <mt-switch class="openbtn" v-model="value">{{isOpen}}</mt-switch>  
    </div>
    <div class="uploaderbox">
      <p>
      添加照片
      </p>
      <van-uploader :after-read="afterRead" /> 
    </div>
     <!-- <uploadPic></uploadPic> -->
		<span class="submitFlieBtn" @click="isStop">确认提交</span>
	</div>
 </div>
 
	
</template>

<script>
  import  uploadPic  from "../../components/uploadPic.vue";
  import headernav from "../../components/header.vue";
  import { readLocalStorageid } from "../../utils/index";
	import { Indicator } from 'mint-ui';
	import Bus from '../../components/bus.js'
	import uploadcomponent from '../../components/uploadPic.vue'

export default{
    name:"haveHelp",

		data(){
			return{
        headtitle:"我有档案",
         fileList: [
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: 'https://cloud-image', isImage: true },
      ],
				list:[],
				title:"",
				content:"",
				dataBase:[],
				value:false,
				isOpen:"公开",
				status:0
			}
		},
    
		mounted(){
			var _this = this;
			Bus.$on("getList",(list) =>{
				_this.list = list;

			});
		},
		watch:{
			value(newValue,oldValue){
					this.isOpen ="公开";
					if(newValue){
						this.isOpen ="隐私";
					}
			}
		},
		methods:{
      afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
			isStop(){
				var _this = this;
				this.popupVisible = false;
        var openId = readLocalStorageid()
        console.log(openId);
				$.ajax({
					type:"post",
					url:FORBIDDEN_URL,
					data:{
						openid:openId
					},
					success:function(res){
						if(res.success){
							if(res.result[0].status ==1){
								_this.$toast("你已经被禁言，请联系系统管理员");
								return;
							}
							_this.submitFile();
						}
					}
				});
			},
			submitFile(){
				var _this = this;
        var openId = readLocalStorageid()
				if(_this.value){
					_this.status = 1;
				}
				if(_this.title ==""){
					_this.$toast("标题不能为空");
					return;
				}
				if(_this.content ==""){
					_this.$toast("说明内容不能为空");
					return;
				}
				$.ajax({
				type:"post",
				url:MYHAVE_URL,
				data:{
					title:_this.title,
					openid:openId,
					introduce:_this.content,
					opennessPrivacy:_this.status,
					mediaId:JSON.stringify(_this.list),
				},
				dataType:"json",
				beforeSend:function(){
					Indicator.open({
						text:"正在上传，请稍等...",
						spinnerType: 'fading-circle'
					});
				},
				success:function(res){
          console.log(res);
					Indicator.close();
					if(res.success){
					  if(res.result[0].loginS==0){
              _this.$toast("请关注公众号");
              return;
             }
						_this.$toast(res.result[0].msg);
						_this.title ="";
						_this.content ="";
						Bus.$emit("clear",1);
					}
				},error:function(){
					Indicator.close();
				}
			});
			}
		},
		components:{
			uploadcomponent,
    headernav,
    uploadPic
		}
	}
</script>

<style>
	.imgList{
		margin-left:5px;
		margin-top:10px;
		text-align:left;
	}
	.submitFlieBtn{
		display: inline-block;
		padding:7px 50px;
    background-color: white !important;
		color:rgb(0, 0, 0) !important;
		font-size:16px;
		border-radius: 5px;
		margin-top:150px ;
	}
  .uploaderbox{
    position: absolute;
    left: 10px;
margin-top:40px;
  }
  .openbtn{
    position: absolute;
    right: 0;
  }
</style>
