<template>
  <div>
    <headnav :title="title"  v-if="shownav" :style="shownav?'margin-bottom:45px;':''"></headnav>
    <div class="mainCont">
      <div>
        <p class="ts">查档预约仅限工作日，给您带来的不便请谅解</p>

        <h4 class="title"><span>基础信息</span>(带*均为必填项)</h4>
        <van-cell-group>
          <van-field v-model="item.applicant"
                     label="*姓名"
                     placeholder="请输入申请人" />
          <van-field v-model="item.phone"
                     label="*联系电话"
                     placeholder="请输入联系电话" />
          <van-field v-model="item.address"

                     label="联系地址"

                     placeholder="请输入联系地址" />
        </van-cell-group>

        <h4 class="title"><span>利用档案信息</span>(带*均为必填项)</h4>
        <van-cell-group>
          <van-field v-model="item.purpose"
                     rows="1"
                     autosize
                     label="*查档目的"
                     type="textarea"
                     placeholder="请输入查档目的"
                     show-word-limit />

          <van-field v-model="item.remark"
                     rows="1"
                     autosize
                     label="*查档内容"
                     type="textarea"
                     placeholder="请输入查档内容"
                     show-word-limit />
        </van-cell-group>

<div class="timeCheck">
        <van-field
  readonly
  clickable
  name="calendar"
  :value="item.createDay "
  label="*预约日期"
  placeholder="日期"
  @click="showCalendar = true"
  
/>
<van-calendar v-model="showCalendar" @confirm="onConfirm" />
 <van-field
  readonly
  clickable
  label="*预约时间"
  :value="item.createTime"
  placeholder="时间段"
  @click="showPicker = true"
/>
<van-action-sheet v-model="showPicker" :actions="actions" @select="onSelect" />
</div>

        <!-- <van-field readonly
                   clickable
                   name="calendar"
                   :value="item.cratetime"
                   label="*预约时期"
                   placeholder="点击选择预约日期"
                   @click="showCalendar = true" />
        <van-calendar v-model="showCalendar"
                      @confirm="onConfirm" /> -->
        <!-- 点击登陆 -->
      </div>
      <div style="display: flex;margin: 10px 5%;width: 90%">
        <mt-button type="default"
                   size="large"
                   @click="qxDj()"
                   style="margin-right:10px;font-size: 14px">取消登记</mt-button>
        <mt-button type="danger"
                   size="large"
                   @click="qrDj()"
                   style="font-size: 14px">确认登记</mt-button>
      </div>

    </div>
  </div>
</template>

<script>
import headnav from '../components/header.vue'
import {readLocalStorage} from "../utils/index";
import Bus from '../components/bus'
import { Dialog } from 'vant'
import { Indicator, Toast } from 'mint-ui'
export default {
  name: 'archDetail_sq',
  data() {
    return {
      title: '档案利用预约申请',
      cratetime: new Date(),
        ltjyloginId:"",
      showPickerDate: false,
      popupVisible1: false,
      popupVisible2: false,
      showCalendar: false,
      shownav:true,
      Day:"",
      time:"",
      showPicker: false,
      modeClass: '',
      actions: [{ name: '8:00-12:00' }, { name: '2:30-5:30' }],
      item: {
        pKey: '',
        archNo: '',
        tableName: '',
        pId: '',
        title: '',
        applicant: '',
        cardNo: '',
        phone: '',
        address: '',

        modeClass: '',
        purpose: '',
        remark: '',
        createDay: '',
        createTime:'',

      },
    }
  },
  components: {
    headnav,
  },
  mounted() {
    // this.getSelect(3)
    // this.getSelect(5)
      if(this.$route.query.alone){
   this.shownav=false
  }
    var query = this.$route.query
    Object.assign(this.item, query)
    this.readStorage()
  },
  methods: {
       readStorage() {
      this.ltjyloginId = readLocalStorage();
      if (this.ltjyloginId!=='') {
       this.item.applicant = this.ltjyloginId.userRealName;
      this.item.phone = this.ltjyloginId.telephone;
      }
    },
      onConfirm(date) {
      this.item.createDay = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      this.showCalendar = false;
    },
     onConfirmTime(time) {
      this.item.createTime = time;
      this.showPicker = false;
    },
     onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.showPicker = false;
      this.item.createTime=item.name
    },
    // onConfirm(time) {
    //   this.value = time
    //   this.showPicker = false
    // },

    // onConfirm1(value, index) {
    //   console.log(value)
    //   this.closePop(1);
    //   this.purpose = value.NAME;
    //   this.item.purpose = value.CODE;
    // },
    // onConfirm2(value, index) {
    //   this.closePop(2);
    //   this.modeClass = value.NAME;
    //   this.item.modeClass = value.CODE;
    // },
    /**
     * 取消事件
     */
    onCancel1() {
      this.closePop(1)
    },
    onCancel2() {
      this.closePop(2)
    },
    /**
     * 取消登记
     */
    qxDj() {
      this.$router.go(-1)
    },
    /**
     * 确认登记
     */
    qrDj() {
      let _this = this,
c=_this.item.createDay.concat(' ',_this.item.createTime)
     _this.item.createTime='',
      _this.item.createTime=c
// console.log( _this.item.createTime);
      if (this.item.applicant == '') {
        Toast('申请人不能为空~')
        return false
      }
      if (this.item.phone == '') {
        Toast('联系电话不能为空~')
        return false
      }
      if (this.item.phone.length != 11) {
         Toast('联系电话必须为11位数')
         return false
       }
      // if (this.item.address == '') {
      //   Toast('联系地址不能为空~')
      //   return false
      // }
       if(this.item.purpose == ''){
         Toast('查档目的不能为空~');
         return false;
       }
      if (this.item.createDay == '') {
        Toast('请选择预约日期~')
        return false
      }
     if (this.item.createTime == '') {
        Toast('请选择预约时间~')
        return false
      }
      Indicator.open({
        text: '处理中，请稍等...',
        spinnerType: 'fading-circle',
      })
      console.log(_this.item);
      $.ajax({
        type: 'post',
        url:  HOST_HOME + '/djlyApp!doDjlyApp.action',
        data: _this.item,
        dataType: 'json',
        success: function (res) {
          Dialog.alert({
            title: '预约成功!',
            message: '你所提交的预约信息已经提交成功,请及时跟进申请状况。',
          }).then(() => {
            Indicator.close()
            _this.qxDj()
          })
        },
        error: function (res) {
          Indicator.close()
        },
      })
    },
    /**
    //  * 获取选择框数据
    //  * @param dicId  dicId  （3 利用目的 5 利用方式）
    //  */
    // getSelect(dicId) {
    //   let _this = this
    //   $.ajax({
    //     url:
    //       '/' +
    //       HOST_HOME +
    //       '/dictionaryApp!getSysDictData.action?dicId=' +
    //       dicId,
    //     success: function (res) {
    //       if (res.success) {
    //         let list = res.result[0].rows
    //         if (dicId == 3) {
    //           _this.lyMd = list
    //         }
    //         if (dicId == 5) {
    //           _this.lyfs = list
    //         }
    //       }
    //     },
    //   })
    // },
  }
}
</script>

<style>
.mainCont {
  margin-bottom: 50px;
  height: calc(100vh - 100px);
  overflow: auto;
  background: #ffffff;
}
.mint-cell-title {
  text-align: left;
}
.title {
  margin: 0;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 0 !important;
  text-align: left !important;
  border-bottom: 1px solid transparent;
}
.title span {
  display: inline-block;
  background: #ef6b42;
  color: #ffffff;
  padding: 4px 10px;
  margin-right: 10px;
}
html {
  background: #ffffff;
}
.ts {
  color: red;
  font-size: 12px;
  text-align: left;
  text-indent: 1em;
  margin-bottom: 10px;
}

.van-field__label {
  width: 5.2em !important;
  text-align: right !important;
}
.van-field__control--right {
  text-align: left !important;
  
}

</style>
