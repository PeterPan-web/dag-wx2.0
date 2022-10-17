<template>
  <div>
    <headernav :title="title"></headernav>
    <div style="height: calc(100% - 40px);margin-top: 40px">
      <h4 class="title">
        <span>利用表单信息:</span>
        <span @click="showInfo = !showInfo" style="color: #0b8def">{{!showInfo ? '展开' : '收起'}} ></span>
      </h4>
      <van-cell-group>
        <van-field label="利用预约单号" :value="item.DAN_NO" readonly />
        <van-field label="申请人" :value="item.APPLICANT" readonly />
        <van-field label="身份证号码" :value="item.CARD_NO" readonly />
        <van-field label="预约时间" :value="item.CREATE_TIME" readonly />
        <div v-if="showInfo">
          <van-field label="联系电话" :value="item.PHONE" readonly />
          <van-field label="现居住地址" :value="item.ADDRESS" readonly />
          <van-field label="利用目的" :value="lyMdName" readonly />
          <van-field label="利用方式" :value="lyfsName" readonly />
          <van-field label="备注" :value="item.REMARK" readonly />
        </div>
      </van-cell-group>
      <h4 class="title">利用档案信息:</h4>
      <div style="text-align: left;padding: 10px 15px;font-size: 14px;background: #ffffff">
        <div>{{item.TITLE}}</div>
        <div style="margin-top: 10px;">21071300001</div>
        <div style="margin-top: 10px;">
          <span>回复内容:</span>
          <span>{{item.REPLY_CONTENT}}</span>
        </div>
      </div>
<!--      <van-steps direction="vertical" :active="1" style="text-align: left;margin-top: 10px">-->
<!--        <van-step>-->
<!--          <h3>【城市】物流状态1</h3>-->
<!--          <p>2016-07-12 12:40</p>-->
<!--        </van-step>-->
<!--        <van-step>-->
<!--          <h3>【城市】物流状态2</h3>-->
<!--          <p>2016-07-11 10:00</p>-->
<!--        </van-step>-->
<!--        <div v-if="showMoreSteps">-->
<!--          <van-step>-->
<!--            <h3>快件已发货</h3>-->
<!--            <p>2016-07-10 09:30</p>-->
<!--          </van-step>-->
<!--        </div>-->
<!--      </van-steps>-->
<!--      <div v-if="!showMoreSteps" @click="showMoreSteps = !showMoreSteps" style="text-align: center;color: #0b8def;padding: 10px 0">查看更多</div>-->
      <mt-button v-if="item.STAR == null" @click="showEval = true" type="primary" size="large" style="width:90%;margin:10px 5%">评价</mt-button>
    </div>
    <van-dialog v-model="showEval" title="利用评价" @confirm="createEavl()" show-cancel-button>
      <div style="padding: 10px 20px">
        <div style="display: flex;align-items: center">
          <van-rate :size="30" v-model="rate" />
          <span style="margin-left: 10px">{{rate == 5 ? '非常满意' : rate == 4 ? '满意' : rate == 3 ? '一般' : rate == 2 ? '不满意' : '非常不满意' }}</span>
        </div>
        <van-field
          v-model="message"
          rows="2"
          autosize
          label=""
          label-width="0px"
          type="textarea"
          maxlength="50"
          placeholder="评价本次利用服务,可以帮助馆方更好的服务群众"
          show-word-limit
        />
      </div>
    </van-dialog>
  </div>
</template>

<script>
import Headernav from "../components/header";
import {Toast} from "mint-ui";
export default {
  name: "historyDetail",
  components: {Headernav},
  data(){
    return{
      title:'利用结果详情',
      showMoreSteps:false,
      showEval:false,
      showInfo:false,
      rate:5,
      message:'',
      id:'',
      item:{},
      lyMd:[],
      lyfs:[],
      lyMdName:'',
      lyfsName:'',
    }
  },
  mounted() {

    this.id = this.$route.query.id;
    this.getDetail();
  },
  methods:{
    /**
     * 提交评价
     */
    createEavl(){
      let _this = this;
        $.ajax({
          url:'/'+HOST_HOME+'/djlyApp!appraise.action',
          type:'post',
          data:{
            id:_this.id,
            star:_this.rate,
            content:_this.message,
          },
          success:function (res) {
            if(res.success){
              Toast('评价成功~');
            }else{
              Toast('评价失败~');
            }
          }
        })
    },
    /**
     * 获取详情
     */
    getDetail(){
      let _this = this;
      $.ajax({
        url:'/'+HOST_HOME+'/djlyApp!detailAppById.action?id='+_this.id,
        success:function (res) {
          if(res.success){
            _this.item = res.result[0].detailAppById[0];
            _this.getSelect(3);
            _this.getSelect(5);
          }
        }
      })
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
              _this.getTypeName(_this.item.PURPOSE,dicId)
            }
            if(dicId == 5){
              _this.lyfs = list;
              _this.getTypeName(_this.item.MODE_CLASS,dicId)
            }
          }
        }
      })
    },
    /**
     * 获取名称
     */
    getTypeName(val,type){
      let list = type == 3 ? this.lyMd : this.lyfs;
      for (let item of list) {
          if(item.CODE == val){
            if(type == 3){
              this.lyMdName = item.NAME
            }else{
              this.lyfsName = item.NAME;
            }
          }
      }
    }
  }
}
</script>

<style>
.title{
  margin: 0 12px!important;
  font-weight: normal;
  font-size: 14px;
  letter-spacing: 0!important;
  text-align: left!important;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}
</style>
