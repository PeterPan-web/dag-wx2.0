  <template>
	<div style="overflow: auto;height:calc(100vh - 110px);text-align: center;">
		<mt-field  placeholder="档案主题" v-model="title" style="border-bottom:1px solid #ccc;"></mt-field>
		<mt-field placeholder="档案介绍" type="textarea" rows="5" v-model="content" style="border-bottom:1px solid #ccc;height:140px"></mt-field>
		<!-- <uploadcomponent style="text-align: left;"></uploadcomponent> -->
		<mt-switch v-model="value" style="margin-left:20px;margin-top:20px">{{isOpen}}</mt-switch>
		<span class="submitFlieBtn" @click="isStop">提交</span>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import { Switch } from 'mint-ui';
	import Bus from '../components/bus.js'
	import uploadcomponent from '../components/uploadPic.vue'
	export default{
		name:"have",
		data(){
			return{
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
		activated(){

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
			isStop(){
				var _this = this;
				this.popupVisible = false;
        var openId = JSON.parse(localStorage.getItem("yjqopenId"))
				$.ajax({
					type:"post",
					url:FORBIDDEN_URL,
					data:{
						openid:openId
					},
					success:function(res){
            console.log(res);
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
        var openId = JSON.parse(localStorage.getItem("yjqopenId"))
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
					mediaId:JSON.stringify(_this.list)
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
			uploadcomponent
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
		background:#169bd5;
		color:#fff;
		font-size:16px;
		border-radius: 5px;
		margin-top:40px;
		margin-bottom:30px;
	}
</style>
