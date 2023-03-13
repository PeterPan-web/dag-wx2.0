<template>
  <div>
    <headernav :title="title"></headernav>
    <div
      style="margin-top: 50px"
      :style="display == 0 ? 'display:block' : 'display:none'"
    >
      <h3>请选择投诉原因</h3>
      <div class="box">
        <mt-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.NAME"
          is-link
          @click.native="goCommit(item)"
        >
          <span></span
        ></mt-cell>
      </div>
    </div>
    <div
      style="margin-top: 50px"
      :style="display == 1 ? 'display:block' : 'display:none'"
    >
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
      <div class="content_consult" :style="'top:'+contentTop+'px'">
        <div class="form">
          <mt-field
            label=""
            placeholder="请输入投诉描述"
            type="textarea"
            rows="4"
            v-on:input="inputFunc"
            @blur.native.capture="blurChange"
            @focus.native.capture="focusChange"
            :attr="{ maxlength: 200 }"
          >
          </mt-field>
          <p style="text-align: right">
            <span>{{ inputLen }}</span
            >/200
          </p>
        </div>
        <div
          style="
            height: 40vw;
            border: 1px solid rgb(244, 244, 244);
            overflow-x: auto;
            overflow-y: hidden;
          "
        >
          <p class="left">证据截图({{ imgList.length }}/4)：</p>
          <div :style="'width:' + ((imgList.length + 1) * 30 + 10) + 'vw'">
            <div class="upload_box" @click="showActionSheet()">
              <span> +</span>
            </div>
            <input
              id="upload_file"
              type="file"
              style="display: none"
              accept="image/*"
              name="file"
              @change="fileChange($event)"
            />

            <div
              class="upload_warp_img"
              v-for="(item, index) in successImgList"
              :key="index"
            >
              <img :src="item" style="display: inline-block" @click="lookImg(item)" />
            </div>

            <!-- <div class="upload_warp_text">
              <span
                >选中{{ imgList.length }}张文件，共{{
                  bytesToSize(this.size)
                }}</span
              >
            </div> -->
          </div>
        </div>
        <div style="margin-top: 20px;text-align: center;">
          <mt-button
            style="width: 45vw"
            type="primary"
            @click="commitComplain()"
            >提交</mt-button
          >
        </div>
      </div>
    </div>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="1">
        <span @click="back()"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="svg-icon-1"
            viewBox="0 0 24 24"
            width="38"
            height="38"
            style="fill: rgb(16, 16, 16)"
          >
            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path>
          </svg>
        </span>
      </mt-tab-item>
      <mt-tab-item id="2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="svg-icon-2"
          viewBox="0 0 24 24"
          width="38"
          height="38"
          style="fill: rgb(174, 174, 174)"
        >
          <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path>
        </svg>
      </mt-tab-item>
    </mt-tabbar>
      <mt-popup v-model="popupVisible" position="left" modal=false style="width:100%;background-color:transparent;">
      <img :src="lookSrc" style="max-width: 95%;">
    </mt-popup>
  </div>
</template>

<script>
import { Toast,Popup } from "mint-ui";
import headernav from "../components/header.vue";
export default {
  name: "index",
  data() {
    return {  
      title: "投诉详情",
      list: [],
      id: "",
      contentTop:135,
      selected: "1",
      display: 0,
      curList: {},
      imgList: [],
      successImgList: [],
      datas: new FormData(),
      files: 0,
      size: 0,
      introduction: "",
      inputLen: 0,
      complaintDescribe: "",
      successImgStr:'',
      popupVisible:false,
      lookSrc:'',
      reasonContent:''
    };
  },
  watch: {
    complaintDescribe: function (val, oldVal) {
      if (this.complaintDescribe.length == 200) {
        this.$toast("最多输入两百字");
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
  },
  mounted() {
    this.getTableList();
  },
  methods: {
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
    goCommit(item) {
      var _this = this;
      _this.display = 1;
      _this.curList = item;
      _this.getReasonList();
    },
    getReasonList() {
      var _this = this;
      $.ajax({
        type: "post",
        url: ADDCOMPLAINRt_URL,
        data: {
          fileId: _this.id,
          reasonId: _this.curList.ID,
        },
        dataType: "json",
        success: function (res) {
          console.log(res);
          _this.reasonContent = res.result[0].fileinfo[0].CONTENT;
          if(_this.reasonContent.length > 50){
            _this.reasonContent = _this.reasonContent.substring(0,5)+"...";
          }
        },
          error: function(){
            _this.$toast("获取投诉原因列表失败");
          }
      });
    },
    commitComplain() {
      var _this = this;
      var openId = localStorage.getItem("yjqopenId");
      console.log(_this.successImgStr);
      $.ajax({
        type: "post",
         url: SAVECOMPLAINRt_URL,
        data: {
          fileId: _this.id,
          complaintDescribe: _this.complaintDescribe,
          reasonId: _this.curList.ID,
          picture: _this.successImgStr,
          openid: openId,
        },
        dataType: "json",
        success: function (res) {
          if(res.success == true){
            _this.$toast("提交成功");
            _this.back();
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
          error: function(){
            _this.$toast("提交失败");
          }
      });
    },
    getTableList() {
      var _this = this;
      $.ajax({
        type: "post",
        url: COMPLAINR_URL,
        data: {
          fileId: _this.id,
        },
        dataType: "json",
        success: function (res) {
          _this.list = res.result[0].reasons;
        },
      });
    },
    //调用相册&相机
    fileClick() {
      $("#upload_file").click();
    },
    //调用手机摄像头并拍照
    getImage() {
      let cmr = plus.camera.getCamera();
      cmr.captureImage(
        function (p) {
          plus.io.resolveLocalFileSystemURL(
            p,
            function (entry) {
              compressImage(entry.toLocalURL(), entry.name);
            },
            function (e) {
              plus.nativeUI.toast("读取拍照文件错误：" + e.message);
            }
          );
        },
        function (e) {},
        {
          filter: "image",
        }
      );
    },
    //从相册选择照片
    galleryImgs() {
      plus.gallery.pick(
        function (e) {
          let name = e.substr(e.lastIndexOf("/") + 1);
          compressImage(e, name);
        },
        function (e) {},
        {
          filter: "image",
        }
      );
    },
    //点击事件，弹出选择摄像头和相册的选项
    showActionSheet() {
      this.fileClick();
      //  let bts = [{
      //   title: "拍照"
      //  }, {
      //   title: "从相册选择"
      //  }];
      //  console.log( plus.nativeUI.actionSheet);
      //  plus.nativeUI.actionSheet({
      //    cancel: "取消",
      //    buttons: bts
      //   },
      //   function(e) {
      //    if (e.index == 1) {

      //     this.getImage();
      //    } else if (e.index == 2) {
      //     this.galleryImgs();
      //    }
      //   }
      //  );
    },
    lookImg(src){
      this.popupVisible = true;
      this.lookSrc = src;
    },
    compress(fileObj, callback) {
      var size = fileObj[0].size /1024/1024,squareJ;

      if (typeof FileReader === "undefined") {
      } else {
        var reader = new FileReader();
        reader.onload = function (e) {
           if(size >=  5){
          //要先确保图片完整获取到，这是个异步事件
          var image = new Image(),
            square,
            canvas,
            context,
            imageWidth,
            imageHeight,
            data;
          image.src = e.target.result;

          image.onload = function () {

            (square = squareJ), //定义画布的大小，也就是图片压缩之后的像素
              (canvas = document.createElement("canvas")), //创建canvas元素
              (context = canvas.getContext("2d")),
              (imageWidth = Math.round(square * image.width)), //压缩图片的大小
              (imageHeight = Math.round(square * image.height)),
              (data = "");

            canvas.width = imageWidth;
            canvas.height = imageHeight;
            context.clearRect(0, 0, imageWidth, imageHeight); //在给定矩形内清空一个矩形
            context.drawImage(this, 0, 0, imageWidth, imageHeight);
             var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            for(var i = 0; i < imageData.data.length; i += 4) {
                // 当该像素是透明的，则设置成白色
                if(imageData.data[i + 3] == 0) {
                    imageData.data[i] = 255;
                    imageData.data[i + 1] = 255;
                    imageData.data[i + 2] = 255;
                    imageData.data[i + 3] = 255;
                }
            }
            context.putImageData(imageData, 0, 0);
            var data = canvas.toDataURL("image/jpeg", 0.6);
            //压缩完成执行回调
            callback(data);
          };

          }else{
            callback(e.target.result);
          }
        };
        reader.readAsDataURL(fileObj[0]);
      }
    },
    uploadPic(imgStr) {
      var _this = this;
      // console.log(imgStr);
      if (_this.successImgList.length < 4) {
        $.ajax({
          type: "post",
          url: UPLOAD_URL,
          data: {
            imgStr: imgStr,
          },
          dataType: "json",
          success: function (res) {
            _this.$toast("上传成功");
            _this.successImgList.push("/" + res.result);
            _this.uploadPicStrJoin(res.result);
          },
          error: function(){
            _this.$toast("上传失败");
          }
        });
      } else {
        _this.$toast("最多上传四张图哦");
      }
    },
    uploadPicStrJoin(str){
      if(this.successImgList.length > 0){
        for(var i=0;i<this.successImgList.length;i++){
          if(i+1 == this.successImgList.length){
            this.successImgStr += str;
          }else{
            this.successImgStr += str+",";
          }
        }
      }else{
            this.successImgStr += str;
      }
    },
    fileChange(el) {
      var _this = this;
      this.files = $("#upload_file").get(0).files;
      var reader = new FileReader(),
        file;
      console.log(el);
      for (let i = 0; i < this.files.length; i++) {
        this.datas.append("file", this.files[i]);
      }

      _this.compress(this.files, function (imgBase64) {
        _this.uploadPic(imgBase64);
      });
      this.show1 = false;
      if (!el.target.files[0].size) return;
      this.fileList(el.target);
      el.target.value = "";
    },
    fileList(fileList) {
      let files = fileList.files;
      for (let i = 0; i < files.length; i++) {
        //判断是否为文件夹
        if (files[i].type != "") {
          this.fileAdd(files[i]);
        } else {
          //文件夹处理
          this.folders(fileList.items[i]);
        }
      }
    },
    //文件夹处理
    folders(files) {
      let _this = this;
      //判断是否为原生file
      if (files.kind) {
        files = files.webkitGetAsEntry();
      }
      files.createReader().readEntries(function (file) {
        for (let i = 0; i < file.length; i++) {
          if (file[i].isFile) {
            _this.foldersAdd(file[i]);
          } else {
            _this.folders(file[i]);
          }
        }
      });
    },
    fileAdd(file) {
      //总大小
      this.size = this.size + file.size;
      //判断是否为图片文件
      if (file.type.indexOf("image") == -1) {
        file.src = "wenjian.png";
        if (this.imgList.length < 4) {
          console.log(file);
          this.imgList.push({
            file,
          });
        }
      } else {
        let reader = new FileReader();
        reader.vue = this;
        reader.readAsDataURL(file);
        reader.onload = function () {
          file.src = this.result;

          if (this.vue.imgList.length < 4) {
            this.vue.imgList.push({
              file,
            });
          }
        };
      }
    },
    fileDel(index) {
      this.size = this.size - this.imgList[index].file.size; //总大小
      this.imgList.splice(index, 1);
    },
    bytesToSize(bytes) {
      if (bytes === 0) {
        return "0 B";
      }
      let k = 1000, // or 1024
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
    },
    dragenter(el) {
      el.stopPropagation();
      el.preventDefault();
    },
    dragover(el) {
      el.stopPropagation();
      el.preventDefault();
    },
    drop(el) {
      el.stopPropagation();
      el.preventDefault();
      this.fileList(el.dataTransfer);
    },
    shows(et, tx) {
      this.strut = et;
      this.txt = tx;
    },
  },
  components: {
    headernav,
  },
};
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
/* .is-selected svg{
    fill: rgb(16, 16, 16)!important;
} */
</style>
