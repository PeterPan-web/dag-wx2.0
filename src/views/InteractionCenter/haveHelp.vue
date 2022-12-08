 <template>
 <div style="padding:14px" class="havehelppage">
     <headernav :title="headtitle" style="margin-bottom:48px"></headernav>
  <div style="overflow: auto;height:calc(100vh - 110px);text-align: center;">
		<mt-field  placeholder="请输入档案主题" v-model="title" style="border-bottom:1px solid #ccc;"></mt-field>
    <div style="text-align:left;margin-left:8px;margin-bottom:8px;margin-top:15px">
      <p>档案介绍</p>
    </div>
    <textarea   class="mtfield"  placeholder="请输入档案内容" cols="20"  rows="10" v-model="content" ></textarea>
		<!-- <mt-field class="mtfield" placeholder="请输入档案内容" type="textarea" rows="7" v-model="content" ></mt-field> -->
      <div class="opendiv">
        <div class="witchbox">
          <p>
    {{isOpen}}
    </p>   
     <van-switch v-model="checked"  size="22px" /> 
        </div>
   
      </div>
    <div class="uploaderbox">
      <p>
      添加照片
      </p>
      <van-uploader v-model="fileList" multiple  :after-read="afterRead"/>
    </div>
		<span class="submitFlieBtn" @click="isStop">确认提交</span>
	</div>
 </div>
</template>

<script>
  // import  uploadPic  from "../../components/uploadPic.vue";
  import headernav from "../../components/header.vue";
	import { Indicator } from 'mint-ui';
	import Bus from '../../components/bus.js'
	// import uploadcomponent from '../../components/uploadPic.vue'

export default{
    name:"haveHelp",
		data(){
			return{
        headtitle:"我有档案",
        checked: false,
         fileList: [
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      ],
				list:[],
				title:"",
				content:"",
				dataBase:[],
				value:false,
				isOpen:"公开",
				status:0,
         PICURL:HAVEPIC_URL,
         postfile:''
			}
		},
    
		mounted(){
			var _this = this;
			Bus.$on("getList",(list) =>{
				_this.list = list;
        console.log(	_this.list);
			});
		},
		watch:{
      checked(newValue,oldValue){
					this.isOpen ="公开";
					if(newValue){
						this.isOpen ="隐私";
					}
			}
		},
		methods:{
       afterRead(file) {
        var _this = this;
      // 此时可以自行将文件上传至服务器
      var formData= new FormData();
      formData.append("file",file.file);
      $.ajax({
					type:"post",
					url:_this.PICURL,
					data:formData,
          mimeType:"multipart/form-data",
           contentType: false,
           processData:false,
					success:function(res){
           _this.postfile=JSON.parse(res).result.imgStr
					}
				});
    },
			isStop(){
				var _this = this;
				// this.popupVisible = false;
        var openId = JSON.parse(localStorage.getItem("ltjyopenId"))
				// $.ajax({
				// 	type:"post",
				// 	url:FORBIDDEN_URL,
				// 	data:{
				// 		openid:openId,
        //     fileList:_this.fileList
				// 	},
				// 	success:function(res){
				// 		if(res.success){
				// 			if(res.result[0].status ==1){
				// 				_this.$toast("你已经被禁言，请联系系统管理员");
				// 				return;
				// 			}
				// 			_this.submitFile();
				// 		}
				// 	}
				// });
        this.submitFile();
			},
			submitFile(){
				var _this = this;
        var openId = JSON.parse(localStorage.getItem("ltjyopenId"))
				if(_this.value){
					_this.status = 1;
				}
				if(_this.title ==""){
					_this.$toast("档案主题不能为空");
					return;
				}
				if(_this.content ==""){
					_this.$toast("档案内容不能为空");
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
					imgStr:_this.postfile,
				},
				dataType:"json",
				beforeSend:function(){
					Indicator.open({
						text:"正在上传，请稍等...",
						spinnerType: 'fading-circle'
					});
				},
				success:function(res){
					Indicator.close();
					if(res.success){
					  if(res.result[0].loginS==0){
              _this.$toast("请关注公众号");
              return;
             }
						_this.$toast(res.result[0].msg);
						_this.title ="";
						_this.content ="";
            _this.title ="";
						_this.fileList =[];
            _this.postfile="";
						Bus.$emit("clear",1);
					}
				},error:function(){
					Indicator.close();
				}
			});
			}
		},
		components:{
			// uploadcomponent,
    headernav,
    // uploadPic
		}
	}
</script>

<style>
.havehelppage{
  background-color: #ffffff;
}
	.imgList{
		margin-left:5px;
		margin-top:10px;
		text-align:left;
	}
	.submitFlieBtn{
		display: inline-block;
		padding:7px 50px;
    background-color: #26A2FF ;
		color:#FFFFFF ;
		font-size:16px;
		border-radius: 4px;
		margin-top:30px ;
    width: 10rem;
    height: 1.5rem;
	}
  .uploaderbox{
    text-align: left;
    padding-left: 10px;
margin-top:20px;
  }
  .uploaderbox p{
margin-bottom: 9px;
  }
.opendiv{
  margin-top: -10px;
 width: 99%;
background: #f1f1f1;
position: relative;
height: 2rem;
  }
  .witchbox{
display: flex;
font-size: 13px;
position: absolute;
right: 0;
  }
  .witchbox p{
    margin-right: 0.2rem;
    margin-top: 0.2rem;
  }
.mtfield{
  width: 100%;
  height: 50%;
  border: none;
  background: #f1f1f1;
  }
</style>
