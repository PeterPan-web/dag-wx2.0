<template>
	<div>
		<headnav :title="title"></headnav>
		<div class="mainCont">
      <div>
        <p class="ts">查档预约仅限工作日，给您带来的不便请谅解</p>

        <h4 class="title"><span>基础信息</span>(带*均为必填项)</h4>
        <van-cell-group>
          <van-field v-model="item.applicant" label="*姓名" placeholder="请输入申请人" />
<!--          <van-field v-model="item.cardNo" label="*身份证号码" placeholder="请输入身份证号码" />-->
          <van-field v-model="item.phone" label="*联系电话" placeholder="请输入联系电话" />
          <van-field v-model="item.address" label="*联系地址" placeholder="请输入联系地址" />
        </van-cell-group>


        <h4 class="title"><span>利用档案信息</span>(带*均为必填项)</h4>
<!--        <div style="text-align: left;margin: 0 15px;font-size: 14px;">-->
<!--          <div>{{item.title}}</div>-->
<!--          <div>{{item.archNo}}</div>-->
<!--        </div>-->
        <van-cell-group>
          <!-- <van-field
            readonly
            clickable
            name="picker"
            :value="purpose"
            label="*查档目的"
            placeholder="请输入查档目的"
            @click="showPop(1)"
          /> -->
                    <van-field
            v-model="item.Purpose"
            rows="1"
            autosize
            label="*查档目的"
            type="textarea"
            placeholder="请输入查档目的"
            show-word-limit
          />
<!--          <van-field-->
<!--            readonly-->
<!--            clickable-->
<!--            name="picker"-->
<!--            :value="modeClass"-->
<!--            label="*"-->
<!--            placeholder="请选择利用方式"-->
<!--            @click="showPop(2)"-->
<!--          />-->
          <van-field
            v-model="item.remark"
            rows="1"
            autosize
            label="*查档内容"
            type="textarea"
            placeholder="请输入查档内容"
            show-word-limit
          />
          <van-field v-model="item.cratetime" label="预约时间" @click="showPickerDate = true" :placeholder="'请选择'" input-align="right" readonly right-icon="arrow" />
        </van-cell-group>

      </div>
			<div style="display: flex;margin: 10px 5%;width: 90%">
        <mt-button type="default" size="large" @click="qxDj()" style="margin-right:10px;font-size: 14px">取消登记</mt-button>
        <mt-button type="danger" size="large" @click="qrDj()" style="font-size: 14px">确认登记</mt-button>
      </div>
      <van-popup v-model="popupVisible1" position="bottom">
        <van-picker
          title="选择利用目的"
          show-toolbar
          :columns="lyMd"
          value-key="NAME"
          @confirm="onConfirm1"
          @cancel="onCancel1"
        />
      </van-popup>
      <van-popup v-model="popupVisible2" position="bottom">
        <van-picker
          title="选择利用方式"
          show-toolbar
          :columns="lyfs"
          value-key="NAME"
          @confirm="onConfirm2" :formatter="formatter1"
          @cancel="onCancel2"
        />
      </van-popup>
      <!--日期选择弹框-->
      <van-popup v-model="showPickerDate" position="bottom">
        <van-datetime-picker  v-model="cratetime" @cancel="onCancelDate()" @confirm="onConfirmDate" :formatter="formatter" />
      </van-popup>
		</div>
	</div>
</template>

<script>
	import headnav from '../components/header.vue'
  import Bus from "../components/bus";
  import {Dialog} from "vant";
  import {Indicator, Toast} from "mint-ui";
	export default{
		name:"archDetail_sq",
		data(){
			return{
				title:"档案利用预约申请",
        cratetime:new Date(),
        showPickerDate:false,
        popupVisible1:false,
        popupVisible2:false,
      //  lyMd:[],   //查档目的内容空缺
      //  lyfs:[],    //这块内容找不到啊
        purpose:'',
        modeClass:'',
        item:{
          pKey:'',
          archNo:'',
          tableName:'',
          pId:'',
          title:'',
          applicant:'',
          cardNo:'',
          phone:'',
          address:'',
          purpose:'',
          modeClass :'',
          Purpose:"",
          remark :'',
          cratetime :'',
        }
			}
		},
		components:{
			headnav,
		},
    mounted() {
      this.getSelect(3)
      this.getSelect(5)
      var query = this.$route.query;
      Object.assign(this.item,query);
    },
    methods:{
      onCancelDate () {
        this.showPickerDate = false
      },
      onConfirmDate(){
        var cratetime = this.cratetime;
        var y = cratetime.getFullYear();
        var m = cratetime.getMonth()+1;
        var d = cratetime.getDate();
        var h = cratetime.getHours();
        var mm = cratetime.getMinutes();
        m = m < 10 ? '0'+m : m;
        d = d < 10 ? '0'+d : d;
        h = h < 10 ? '0'+h : h;
        mm = mm < 10 ? '0'+ mm : mm;
        this.item.cratetime = y + '-' + m + '-' + d + ' '+ h + ':' + mm
        console.log('date111--',this.item.cratetime)  // 数值来自日期组件自定义格式的方法回调
        this.onCancelDate()
      },
      formatter (type, value) {
        if (type === 'year') {
          this.value1 = value   // 可以拿到当前点击的数值
          return `${value}年`
        } else if (type === 'month') {
          return `${value}月`
        }else if (type === 'day') {
          return `${value}日`
        }else if (type === 'hour') {
          this.value2 = value
          return `${value}时`
        }else if (type === 'minute') {
          this.value2 = value
          return `${value}分`
        }
        // this.value3 = value
        // return
      },

      /**
       * 显示弹窗
      //  * @type 1 利用目的 2 利用方式
      //  */
      // showPop(type){
      //   if(type == 1){
      //     this.popupVisible1 = true
      //   }else{
      //     this.popupVisible2 = true;
      //   }
      // },
      /**
       * 关闭事件
       * @type 1 利用目的 2 利用方式
       */
      // closePop:function (type) {
      //   if(type == 1){
      //     this.popupVisible1 = false
      //   }else{
      //     this.popupVisible2 = false;
      //   }
      // },
      /**
       * 确认事件
       */
      onConfirm1(value, index) {
        console.log(value)
        this.closePop(1);
        this.purpose = value.NAME;
        this.item.purpose = value.CODE;
      },
      onConfirm2(value, index) {
        this.closePop(2);
        this.modeClass = value.NAME;
        this.item.modeClass = value.CODE;
      },
      /**
       * 取消事件
       */
      onCancel1() {
        this.closePop(1);
      },
      onCancel2() {
        this.closePop(2);
      },
      /**
       * 取消登记
       */
      qxDj(){
        this.$router.go(-1);
      },
      /**
       * 确认登记
       */
      qrDj(){
        let _this = this;
        if(this.item.applicant == ''){
          Toast('申请人不能为空~');
          return false;
        }
        if(this.item.phone == ''){
          Toast('联系电话不能为空~');
          return false;
        }
        if(this.item.phone.length != 11){
          Toast('联系电话必须为11位数');
          return false;
        }
        if(this.item.address == ''){
          Toast('联系地址不能为空~');
          return false;
        }
        // if(this.item.purpose == ''){
        //   Toast('查档目的不能为空~');
        //   return false;
        // }
        if(this.item.cratetime == ''){
          Toast('请选择预约时间~');
          return false;
        }
        // if(this.item.modeClass == ''){
        //   Toast('利用方式不能为空~');
        //   return false;
        // }
        Indicator.open({
          text:"处理中，请稍等...",
          spinnerType: 'fading-circle'
        });
        $.ajax({
          type:"post",
          url:'/'+HOST_HOME+'/djlyApp!doDjlyApp.action',
          data:_this.item,
          dataType:"json",
          success:function(res){
            Indicator.close();
            Dialog.alert({
              title: '预约成功!',
              message: '你所提交的预约信息已经提交成功,请及时跟进申请状况。',
            }).then(() => {
              _this.qxDj();
            });
          },
          error:function (res) {
            Indicator.close();
          }
        });
      },
      /**
       * 获取选择框数据
       * @param dicId  dicId  （3 利用目的 5 利用方式）
       */
      getSelect(dicId){
        let _this = this;
        $.ajax({
          url:'/'+HOST_HOME+'/dictionaryApp!getSysDictData.action?dicId='+dicId,
          success:function (res) {
            if(res.success){
              let list = res.result[0].rows;
              if(dicId == 3){
                _this.lyMd = list;
              }
              if(dicId == 5){
                _this.lyfs = list;
              }
            }
          }
        })
      }
		}
	}
</script>

<style>
	.mainCont{
		margin-top:50px;
		margin-bottom:50px;
		height:calc(100vh - 100px);
		overflow:auto;
    background: #ffffff;
	}
  .mint-cell-title{
    text-align: left;
  }
  .title{
    margin: 0;
    font-weight: normal;
    font-size: 14px;
    letter-spacing: 0!important;
    text-align: left!important;
    border-bottom: 1px solid transparent;
  }
  .title span {
    display: inline-block;
    background: #ef6b42;
    color: #ffffff;
    padding: 4px 10px;
    margin-right: 10px;
  }
  html{
    background: #ffffff;
  }
  .ts{
    color: red;
    font-size: 12px;
    text-align: left;
    text-indent: 1em;
    margin-bottom: 10px;
  }
  .van-field__label{
    width: 5.2em!important;
    text-align:right!important;
  }
  .van-field__control--right{
    text-align:left!important;
  }
</style>
