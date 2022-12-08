<template>
  <div>
    <headernav :title="title"></headernav>
    <div style="margin-top: 50px"
         :style="display == 0 ? 'display:block' : 'display:none'">
      <h3>请选择投诉原因</h3>
      <div class="box">
        <mt-cell v-for="(item, index) in list"
                 :key="index"
                 :title="item.NAME"
                 is-link
                 @click.native="goCommit(item)">
          <span></span>
        </mt-cell>
      </div>
    </div>
    <div style="margin-top: 50px"
         :style="display == 1 ? 'display:block' : 'display:none'">
      <div style="margin-top: 60px">
        <div class="left">
          <span class="left">投诉标题：</span>
          <span class="left">{{ curList.NAME }}</span>
        </div>
        <div class="left">
          <span class="left">投诉内容：</span>
          <span class="left">{{reasonContent}}</span>
        </div>
      </div>
      <div class="content_consult"
           :style="'top:'+contentTop+'px'">
        <div class="form">
          <mt-field label=""
                    placeholder="请输入投诉描述"
                    type="textarea"
                    rows="4"
                     v-on:input="inputFunc"
                 @blur.native.capture="blurChange"
            @focus.native.capture="focusChange"
            :attr="{ maxlength: 200 }">
          </mt-field>
          <p style="text-align: right">
            <span>{{ inputLen }}</span>/200
          </p>
        </div>
        <div style="
            height: 40vw;
            border: 1px solid rgb(244, 244, 244);
            overflow-x: auto;
            overflow-y: hidden;
          ">
          <p class="left">证据截图</p>
          <div class="reaupload">
          <van-uploader v-model="fileList" multiple  :after-read="afterRead" />  
          </div>
          
        </div>
        <div style="margin-top: 20px;text-align: center;">
          <mt-button style="width: 45vw"
                     type="primary"
                     @click="commitComplain()">提交</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headernav from '../components/header.vue'
export default {
  name: 'index',
  data() {
    return {
               fileList: [
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      ],
      postfile:'',
      PICURL:UPLOAD_URL,
      TABLENAME:'',
      title: '投诉详情',
      list: [],
      id: '',
      contentTop: 135,
      selected: '1',
      display: 0,
      curList: {},
      imgList: [],
      successImgList: [],
      datas: new FormData(),
      files: 0,
      size: 0,
      introduction: '',
      inputLen: 0,
      complaintDescribe: '',
      successImgStr: [],
      popupVisible: false,
      lookSrc: '',
      reasonContent: '',
    }
  },
  watch: {
    complaintDescribe: function (val, oldVal) {
      if (this.complaintDescribe.length == 200) {
        this.$toast('最多输入两百字')
      }
    },
    // imgList: function (val, oldVal) {
    //   if(val.length == 4){
    //     this.$toast("最多上传四张图片");
    //   }
    // },
  },
  created() {
    this.id = this.$route.query.id;
    this.TABLENAME = this.$route.query.TABLENAME;
  },
  mounted() {
    this.getTableList()
  },
  methods: {
    getTableList() {
      var _this = this
      $.ajax({
        type: 'post',
        url: COMPLAINR_URL,
        data: {
          fileId: _this.id,
        },
        dataType: 'json',
        success: function (res) {
          _this.list = res.result[0].reasons
        },
      })
    },
        goCommit(item) {
      var _this = this;
      _this.display = 1;
      _this.curList = item;
      // _this.getReasonList();
    },
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
            console.log(res);
           _this.postfile=JSON.parse(res).result.imgStr;
           _this.successImgList.push(JSON.parse(res).result.imgStr)
					}
				});
    },

    // getReasonList() {
    //   var _this = this
    //   $.ajax({
    //     type: 'post',
    //     url: ADDCOMPLAINRt_URL,
    //     data: {
    //       fileId: _this.id,
    //       reasonId: _this.curList.ID,
    //     },
    //     dataType: 'json',
    //     success: function (res) {
    //       console.log(res);
    //       _this.reasonContent =res.result[0].fileinfo[0].CONTENT;
    //       if (_this.reasonContent.length > 50) {
    //         _this.reasonContent = _this.reasonContent.substring(0, 5) + '...'
    //       }
    //     },
    //     error: function () {
    //       _this.$toast('获取投诉原因列表失败')
    //     },
    //   })
    // },
    commitComplain() {
      var _this = this
      var openId =JSON.parse(localStorage.getItem('ltjyopenId')) 
      $.ajax({
        type: 'post',
        url: SAVECOMPLAINRt_URL,
        data: {
          fileId: _this.id,
          complaintDescribe: _this.complaintDescribe,
          reasonId: _this.curList.ID,
          picture: _this.postfile,
          openid: openId,
          tableName:_this.TABLENAME
        },
        dataType: 'json',
        success: function (res) {
          if (res.success == true) {
            _this.$toast('提交成功')
             _this.back()
            //   if(res.result[0].loginS == 0){
            //     _this.$toast("请关注公众号");
            //   }else if(res.result[0].loginS == true){
            //     _this.$toast("提交成功");
            //     _this.display = 0;
            //     _this.back();
            //   }
            // }else{
            //   _this.$toast("提交失败");
          }
        },
        error: function () {
          _this.$toast('提交失败')
        },
      })
    },

    // uploadPic(imgStr) {
    //   var _this = this
    //   // console.log(imgStr);
    //   if (_this.successImgList.length < 4) {
    //     $.ajax({
    //       type: 'post',
    //       url: UPLOAD_URL,
    //       data: {
    //         imgStr: imgStr,
    //       },
    //       dataType: 'json',
    //       success: function (res) {
    //         _this.$toast('上传成功')
    //         _this.successImgList.push('/' + res.result)
    //         _this.uploadPicStrJoin(res.result)
    //       },
    //       error: function () {
    //         _this.$toast('上传失败')
    //       },
    //     })
    //   } else {
    //     _this.$toast('最多上传四张图哦')
    //   }
    // },
focusChange(){
      this.contentTop = 45;
    },
    blurChange(){
      this.contentTop = 135;
    },
    inputFunc(value) {
      this.complaintDescribe = value;
      this.inputLen = value.length;
    },
       back() {
      if (this.display == 1) {
        this.display = 0;
      } else {
        this.$router.back(-1);
      }
    },
  },
  components: {
    headernav,
  },
}
</script>

<style>
body {
  background-color: white;
}
.left {
  text-align: left;
  padding-left: 20px;
}
.form .left {
  padding-left: 0px;
}
h3 {
  font-weight: 500;
  font-size: 26px;
}
.mint-field.is-textarea {
  border-bottom: none;
  border-top: 0px;
  background-image: none;
}
.mint-cell-wrapper {
  background-image: none;
}
.mint-field-other {
  bottom: 3px;
  position: absolute;
  right: 6px;
  top: auto;
}
.box {
  margin-top: 20px;
  padding: 0px 10%;
}
.mint-cell-title {
  text-align: left;
}
.mint-cell {
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;
}
.mint-tab-item-label {
  font-size: 16px;
}
.mint-tab-item {
  padding: 0px 0;
}
.mint-tabbar > .mint-tab-item.is-selected {
  background-color: transparent;
}
.title p:nth-child(2) {
  max-height: 120px;
  min-height: 100px;
  padding: 5px 20px;
  overflow-y: auto;
}
.content_consult {
  background-color: white;
  border-top: 2px solid rgb(227 227 227);
  border-radius: 30px 30px 0px 0px;
  position: absolute;
  top: 135px;
  bottom: 40px;
  width: 100%;
  overflow: auto;
}
.form {
  border-bottom: 1px solid #f4f4f4;
  padding: 0px 20px;
  position: relative;
}
.upload_button {
  height: 30px;
  width: 80px;
  font-size: 14px;
  line-height: 30px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  color: #fff;
  margin-left: 20px;
}
.upload_box {
  width: 28vw;
  height: 28vw;
  position: relative;
  background-color: #f4f4f4;
  margin: 10px 0px 10px 15px;
  display: inline-block;
  border-radius: 10px;
  float: left;
}
.upload_box span {
  font-size: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.upload_warp_img {
  width: 28vw;
  height: 28vw;
  display: inline-block;
  background-color: #f4f4f4;
  border-radius: 10px;
  text-align: center;
  margin: 10px 0px 10px 15px;
  display: inline-flex;
  float: left;
}
.upload_warp_img img {
  max-height: 100%;
  max-width: 90%;
  border: 1px solid #e3e3e3;
  margin: auto;
}
.reaupload{
  position: absolute;
  left:1rem;
  padding-top: 1rem;
}
/* .is-selected svg{
    fill: rgb(16, 16, 16)!important;
} */
</style>
