<template>
	<div>
		<mt-loadmore :bottom-method="loadBottom"  ref="loadmore" :auto-fill="false">
			<ul>
			    <li v-for="item in fileList" style="padding:6px 0px;border-bottom:1px solid #ccc">
			    	<span class="loadLeft"><img v-if="item.PICTURE ==null" :src="comPath"/>
			    	<img v-else :src="item.PICTURE" style="border-radius: 15px;"/></span>
			    	<span class="messageLoad">
			    		<p>{{item.USER_NAME}}</p>
			    		<p>{{item.CRITICISMINFO}}</p>
			    		<p>{{item.CRITICISMDATE | capitalize}}</p>
			    	</span>
			    </li>
			</ul>
		</mt-loadmore>
    <mt-button v-if="isShow" @click="gotoDj()" type="primary" size="large" style="width:90%;margin:10px 5%">登记利用</mt-button>
  </div>
</template>

<script>
	import Bus from './bus.js'
	export default{
		name:"more",
		props:["argument","url"],
		data(){
			return{
        isShow:false,
				fileList:[],
				total:0,
				id:"",
        archNo:"",
				primaryKey:"",
				tableName:"",
				currentPage:1,
				pageSize:15,
				comPath:"static/img/photo_user.jpg"
			}
		},
		filters: {
            capitalize: function (value) {
            	var t = new Date(value).getTime();
            	var cur = new Date().getTime();
            	var data = cur -t;
            	if(data/1000/60 <=3){
            		return "刚刚";
            	}else if(data/1000/60 <=30){
            		return "半小时前"
            	}else if(data/1000/60 < 60){
            		return "1小时前";
            	}else if(data/1000/60/60 <24){
            		return parseInt(data/1000/60/60)+"小时前";
            	}else{
            		return value;
            	}
            }
       	},
		activated(){
			this.primaryKey = this.argument.primaryKey;
			this.id = this.argument.id;
			this.tableName = this.argument.tableName;
			this.getFile();
		},
		methods:{
      /**
       * 跳转登记利用页面
       */
      gotoDj:function () {
        let query = {
          pKey: this.primaryKey,
          tableName : this.tableName,
          archNo : this.archNo,
          pId : this.id,
          title : this.argument.title,
        }
        this.$router.push({
          path:'/archDetail_sq',
          query:query
        })
      },
			loadBottom(){
				this.allLoaded = true;
				if(this.total > 0 && this.fileList.length < this.total){
					this.allLoaded = false;
					this.currentPage++;
					this.getFile();
				}
				this.$refs.loadmore.onBottomLoaded();
			},
			getFile(){
				var _this = this;
				var openId = JSON.parse(localStorage.getItem("ltjyopenId"));   
				var hft_id = localStorage.getItem("hft_id");
				$.ajax({
					type:"post",
					url:_this.url,
					data:{
						id:_this.id,
						PrimaryKey:_this.primaryKey,
						tableName:_this.tableName,
						currentPage:_this.currentPage,
						openid : openId,
						hft_id : hft_id,
						pageSize:_this.pageSize
					},
					dataType:"json",
					success:function(res){
						_this.fileList = res.result.comment;
            _this.archNo = res.result.query[0].ARCHNO;
						Bus.$emit("praise",res.result.praiseCount,res.result.readCount);
						Bus.$emit("msg",res.result.count,res.result.p,res.result.c);
						Bus.$emit("getTxt",res.result.query[0]);
						Bus.$emit("getFileList",res.result.objInfo);
            _this.isShow = true;
					}
				});
			}

		}
	}
</script>

<style>
	.loadLeft{
		display: inline-block;
		width:30px;
		height:30px;
		vertical-align: top;
	}
	.loadLeft img{
		width:100%;
		height:100%;
	}
	.messageLoad{
		display: inline-block;
		width:75vw;
		text-align: left;
		padding-left:2vw;
		font-size:13px;
	}

	.messageLoad p{
		margin:3px 0px;
		width:100%;
		word-wrap: break-word;
  		word-break: break-all;
  		overflow: hidden;
	}
	.messageLoad p:first-child{
		margin:0px 0px 3px 0px;
	}
</style>
