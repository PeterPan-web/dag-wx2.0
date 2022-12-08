<template>
  <div>
    <headernav :title="title" :show="show"></headernav>
	
    <div class="search" style="margin-top: 50px">
		<div class="row" style="padding: 0em 0.5em;" :style="isShow?'display:block':'display:none'">
			<div>
				<span>已选分类:</span>
				<span  v-for="(item, index) in selectTableList"
                :key="index">
					<span class="rich-text-color" id="selected_type">{{item.OPTIONNAME}}档案</span>
					<span @click="close(index)">
						<svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 24 24" width="0.8em" height="0.8em" style="fill: rgb(174, 174, 174);"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>
					</span>
				</span>
			</div>
		</div>
      <div class="searchLeft">
        <input
          style="width: 100%; padding-left: 3%"
          type="search"
          class="searchText"
          placeholder="请输入内容进行搜索"
          @keyup.enter="searchFile"
          v-model="keyWord"
          @focusin="pushText"
        />
      </div>

      <div class="btn">
        <mt-button size="small" slot="right" @click="searchFile"
          >搜索</mt-button
        >
      </div>
	   <div v-if="focus">
        <mt-loadmore
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          :auto-fill="false"
          ref="loadmore"
        >
          <ul style="width: 90vw; margin: 0 auto; overflow: auto">
            <li
              v-for="(item,index) in list" :key="index"
              @click="toDetail(item)"
              style="border-bottom: #ccc solid 1px; width: 100%"
            >
              <p class="searchTitle">{{ item.TITLE }}</p>
              <p class="searchContent">
                {{ item.ARCHNO }}&nbsp;&nbsp;{{ item.FILEYEAR }}&nbsp;&nbsp;{{
                  item.LIMITED
                }}
              </p>
            </li>
          </ul>
        </mt-loadmore>
      </div>
      <div v-else>
        <div style="height: 24px; line-height: 24px;margin-top:15px">
          <span class="his">历史记录</span>
          <span class="clear" @click="clearCode"></span>
        </div>
        <ul style="text-align: left;margin-top:30px">
          <li
            v-for="(item1,index) in historyList"
            :key="index"
            @click="toSearch(item1.TITLE)"
            style="display: inline-block"
          >
            <span
              style="
                font-size: 13px;
                display: inline-block;
                padding: 3px 7px;
                background: #ddd;
                border-radius: 3px;
                margin: 0px 15px 15px 15px;
              "
              >{{ item1.TITLE }}</span
            >
          </li>
        </ul>
      </div>
    <div id="listContent">
     
      <div class="form">
        <div class="row">
          <div class="col-12">
            <h4>常用分类</h4>
            <div class="row">
              <div
                class="col-2"
                v-for="(item, index) in tableList"
                :key="index"
				@click="selectTable(item)"
              >
              
                <div
                  class="box circle select_type"
                  :class="
                    index == 1
                      ? 'pink'
                      : index == 3
                      ? 'yellow'
                      : index == 5
                      ? 'green'
                      : 'blue'
                  "
                >
                  <span> {{ item.OPTIONNAME }}<br />档案 </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
</template>

<script>
import headernav from "../../components/header.vue";
export default {
  name: "index",
  data() {
    return {
      title: "档案检索",
      keyWord: "",
      list: [],
      selectTableList: [],
      tableList: [],
      historyList: [],
      allLoaded: false,
      currentPage: 1,
      pageSize: 15,
      total: 0,
      focus: false,
	  show: true,
	  isShow:false,
	  params: {},
	  curTable:''
    };
  },
  mounted() {
    this.getTableList();
  },
  activated() {
    WeixinJSBridge.call("hideToolbar");
    WeixinJSBridge.call("hideOptionMenu");
    if (typeof this.params.top == "undefined") {
      this.getHistory();
    } else {
      document.getElementById("listContent").scrollTop = this.params.top;
    }
  },

  methods: {
	close(index){
		var _this = this;
		_this.selectTableList.splice(index, 1); 
		if(_this.selectTableList.length == 0){
			_this.isShow = false;
		}
	},
    getTableList() {
	  var openId = localStorage.getItem("ltjyopenId");
	  var _this = this;
      $.ajax({
        type: "post",
        url: TABLE_URL,
        data: {
		  openid: openId
        },
        dataType: "json",
        success: function (res) {
          	_this.tableList = res.result.tables;
        },
      });
	},
	selectTable(item){
		var _this = this;
		_this.isShow = true;
		var flag=false;
		if(_this.selectTableList.length > 0){
			for(var i=0;i<_this.selectTableList.length;i++){
				if(_this.selectTableList[i].ID == item.ID){
					flag=true;
				}
			}
		}
		if(!flag){
			_this.selectTableList.push(item);
		}
	},
    getAccessToken(code) {
      if (code) {
        $.ajax({
          type: "post",
          url: GETCODE_URL,
          data: {
            code: code,
          },
          dataType: "json",
          success: function (res) {},
        });
      }
    },
    loadBottom() {
      this.allLoaded = true;
      if (this.total > 0 && this.list.length < this.total) {
        this.allLoaded = false;
        this.currentPage++;
        this.commonGet();
      }
      this.$refs.loadmore.onBottomLoaded();
    },
    searchFile() {
      this.list = [];
      this.focus = true;
      $(".searchText").blur();
      this.commonGet();
	},
	gettableIds(){
		var str='';
		for(var i=0;i<this.selectTableList.length;i++){
			if(i+1 == this.selectTableList.length){
				str += this.selectTableList[i].ID;
			}else{
				str += this.selectTableList[i].ID+",";
			}
		}
		return str;
	},
    commonGet() {
      var _this = this;
	  var openId = localStorage.getItem("ltjyopenId"),
	  tableIds = _this.gettableIds();
	  
      $.ajax({
        type: "post",
        url: SEARCH_URL,
        data: {
          key: _this.keyWord,
          openid: openId,
          currentPage: _this.currentPage,
		  pageSize: _this.pageSize,
		  tableIds:tableIds
        },
        dataType: "json",
        success: function (res) {
          if (res.success) {
            if (res.result[0].loginS == 0) {
              _this.$toast("请关注公众号");
              return;
            }
            _this.total = res.result[0].count;
            _this.list.push.apply(_this.list, res.result[0].rows);
            _this.historyList = res.result[0].history;
          }
        },
      });
    },

    toDetail(item) {
      this.params.top = document.getElementById("listContent").scrollTop;
      localStorage.setItem("argument", JSON.stringify(item));
      localStorage.setItem("mark", 0);
      this.$router.push({
        path: "/archDetail",
        query: { argument: item, mark: 0 },
      });
    },
    getParams() {
      this.params = this.$router.history.current.query;
    },
    pushText() {
      this.focus = false;
    },
    toSearch(title) {
      this.keyWord = title;
      this.searchFile();
    },
    getHistory() {
      var _this = this;
      var openId = localStorage.getItem("ltjyopenId");
      $.ajax({
        url: HISTORY_URL,
        type: "post",
        data: {
          openid: openId,
        },
        success: function (res) {
          _this.historyList = res.result[0].history;
        },
        error: function (status) {},
      });
    },
    clearCode() {
      var _this = this;
      var openId = localStorage.getItem("ltjyopenId");
      $.ajax({
        type: "post",
        url: CLEAR_URL,
        data: {
          openid: openId,
        },
        dataType: "json",
        success: function (res) {
          _this.historyList = [];
        },
      });
    },
    setColor() {
      var _this = this;
      var txt = this.txt;
      var newRegExp = new RegExp(_this.keyWord, "gm");
      this.txt1 = txt.replace(
        newRegExp,
        "<span style='color:red'>" + _this.keyWord + "</span>"
      );
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
.row:before,
.container:before,
.row:after {
  display: table;
  content: " ";
}
.row:after {
  clear: both;
}
:after,
:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.form {
  margin: 1em 0em;
  min-height: 3em;
}
.form-content {
  position: relative;
  height: 4em;
  margin-top: 0.7em;
}
.form-content p {
  color: gray;
  font-family: SourceHanSansSC;
  font-size: 0.6em;
  font-weight: 100;
  padding-left: 1em;
}
.form-content svg {
  position: absolute;
  left: 0.5em;
  top: 0.6em;
}
.search {
  margin-top: 50px;
  height: 50px;
  background: white;
  line-height: 50px;
  text-align: left;
  margin: 0 auto;
}
.searchLeft {
  width: 72%;
  height: 50px;
  margin-left: 2%;
  padding-left: 1%;
  display: inline-block;
}
.searchText {
  background: #f4f4f4;
  width: 100%;
  height: 33px;
  padding-left: 2%;
  border: none;
  border-radius: 4px;
}
.searchTitle {
  overflow: hidden;
  white-space: nowrap;
  font-size: 15px;
  font-weight: 600;
}
.searchTitle,
.searchContent {
  text-align: left;
  width: 100%;
  text-overflow: ellipsis;
  margin: 5px 0px;
}
.searchContent {
  font-size: 12px;
}
ul {
  list-style: none;
}
.btn {
  display: inline-block;
  width: 22%;
  text-align: center;
}
#listContent {
  height: calc(100vh - 100px);
  overflow: auto;
}
.his {
  display: inline-block;
  font-size: 14px;
  float: left;
  margin-left: 18px;
  font-weight: 600;
}
.clear {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(../static/img/clear.jpg);
  background-size: 100% 100%;
  float: right;
  margin-right: 18px;
  margin-top: 2px;
}
.box.circle {
  border-radius: 50%;
  border: 1px solid rgb(237 237 237);
  color: rgb(99, 99, 99);
  padding-top: 10px;
  font-size: 16px;
  line-height: 18px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  width: 60px;
  height: 48px;
}
.paddingLeft-xs {
  padding: 0em 1em;
}
.circle input,
.circle {
  border-radius: 3em;
}
.red {
  color: red;
  vertical-align: middle;
}
.pink {
  background-color: rgb(255, 245, 245);
  border-color: rgb(187, 187, 187);
}
.blue {
  background-color: rgb(243, 249, 253);
  border-color: rgb(187, 187, 187);
}
.yellow {
  background-color: rgb(255, 248, 241);
  border-color: rgb(187, 187, 187);
}
.green {
  background-color: rgb(244, 251, 243);
  border-color: rgb(187, 187, 187);
}
[class*="col-"] {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  position: relative;
  min-height: 0.1em;
  padding-right: 0.5em;
  padding-left: 0.5em;
  float: left;
  line-height: 2em;
  text-align: center;
}
.col-1 {
  width: 8.33333333%;
}
.col-2 {
  width: 19.66666667%;
}
.col-3 {
  width: 25%;
  padding-left: 0%;
}
.col-4 {
  width: 33.33333333%;
}
.col-5 {
  width: 41.66666667%;
}
.col-6 {
  width: 50%;
}
.col-7 {
  width: 58.33333333%;
}
.col-8 {
  width: 66.66666667%;
}
.col-9 {
  width: 75%;
}
.col-10 {
  width: 80.33333333%;
}
.col-11 {
  width: 91.66666667%;
}
.col-12 {
  width: 100%;
}
h4 {
  margin-left: 10px;
  text-align: left;
}
</style>
