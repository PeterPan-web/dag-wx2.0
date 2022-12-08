<template>
  <div>
    <headernav :title="title"></headernav>
    <div class="showdetail">
      <titlecomponent :title="titleT"></titlecomponent>
      <p class="detailp">
        <span class="detailspan">{{argument.INFORMATIONTYPE}}</span>
          <span>{{argument.PUBLISHDATE}}</span>
      </p>
      <imgcomponent :imgList="imgList"
                    :com="com" v-if="redlistshow" ></imgcomponent>
      <textcomponent :text="textContent"
                       ></textcomponent>
      <iconcomponent></iconcomponent>
      <morecomponent :argument="argument"
                     :url="url"></morecomponent>
    </div>
    <!-- 下方投诉 -->
    <mt-tabbar v-model="selected"
               fixed>
      <bottomcomponent :list="List"></bottomcomponent>
    </mt-tabbar>
  </div>
</template>

<script>
import headernav from '../components/header.vue'
import titlecomponent from '../components/title.vue'
import textcomponent from '../components/text.vue'
import imgcomponent from '../components/imgFile.vue'
import iconcomponent from '../components/consultIcon.vue'
import morecomponent from '../components/more.vue'
import bottomcomponent from '../components/consultBottom.vue'
export default {
  name: 'showDetail',
  data() {
    return {
      title: '移动展厅详情',
      titleT: '',
      selected: '移动展厅详情',
      params: {},
      textContent: '',
      selectId: '',
      imgList: [],
      argument: {},
      redlistshow:true,
      com: HOST_HOME,
      url: SHOWDETAIL_URL,
      List: {
        praiseUrl: SHOWPRAISE_URL,
        collectionUrl: SHOWCOLLECT_URL,
        commentUrl: SHOWADD_URL,
        getComment: SHOWGET_URL,
        forBidden: FORBIDDEN_URL,
        ps: {
          id: '',
          title: '',
          tableName: '',
          TABLENAME: '',
        },
      },
    }
  },
  methods: {
    getParams() {
      this.params = this.$route.query
    },
  },
  created() {
    this.getParams()
    this.argument = this.params.argument
    console.log(this.argument)
    this.titleT = this.params.argument.TITLE
     this.textContent = this.params.argument.CONTENTHTML
    this.selectId = this.params.argument.ID
    this.imgList.push(this.params.argument.PICTURE)
    this.List.ps.id = this.params.argument.ID
    this.List.ps.title = this.params.argument.TITLE
    this.List.ps.TABLENAME = this.params.argument.TABLENAME
    if (this.params.argument.COLUMN_NAME == '红色记忆') {
      this.redlistshow=false
      this.title = this.params.argument.CONTENT + '详情'
      this.List.praiseUrl = REDLIST_priaise_URL
      this.List.collectionUrl = REDLIST_collect_URL
      this.List.getComment = REDLIST_getcri_URL
      this.List.forBidden = REDLIST_isforbid_URL
      this.List.commentUrl = REDLIST_addcri_URL
      this.url = GET_DETAIL_REDLIST_URL
    }
    // WeixinJSBridge.call('hideToolbar');
    // WeixinJSBridge.call('hideOptionMenu');
  },
  components: {
    headernav,
    titlecomponent,
    textcomponent,
    imgcomponent,
    iconcomponent,
    morecomponent,
    bottomcomponent,
  },
}
</script>

<style scoped>
.textdiv {
  margin-top: 10rem;
}
.showdetail {
  height: calc(100vh - 82px);
  overflow: auto;
  margin-top: 40px;
}
.detailp {
  padding: 8px 0px;
  text-align: left;
}
.detailspan{
  display: inline-block;
  padding:0px 15px
}
</style>
