<template>
  <div>
    <headnav :title="title"></headnav>
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
                     label="*联系地址"
                     placeholder="请输入联系地址" />
        </van-cell-group>

        <h4 class="title"><span>利用档案信息</span>(带*均为必填项)</h4>
        <van-cell-group>
          <van-field v-model="item.Purpose"
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
        <!--日期选择弹框-->

        <van-field readonly
                   clickable
                   name="calendar"
                   :value="item.cratetime"
                   label="*预约时期"
                   placeholder="点击选择预约日期"
                   @click="showCalendar = true" />
        <van-calendar v-model="showCalendar"
                      @confirm="onConfirm" />
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
import { Dialog } from 'vant'
import { Indicator, Toast } from 'mint-ui'
export default {
  name: 'archDetail_sq',
  data() {
    return {
      title: '档案利用预约申请',
      cratetime: new Date(),
      showPickerDate: false,
      popupVisible1: false,
      popupVisible2: false,
      showCalendar: false,
      purpose: '',
      modeClass: '',
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
        purpose: '',
        modeClass: '',
        Purpose: '',
        remark: '',
        cratetime: '',
      },
    }
  },
  components: {
    headnav,
  },
  mounted() {
    var query = this.$route.query
    Object.assign(this.item, query)
  },
  methods: {
    onConfirm(date) {
      this.value = `${date.getMonth() + 1}/${date.getDate()}`
      this.item.cratetime = `${date.getMonth() + 1}/${date.getDate()}`
      this.showCalendar = false
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
      let _this = this
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
      if (this.item.address == '') {
        Toast('联系地址不能为空~')
        return false
      }

      if (this.item.cratetime == '') {
        Toast('请选择预约时间~')
        return false
      }
       Indicator.open({
         text: '处理中，请稍等...',
         spinnerType: 'fading-circle',
       }
       )
      $.ajax({
        type: 'post',
        url: HOST_HOME + '/djlyApp!doDjlyApp.action',
        data: _this.item,
        dataType: 'json',
        success: function (res) {
          Dialog.alert({
            title: '预约成功!',
            message: '你所提交的预约信息已经提交成功,请及时跟进申请状况。',
          }).then((res) => {
            _this.qxDj()
            Indicator.close()
          })
        },
        error: function (res) {
          Indicator.close()
        },
      })
    },
  },
}
</script>

<style>
.mainCont {
  margin-top: 50px;
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
