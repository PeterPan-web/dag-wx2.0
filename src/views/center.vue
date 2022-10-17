<template>
	<div class="page-tabbar">
		<div class="page-wrap">
			<headnav :title="selected" :path="path" :up="up"></headnav>
			<!-- <mt-tab-container class="page-tabbar-container" v-model="selected">
				<mt-tab-container-item id="预约登记">
        	<searchcomponent2 :id="selectedId3" :url="mainList.register.otherUrl" :title="selected"></searchcomponent2>
        </mt-tab-container-item>
			</mt-tab-container> -->
		<!-- <mt-tabbar v-model="selected" >
		</mt-tabbar> -->
		</div>
		<div style="height:calc(100vh - 50px);overflow: auto;margin-top:50px;">
			<van-form validate-first ref="primaryData" @submit="submitData">
			<div class="tip">
				<span>*</span>基础信息（均为必填项）
			</div>
			<van-cell-group>
  				<van-field  required  v-model="applicant" label="申请人" placeholder="请输入申请人姓名" :rules="[
                    {
                        required: true,
                        trigger:'onBlur',
                        message: '不能为空'
                    }
                ]" />
  				<van-field required  v-model="idNumber" label="证件号码"  placeholder="取件的重要凭据，请正确填写" :rules="[
                    {
                        required: true,
                        trigger:'onBlur',
                        message: '不能为空'
                    },
                    {
                        validator,
                        message: '请填写正确的证件号码'
                    }
                ]" />
  				<van-field required type="tel" v-model="phone" label="联系电话" placeholder="审核进度将发送至该手机"  :rules="[
                    {
                        pattern:/^1[3|4|5|7|8][0-9]{9}$/,
                        trigger:'onBlur',
                        message: '请填写正确的手机号码'
                    },
					{
                        required: true,
                        trigger:'onBlur',
                        message: '不能为空'
                    },
                ]" />
  				<van-field required v-model="residence" label="现居住地址" placeholder="请输入居住地址" :rules="[
                    {
                        required: true,
                        trigger:'onBlur',
                        message: '不能为空'
                    }
                ]"  />
				<van-field required readonly clickable name="picker" :value="purpose" label="利用目的" placeholder="点击选择利用目的" @click="showPicker = true" :rules="[
                    {
                        required: true,
                        trigger:'onBlur',
                        message: '不能为空'
                    }
                ]"/>
				<van-popup v-model="showPicker" position="bottom">
  					<van-picker value-key="NAME" show-toolbar :columns="columns1" @confirm="confirmPurpose" @cancel="showPicker = false"/>
				</van-popup>
				<van-field required readonly clickable name="picker" :value="pickUp" label="选择取件地点" placeholder="点击选择取件地点" @click="showPicker1 = true" :rules="[
                    {
                        required: true,
                        trigger:'onBlur',
                        message: '不能为空'
                    }
                ]"/>
				<van-popup v-model="showPicker1" position="bottom">
  					<van-picker value-key="NAME" show-toolbar :columns="columns2" @confirm="confirmPickup" @cancel="showPicker1 = false"/>
				</van-popup>
			</van-cell-group>

			<div class="tip">
				<span>*</span>请点击展开要申请的档案（其中带*的为必填项）
			</div>
			<van-collapse v-model="activeName" accordion >
  				<van-collapse-item title="婚姻档案" name="marriage">
					<van-field required v-model="marriage_maleName" label="男方姓名" placeholder="请输入"/>
  					<van-field required v-model="marriage_femaleName" label="女方姓名" placeholder="请输入" />
					<van-field readonly clickable name="datetimePicker" :value="marriage_time" label="时间选择" placeholder="点击选择时间" @click="showPicker2 = true" />
					<van-popup v-model="showPicker2" position="bottom">
  						<van-datetime-picker :min-date="minDate" :max-date="maxDate"  v-model="currentDate1" :formatter="formatter" type="date" @confirm="marriageConfirm" @cancel="showPicker2 = false"/>
					</van-popup>
					<van-field name="radio" label="婚姻状况">
  						<template #input>
    						<van-radio-group v-model="marriageDetail" direction="horizontal">
      							<van-radio name="1">结婚</van-radio>
      							<van-radio name="2">离婚</van-radio>
    						</van-radio-group>
  						</template>
					</van-field>
					<van-field v-model="marriageClue" label="其他线索" placeholder="其他线索（如曾用名、别名等）" />
				</van-collapse-item>
  				<van-collapse-item title="独生子女" name="singlechild">
					<van-field required v-model="onlyChild_father" label="父亲姓名" placeholder="请输入"/>
  					<van-field required v-model="onlyChild_mother" label="母亲姓名" placeholder="请输入"/>
  					<van-field required v-model="onlyChildName" label="孩子姓名" placeholder="请输入" />
					<van-field v-model="onlyChildCule" label="其他线索" placeholder="其他线索（如曾用名、别名等）" />
				</van-collapse-item>
  				<van-collapse-item title="知青档案" name="younger">
					  <van-field required v-model="youthName" label="知青姓名" placeholder="请输入" />
  					<van-field required  v-model="youthPlace" label="插队地点" placeholder="请输入" />
  					<van-field v-model="youthSchool" label="原就读学校" placeholder="请输入" />
					<van-field v-model="youthCule" label="其他线索" placeholder="其他线索（如曾用名、别名等）" />
				</van-collapse-item>
  				<van-collapse-item title="知青子女入沪" name="youngerchild">
					<van-field required v-model="youngerchildName" label="知青姓名" placeholder="请输入" />
  					<van-field v-model="youngerchildSpouse" label="知青配偶姓名" placeholder="请输入" />
  					<van-field required v-model="youngerchild" label="孩子姓名" placeholder="请输入" />
					<van-field v-model="youngerchildNameCule" label="其他线索" placeholder="其他线索（如曾用名、别名等）" />
				</van-collapse-item>
  				<van-collapse-item title="社员建房" name="buildhouse">
					<van-field required v-model="memberName" label="户主姓名" placeholder="请输入" />
  					<van-field v-model="othersName" label="其他成员姓名" placeholder="请输入" />
  					<van-field required v-model="houseYear" label="造房年份" placeholder="请输入年份" />
					<!-- <van-popup v-model="showPicker3" position="bottom">
  						<van-datetime-picker :min-date="minDate" :max-date="maxDate" v-model="currentDate2" :formatter="formatter" type="date"  @confirm="confirmHouseYear" @cancel="showPicker3 = false"/>
					</van-popup> -->
					<van-field v-model="memberCule" label="其他线索" placeholder="其他线索（如曾用名、别名等）" />
				</van-collapse-item>
  				<van-collapse-item title="军人入退伍" name="soldier">
					<van-field required v-model="soldierName" label="军人姓名" placeholder="请输入" />
  					<van-field required readonly clickable name="datetimePicker" :value="soldierDate" label="入/退伍日期" placeholder="点击选择日期" @click="showPicker4 = true" />
					<van-popup v-model="showPicker4" position="bottom">
  						<van-datetime-picker :min-date="minDate" :max-date="maxDate" v-model="currentDate3" type="date" @confirm="confirmSoldierDate" @cancel="showPicker4 = false"/>
					</van-popup>
  					<van-field required v-model="troops" label="部队" placeholder="请输入" />
					<van-field v-model="soldierCule" label="其他线索" placeholder="其他线索（如曾用名、别名等）" />
				</van-collapse-item>
  				<van-collapse-item title="再生育子女审批" name="secondchild">
					<van-field required v-model="approvalFatherName" label="父亲姓名" placeholder="请输入" />
  					<van-field required v-model="approvalMathorName" label="母亲姓名" placeholder="请输入" />
  					<van-field required v-model="approvalChildName" label="孩子姓名" placeholder="请输入" />
					<van-field v-model="approvalCule" label="其他线索" placeholder="其他线索（如曾用名、别名等）" />
				</van-collapse-item>
  				<van-collapse-item title="工伤认定" name="workinjury">
					<van-field required v-model="injury_name" label="姓名" placeholder="请输入" />
  					<van-field required v-model="injury_company" label="单位名称" placeholder="请输入" />
  					<van-field readonly clickable name="datetimePicker" :value="injury_date" label="鉴定日期" placeholder="点击选择日期" @click="showPicker5 = true" />
					<van-popup v-model="showPicker5" position="bottom">
  						<van-datetime-picker :min-date="minDate" :max-date="maxDate" v-model="currentDate4" type="date" @confirm="confirmInjuryDate" @cancel="showPicker5 = false"/>
					</van-popup>
					<van-field v-model="injury_cule" label="其他线索" placeholder="其他线索（如曾用名、别名等）" />
				</van-collapse-item>
  				<van-collapse-item title="学籍档案" name="education">
					<van-field required v-model="schoolRoll_name" label="姓名" placeholder="请输入" />
  					<van-field required v-model="schoolName" label="学校名称" placeholder="请输入" />
  					<van-field readonly clickable name="datetimePicker" :value="birth" label="出生日期" placeholder="点击选择日期" @click="showPicker6 = true" />
					<van-popup v-model="showPicker6" position="bottom">
  						<van-datetime-picker :min-date="minDate" :max-date="maxDate" v-model="currentDate5" type="date" @confirm="confirmBirth" @cancel="showPicker6 = false"/>
					</van-popup>
					<van-field v-model="schoolRoll_Cule" label="其他线索" placeholder="其他线索（如曾用名、别名等）" />
				</van-collapse-item>
  				<van-collapse-item title="劳动能力鉴定" name="0105">
					<van-field required v-model="labour_name" label="姓名" placeholder="请输入" />
  					<van-field required v-model="labour_company" label="单位名称" placeholder="请输入" />
  					<van-field v-model="labour_number" label="结论书编号" placeholder="请输入" />
					<van-field v-model="labour_cule" label="其他线索" placeholder="其他线索（如曾用名、别名等）" />
				</van-collapse-item>
  				<van-collapse-item title="征地安置" name="labourer">
					<van-field required v-model="land_name" label="被征地安置人员姓名" placeholder="请输入" />
  					<van-field required v-model="land_place" label="被征土地所属镇、村、队" placeholder="请输入" />
  					<van-field v-model="land_company" label="接收单位" placeholder="请输入" />
					<van-field v-model="land_cule" label="其他线索" placeholder="其他线索（如曾用名、别名等）" />
				</van-collapse-item>
  				<van-collapse-item title="三峡移民档案" name="0111">
					<van-field required v-model="immigrant_name" label="户主姓名" placeholder="请输入" />
  					<van-field v-model="immigrant_family" label="家庭成员" placeholder="请输入" />
  					<van-field readonly clickable name="datetimePicker" :value="immigrant_date" label="出生日期" placeholder="点击选择日期" @click="showPicker7 = true" />
					<van-popup v-model="showPicker7" position="bottom">
  						<van-datetime-picker :min-date="minDate" :max-date="maxDate" v-model="currentDate6" type="date" @confirm="confirmImmigrantDate" @cancel="showPicker7 = false"/>
					</van-popup>
					<van-field required v-model="moveOut" label="迁出地点" placeholder="请输入" />
					<van-field required v-model="moveIn" label="迁入地点" placeholder="请输入" />
					<van-field v-model="immigrant_cule" label="其他线索" placeholder="其他线索（如曾用名、别名等）" />
				</van-collapse-item>
			</van-collapse>
			<div class="optionBtn">
				<mt-button type="primary" size="small" native-type="submit">提交</mt-button>
				<mt-button type="primary" native-type="button" size="small" @click="resetData">重置</mt-button>
			</div>
				</van-form>
		</div>

	</div>
</template>

<script>
	import headnav from '../components/header.vue'
	import { Cell, CellGroup,Dialog,Radio } from 'vant';
	export default{
		name:"center",
		data(){
			return{
				selected:"预约查档",
				path:"/interaction",
				up:false,
				applicant:'',
				idNumber:'',
				phone:'',
				residence:'',
				purpose:'',
				purposeCode:'',
				pickUp:'',
				pickUpCode:'',
				columns1:[],
				columns2:[],
				showPicker:false,
				showPicker1:false,
				showPicker2:false,
				// showPicker3:false,//造房年份不用时间选择器
				showPicker4:false,
				showPicker5:false,
				showPicker6:false,
				showPicker7:false,
				activeName:'',
				currentDate1:'',
				marriage_maleName:'',
				marriage_femaleName:'',
				marriage_time:'',
				marriageDetail:'1',
				marriageClue:'',
				onlyChild_father:'',
				onlyChild_mother:'',
				onlyChildName:'',
				onlyChildCule:'',
				youthName:'',
				youthPlace:'',
				youthName:'',
				youthSchool:'',
				youthCule:'',
				youngerchildName:'',
				youngerchildSpouse:'',
				youngerchild:'',
				youngerchildNameCule:'',
				memberName:'',
				othersName:'',
				houseYear:'',
				memberCule:'',
				soldierName:'',
				soldierDate:'',
				troops:'',
				soldierCule:'',
				approvalFatherName:'',
				approvalMathorName:'',
				approvalChildName:'',
				approvalCule:'',
				injury_name:'',
				injury_company:'',
				injury_date:'',
				injury_cule:'',
				schoolRoll_name:'',
				schoolName:'',
				birth:'',
				schoolRoll_Cule:'',
				labour_name:'',
				labour_company:'',
				labour_number:'',
				labour_cule:'',
				land_name:'',
				land_place:'',
				land_company:'',
				land_cule:'',
				immigrant_name:'',
				immigrant_family:'',
				immigrant_date:'',
				moveOut:'',
				moveIn:'',
				immigrant_cule:'',
				minDate:new Date(1940,0,1),
				maxDate:new Date(2050,0,1),
				currentDate1: new Date(),
				currentDate2: new Date(),
				currentDate3: new Date(),
				currentDate4: new Date(),
				currentDate5: new Date(),
				currentDate6: new Date(),
			}
		},
		created(){
			//获取利用目的的值
			this.getPurpose();
			//获取取件地址的值
			this.getPickup();
		},
		components:{
			headnav,
			[Cell.name]:Cell,
			[CellGroup.name]:CellGroup,
			[Radio.name]:Radio,
			[Dialog.Component.name]:Dialog.Component,
		},
		methods:{
			changeCollapse(){

			},
			//身份证号的校验
			validator(val){
				return /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val)||/^[1-9]\d{5}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}$/.test(val)
			},
			// 日期组件自定义格式
    formatter (type, value) {
      // 格式化选择器日期
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      } else if (type === "hour") {
        return `${value}时`;
      } else if (type === "minute") {
        return `${value}分`;
      }
      return value;
    },
			//获取利用目的以及选择取件地址的值
			getPurpose(){
				var _this = this;
				$.ajax({
					url:'/'+HOST_HOME+'/book!getDicDatas.action?dicName=利用目的',
					type:'get',
					success:function(res){
						if(res.success == true) {
							_this.columns1 = res.result;
						}
					},
					error:function() {
						Dialog.alert({message: '请求失败',}).then(() => {});
					}
				})
			},
			//点击利用目的
			confirmPurpose(value){
				this.purpose=value.NAME;
				this.purposeCode = value.CODE;
      			this.showPicker = false;
			}
			,
			//获取利用目的以及选择取件地址的值
			getPickup(){
				var _this = this;
				$.ajax({
					url:'/'+HOST_HOME+'/book!getDicDatas.action?dicName=取件地点',
					type:'get',
					success:function(res){
						console.log()
						if(res.success == true) {
							_this.columns2 = res.result;
						}
					},
					error:function() {
						Dialog.alert({message: '请求失败',}).then(() => {});
					}
				})
			},
			//点击取件地址
			confirmPickup(value){
				this.pickUp=value.NAME;
				this.pickUpCode = value.CODE;
      			this.showPicker1 = false;
			},

			//婚姻档案选择时间
			marriageConfirm(value){
				this.marriage_time= value.getFullYear() + "-" + (Number(value.getMonth()) + 1) + "-" + value.getDate();
      			this.showPicker2 = false;
			},
			//社员建房档案选择造房年份
			// confirmHouseYear(value){
			// 	this.houseYear=value.getFullYear() + "-" + (Number(value.getMonth()) + 1) + "-" + value.getDate();
      		// 	this.showPicker3 = false;
			// },
			//入退伍日期
			confirmSoldierDate(value){
				this.soldierDate=value.getFullYear() + "-" + (Number(value.getMonth()) + 1) + "-" + value.getDate();
      			this.showPicker4 = false;
			},
			//工伤认定档案见底的鉴定日期
			confirmInjuryDate(value){
				this.injury_date=value.getFullYear() + "-" + (Number(value.getMonth()) + 1) + "-" + value.getDate();
      			this.showPicker5 = false;
			},
			//学籍档案出生日期
			confirmBirth(value){
				this.birth=value.getFullYear() + "-" + (Number(value.getMonth()) + 1) + "-" + value.getDate();
      			this.showPicker6 = false;
			},
			//三峡移民档案出生日期
			confirmImmigrantDate(value){
				this.immigrant_date=value.getFullYear() + "-" + (Number(value.getMonth()) + 1) + "-" + value.getDate();
      			this.showPicker7 = false;
			},
			//提交数据
			submitData (){
				var _this = this;
				var dbchin = '';
				var manName = '';
				var womanName = '';
				var birthDate = '';
				var maritalStatus = '';
				var otherClues="";
				var otherName = '';
				var childName = '';
				var queueWay = '';
				var school = '';
				var hYear = '';
				var unit = '';
				var conclusionNo ='';
				var outSite = '';
				var inSite = '';
				_this.$refs.primaryData.validate();
				if(_this.activeName == '') {
					Dialog.alert({message: '请选择一个要申请的档案进行展开并填写！',});
					return false;
				}else if(_this.activeName == 'marriage') {//婚姻档案
					dbchin = '婚姻档案';
					manName = _this.marriage_maleName;
					womanName = _this.marriage_femaleName;
					maritalStatus = _this.marriageDetail;
					otherClues = _this.marriageClue;
					birthDate = _this.marriage_time;
					if(manName == ''||womanName == '') {
						Dialog.alert({message: '该档案中带星号的为必填项，请填写完整信息！',})
						return false;
					}
				}else if(_this.activeName == 'singlechild') {//独生子女
					dbchin = '独生子女';
					manName = _this.onlyChild_father;
					womanName = _this.onlyChild_mother;
					otherClues = _this.onlyChildCule;
					childName = _this.onlyChildName;
					if(manName == ''||womanName == ''||childName =='') {
						Dialog.alert({message: '该档案中带星号的为必填项，请填写完整信息！',})
						return false;
					}
				}else if(_this.activeName == 'younger') {//知青档案
					dbchin = '知青档案';
					manName = _this.youthName;
					otherClues = _this.youthCule;
					queueWay = _this.youthPlace;
					school = _this.youthSchool;
					if(manName == ''||queueWay == '') {
						Dialog.alert({message: '该档案中带星号的为必填项，请填写完整信息！',})
						return false;
					}
				}else if(_this.activeName == 'youngerchild') {//知青子女入沪
					dbchin = '知青子女入沪';
					manName = _this.youngerchildName;
					womanName = _this.youngerchildSpouse;
					otherClues = _this.youngerchildNameCule;
					childName = _this.youngerchild;
					if(manName == ''||childName == '') {
						Dialog.alert({message: '该档案中带星号的为必填项，请填写完整信息！',})
						return false;
					}
				}else if(_this.activeName == 'buildhouse') {//社员建房
					dbchin = '社员建房';
					manName = _this.memberName;
					otherClues = _this.memberCule;
					otherName = _this.othersName;
					hYear = _this.houseYear;
					var reg = /^\d{4}$/;
					if(!reg.test(hYear)) {
						Dialog.alert({message: '请填写正确的年份！',})
          				return false;
					}
					if(manName == ''||hYear == '') {
						Dialog.alert({message: '该档案中带星号的为必填项，请填写完整信息！',})
						return false;
					}
				}else if(_this.activeName == 'soldier') {//军人入退伍
					dbchin = '军人入退伍';
					manName = _this.soldierName;
					birthDate =_this.soldierDate;
					otherClues = _this.soldierCule;
					queueWay = _this.troops;
					if(manName == ''||birthDate == ''||queueWay == '') {
						Dialog.alert({message: '该档案中带星号的为必填项，请填写完整信息！',})
						return false;
					}
				}else if(_this.activeName == 'secondchild') {//再生育子女审批
					dbchin = '再生育子女审批';
					manName = _this.approvalFatherName;
					womanName = _this.approvalMathorName;
					otherClues = _this.approvalCule;
					childName = _this.approvalChildName;
					if(manName == ''||womanName == ''||childName == '') {
						Dialog.alert({message: '该档案中带星号的为必填项，请填写完整信息！',})
						return false;
					}

				}else if(_this.activeName == 'workinjury') {//工伤认定
					dbchin = '工伤认定';
					manName = _this.injury_name;
					birthDate = _this.injury_date;
					otherClues = _this.injury_cule;
					unit = _this.injury_company;
					if(manName == ''||unit == '') {
						Dialog.alert({message: '该档案中带星号的为必填项，请填写完整信息！',})
						return false;
					}

				}else if(_this.activeName == 'education') {//学籍档案
					dbchin = '学籍档案';
					manName = _this.schoolRoll_name;
					birthDate = _this.birth;
					otherClues = _this.schoolRoll_Cule;
					school = _this.schoolName;
					if(manName == ''||school == '') {
						Dialog.alert({message: '该档案中带星号的为必填项，请填写完整信息！',})
						return false;
					}

				}else if(_this.activeName == '0105') {//劳动能力鉴定
					dbchin = '劳动能力鉴定';
					manName = _this.labour_name;
					otherClues = _this.labour_cule;
					unit = _this.labour_company;
					conclusionNo = _this.labour_number;
					if(manName == ''||unit == '') {
						Dialog.alert({message: '该档案中带星号的为必填项，请填写完整信息！',})
						return false;
					}

				}else if(_this.activeName == 'labourer') {//征地安置
					dbchin = '征地安置';
					manName = _this.land_name;
					otherClues = _this.land_cule;
					queueWay = _this.land_place;
					unit=_this.land_company;
					if(manName == ''||queueWay == '') {
						Dialog.alert({message: '该档案中带星号的为必填项，请填写完整信息！',})
						return false;
					}

				}else if(_this.activeName == '0111') {//三峡移民档案
					dbchin = '三峡移民档案';
					manName = _this.immigrant_name;
					otherName = _this.immigrant_family;
					birthDate = _this.immigrant_date;
					otherClues = _this.immigrant_cule;
					outSite = _this.moveOut;
					inSite = _this.moveIn;
					if(manName == ''||outSite == ''||inSite == '') {
						Dialog.alert({message: '该档案中带星号的为必填项，请填写完整信息！',})
						return false;
					}
				}
				if(_this.applicant != manName) {
					console.log(_this.applicant)
					console.log(manName)
					Dialog.alert({message: '申请人姓名与所选档案类型中的姓名不一致，请重新填写！',}).then(() => {});
					return false;
				}else {
					Dialog.confirm({
  						title: '申请信息确认',
  						message: '<p>申请人：'+this.applicant+'</p>'+'<p>证件证号：'+this.idNumber+'</p>'+'<p>手机号码：'+this.phone+'</p>'+'<p>申请的档案类型：'+dbchin+'</p>'+'<p>取件地点：'+this.pickUp+'</p>',
						messageAlign:'left'
					})
  					.then(() => {
						$.ajax({
							url:'/'+HOST_HOME+'/book!doBookApp.action?name='+_this.applicant+'&documentNumber='+_this.idNumber+'&phone='+_this.phone+'&findPurpos='+_this.purposeCode+'&pickupPoint='+_this.pickUpCode+'&dbCode='+_this.activeName+'&dbchin='+dbchin+'&manName='+manName+'&womanName='+womanName+'&birthDate='+birthDate+'&maritalStatus='+maritalStatus+'&otherClues='+otherClues+'&otherName='+otherName+'&childName='+childName+'&queueWay='+queueWay+'&school='+school+'&hYear='+hYear+'&unit='+unit+'&conclusionNo='+conclusionNo+'&outSite='+outSite+'&inSite='+inSite+'&address='+_this.residence,
							type:'post',
							success:function(res){
								if(res.success == true){
									Dialog.alert({message: '提交成功！',})
								}
							},
							error:function() {
								Dialog.alert({message: '请求失败',}).then(() => {});
							}
						})
  					})
  					.catch(() => {
  					});
				}
			},
			//重置数据
			resetData() {
			//重置验证信息
				this.$refs['primaryData'].resetValidation();
				this.applicant = '';
				this.idNumber = '';
				this.phone = '';
				this.residence = '';
				this.purpose = '';
				this.purposeCode='';
				this.pickUpCode = '';
				this.pickUp = '';
				this.activeName='',
				this.currentDate1='',
				this.marriage_maleName='',
				this.marriage_femaleName='',
				this.marriage_time='',
				this.marriageDetail='1',
				this.marriageClue='',
				this.onlyChild_father='',
				this.onlyChild_mother='',
				this.onlyChildName='',
				this.onlyChildCule='',
				this.youthName='',
				this.youthPlace='',
				this.youthName='',
				this.youthSchool='',
				this.youthCule='',
				this.youngerchildName='',
				this.youngerchildSpouse='',
				this.youngerchild='',
				this.youngerchildNameCule='',
				this.memberName='',
				this.othersName='',
				this.houseYear='',
				this.memberCule='',
				this.soldierName='',
				this.soldierDate='',
				this.troops='',
				this.soldierCule='',
				this.approvalFatherName='',
				this.approvalMathorName='',
				this.approvalChildName='',
				this.approvalCule='',
				this.injury_name='',
				this.injury_company='',
				this.injury_date='',
				this.injury_cule='',
				this.schoolRoll_name='',
				this.schoolName='',
				this.birth='',
				this.schoolRoll_Cule='',
				this.labour_name='',
				this.labour_company='',
				this.labour_number='',
				this.labour_cule='',
				this.land_name='',
				this.land_place='',
				this.land_company='',
				this.land_cule='',
				this.immigrant_name='',
				this.immigrant_family='',
				this.immigrant_date='',
				this.moveOut='',
				this.moveIn='',
				this.immigrant_cule=''
			}
		}
	}
</script>

<style>
.tip {
	font-size:14px;
	padding:5px 10px;
	text-align: left;
}
.van-cell__title {
	text-align: left;
}
.optionBtn {
	margin: 15px 0;
}
</style>
