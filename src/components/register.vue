<template>
	<div style="font-family: 'mintui';overflow: auto;height:calc(100vh - 110px);text-align: center;padding:10px">
	  <p>个人信息</p>
		<mt-field label="姓名" placeholder="请输入姓名" v-model="name" class="mintStyle"></mt-field>
    <mt-field label="性别"  disabled v-model="gender" class="mintStyle">
      <van-switch v-model="checked"  size="24px" />
    </mt-field>
		<mt-field label="手机号" placeholder="请输入手机号" :state="phoneS" v-model="phone" class="mintStyle"></mt-field>
		<!-- <mt-field label="邮箱" placeholder="请输入邮箱" :state="mailboxS" v-model="mailbox" class="mintStyle"></mt-field> -->
		<mt-field label="联系地址" placeholder="请输入联系地址" v-model="address" class="mintStyle"></mt-field>
		<mt-field label="证件类型"  disabled  placeholder="请选择证件类型" v-model="documentType"  class="mintStyle">
		    <!-- <mt-button type="default" @click="changeID">选择</mt-button> -->
		</mt-field>
		<mt-field label="证件号码" placeholder="请输入证件号码" v-model="documentNumber" class="mintStyle"></mt-field>
		<p>查档信息</p>
   <!-- <mt-field label="办件标题" placeholder="请输入办件标题" v-model="officeTitle" class="mintStyle"></mt-field>
    <mt-field label="办件分类" placeholder="请选择办件分类" v-model="officeBranch" class="mintStyle">
    		 <mt-button type="default" @click="changeIDB">选择</mt-button>
    </mt-field> -->
    <div style="display: table;
    padding: 3px 11px">内容</div>
    <mt-field placeholder="请输入内容" type="textarea" rows="5" v-model="content" class="mintStyle"></mt-field>
		<mt-switch v-model="value" style="margin-left:20px;margin-top:20px">{{isOpen}}</mt-switch>
		<span class="submitFlieBtn" @click="isStop">提交</span>

		<mt-popup v-model="changeIDbox" popup-transition="popup-fade">
		    <mt-radio
                  title="证件类型"
                  v-model="documentType"
                  @change="changeID"
                  :options="IDoptions">
         </mt-radio>
		</mt-popup>
	<!-- 	<mt-popup v-model="changeIDOffice" popup-transition="popup-fade">
    		    <mt-radio
                      title="办件分类"
                      v-model="officeBranch"
                      @change="changeIDB"
                      :options="IDOptionsOffice">
             </mt-radio>
    		</mt-popup> -->
	</div>
</template>

<script>
	//import Bus from '../components/bus.js'
	export default{
		name:"register",
		data(){
			return{
				list:[],
				name:"",
				changeIDbox:false,
				changeIDOffice:false,
        checked: true,
				gender:"男",
        genderStatus:1,


				phone:"",
				phoneS:"",//手机号校验
				mailbox:"",
				mailboxS:"",//邮箱校验
				address:"",
				documentType:"身份证",
				documentNumber:"",
				officeTitle:"",
				officeBranch:"",
				content:"",
				value:false,
				isOpen:"公开",
				status:0,
				IDoptions:[
          {label: '身份证',value: '身份证'},
          {label: '教师证',value: '教师证'},
          {label: '军人证',value: '军人证'},
          {label: '其他',value: '其他'}
        ],
        IDOptionsOffice:[
          {label: '建议批评',value: '建议批评'},
          {label: '检举揭发',value: '检举揭发'},
          {label: '申诉控告',value: '申诉控告'},
          {label: '反映要求',value: '反映要求'},
          {label: '效能建设',value: '效能建设'},
          {label: '其他事项',value: '其他事项'}
        ],
				

			}
		},
		mounted(){
      console.log('1');
			// var _this = this;
			// Bus.$on("getList",(list) =>{
			// 	_this.list = list;

			// });
		},
		activated(){

		},
		watch:{
			value(newValue,oldValue){
					this.isOpen ="公开";
					if(newValue){
						this.isOpen ="隐私";
					}
			},
      checked(newValue,oldValue){
          if(newValue){
            this.gender ="男";
          }else{
             this.gender ="女";
          }
      },
      phone(newValue,oldValue){
      var regex =/^1[34578]\d{9}$/;
      var name=this.phone;
      if(!regex.test(name)){
        this.phoneS="error";
       }else{
         this.phoneS="success";
       }
      },
      mailbox(newValue,oldValue){
       var regex =/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
       var name=this.mailbox;
       if(!regex.test(name)){
         this.mailboxS="error";
        }else{
          this.mailboxS="success";
        }
       },
		},
		methods:{
			isStop(){
			var _this = this;
      var openId = localStorage.getItem("openId");
      if(_this.name==""){
        _this.$toast("姓名不能为空");
      	return;
      }
      if(_this.phone==""){
        _this.$toast("手机号不能为空");
        return;
      }
      /* if(_this.mailbox==""){
        _this.$toast("邮箱不能为空");
        return;
      } */
      if(_this.documentType==""){
        _this.$toast("证件类型不能为空");
        return;
      }
      if(_this.documentNumber==""){
        _this.$toast("证件号不能为空");
        return;
      }
     /* if(_this.officeTitle==""){
        _this.$toast("办件标题不能为空");
        return;
      }
      if(_this.officeBranch==""){
        _this.$toast("办件分类不能为空");
        return;
      } */
      if(_this.value){_this.status = 1;}
      if(_this.checked){_this.genderStatus = 0;}
      var document_type=0;
      var office_branch=1;
      if(_this.documentType=="身份证"){document_type=0;}
      if(_this.documentType=="教师证"){document_type=1;}
      if(_this.documentType=="军人证"){document_type=2;}
      if(_this.documentType=="其他"){document_type=3;}
      if(_this.officeBranch=="建议批评"){office_branch=1;}
      if(_this.officeBranch=="检举揭发"){office_branch=2;}
      if(_this.officeBranch=="申诉控告"){office_branch=3;}
      if(_this.officeBranch=="反映要求"){office_branch=4;}
      if(_this.officeBranch=="效能建设"){office_branch=5;}
      if(_this.officeBranch=="其他事项"){office_branch=6;}
      $.ajax({
          type:"post",
          url:REGISTER_URL,
          data:{
            openId:openId,
            name:_this.name,
            gender:_this.genderStatus,
            phone:_this.phone,
            //mailbox:_this.mailbox,
            address:_this.address,
            documentType:document_type,
            documentNumber:_this.documentNumber,
           // officeTitle:_this.officeTitle,
           // officeBranch:office_branch,
            content:_this.content,
            isOpen:  0,//_this.status
          },
          dataType:"json",
          success:function(res){
            if(res.success){
            if(res.result[0].loginS==0){
              _this.$toast("请关注公众号");
              return;
            }
              _this.$toast("提交成功");
              _this.name ="";
              _this.checked =false;
              _this.phone ="";
              _this.mailbox ="";
              _this.address ="";
              _this.documentType ="";
              _this.documentNumber ="";
              _this.officeTitle ="";
              _this.officeBranch ="";
              _this.value =false;
              _this.content ="";
              Bus.$emit("clear",1);
            }
          }
        });
			},
			changeID (){
        if(this.changeIDbox){
          this.changeIDbox=false
        }else{
          this.changeIDbox=true
        }
			},
			changeIDB(){
			if(this.changeIDOffice){
          this.changeIDOffice=false
        }else{
          this.changeIDOffice=true
        }
			},

		},
		components:{

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
	.mintStyle{
	border-bottom:1px solid #ccc;
  text-align: left;
	}
</style>

<style scoped>

  p{
    margin: 10px 0px;
    font-size: 20px
  }
</style>
