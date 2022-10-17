<template>
	<div style="overflow: hidden;background: #f8f8f8;height: 100%">
		<headernav :title="title"></headernav>
		<div style="height:calc(100vh - 50px);overflow: auto;padding-top:50px">
      <div >
        <div class="searchLeft">
          <input
            style="width: 100%; padding-left: 3%;background: #ffffff"
            type="search"
            class="searchText"
            placeholder="请输入题名"
            @keyup.enter="searchFile"
            v-model="item.title"
            @focusin="pushText"
          />
        </div>

        <div class="btn">
          <mt-button size="small" slot="right" @click="searchFile"
          >搜索</mt-button
          >
        </div>
      </div>
      <div @click="setSort()" class="sort" style="text-align: right;display: flex;align-items: center;justify-content: flex-end;margin:10px 6%">
        <van-icon v-if="!sort" name="arrow-up" />
        <van-icon v-else name="arrow-down" />
        <span style="margin-left: 5px">排序</span>
      </div>

      <div style="height: calc(100% - 61px);overflow: auto">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="text"
          @load="load"
        >
          <div @click="showInfo(item.ID)" v-for="item in list" :key="item" class="list-item">
            <h4>{{item.ARCH_NO}}</h4>
            <p>{{item.TITLE}}</p>
            <div>
              <span>{{item.CREATE_TIME}}</span>
              <span style="color: #ef6b42">查看详情</span>
            </div>
          </div>
        </van-list>
      </div>
		</div>

	</div>


</template>

<script>
	import headernav from '../components/header.vue'
	export default{
		name:"historySearch",
		data(){
			return{
        isSort:false,
				title:"利用结果查询",
        focus:false,
        keyWord:'',
        sort:false,
        list: [],
        loading: false,
        finished: false,
        item:{
          cardNo:'',
          order:'desc',//排序 desc asc
          title:'',
          page:0,
          rows:10,
        },
        text:'没有更多了',
			}
		},
		components:{
			headernav,
		},
    mounted() {
      Object.assign(this.item,this.$route.query);
    },
    methods:{
      pushText() {
        this.focus = false;
      },
      /**
       * 关键词搜索
       */
      searchFile(){
        this.finished = false;
        this.item.page = 1;
        this.onLoad();
      },
      /**
       * 排序
       */
      setSort(){
        if(!this.isSort){
          this.finished = false;
          this.isSort = true;
          this.sort=!this.sort;
          this.item.order = this.sort ? 'asc' : 'desc';
          this.item.page = 1;
          this.list = [];
          this.onLoad()
        }
      },
      load(){
        console.log(this.item.page)
        this.item.page = this.item.page + 1;
        console.log(this.item.page)
        this.onLoad();
      },
      /**
       * 搜索列表
       */
      onLoad() {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        // setTimeout(() => {
        //   for (let i = 0; i < 10; i++) {
        //     this.list.push(this.list.length + 1);
        //   }
        //
        //   // 加载状态结束
        //   this.loading = false;
        //
        //   // 数据全部加载完成
        //   if (this.list.length >= 40) {
        //     this.finished = true;
        //   }
        // }, 1000);
        let _this = this;
        if(_this.item.page == 1){
          _this.list = [];
        }
        $.ajax({
          url:'/'+HOST_HOME+'/djlyApp!listByCard.action',
          type:'post',
          data:_this.item,
          success:function (res) {
            if(res.success){
              _this.loading = false;
              var rows = res.result[0].rows;
              _this.list = _this.list.concat(rows);
              _this.isSort = false;
              if(rows.length == 0){
                _this.text = '没有查询到数据，请检查证件号码是否有误。'
                _this.finished = true;
                return false;
              }
              if(_this.list.length == res.result[0].count){
                _this.finished = true;
              }
              _this.text = '没有更多了。'
            }
          }
        })
      },
      /**
       * 跳转详情
       */
      showInfo(id){
        this.$router.push({
          path:'/historyDetail',
          query:{
            id:id
          }
        })
      }
    }
	}
</script>

<style>
.searchLeft {
  width: 72%;
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
  line-height:33px;
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
.list-item{
  text-align: left;
  background: #FFFFFF;
  padding: 14px;
  margin: 14px;
  border-radius: 3px;
}
.list-item h4{
  font-size: 18px;
  margin-left: 0!important;
}
.list-item p{
  font-size: 14px;
}
.list-item div{
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
