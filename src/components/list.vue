<template>
	<div>
		<mt-loadmore   :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false">
			<ul style="width:calc(100vw - 10px);display: inline-block;vertical-align: top;margin-top: 5px;margin-left:10px">
			    <li v-for="(item,index) in list" :key="index" @click="toDetail(item)" style="height:60px;width:100%;border-bottom: #b0a5a9 solid 1px;overflow: hidden;padding: 5px;display: flex">
            <img style="height:60px;width:100px;margin-right: 10px;" :src="commonUrl+item.PICTURE">
				    <p style="line-height:50px;text-align:left;overflow: auto;white-space:nowrap;text-overflow:ellipsis;font-weight: 600;">{{item.TITLE}}</p>
			    </li>
			</ul>
		</mt-loadmore>
	</div>
</template>

<script>
	export default{
		name:"list",
		props:["mark","url"],
		data(){
			return{
				list:[],
				imgList:[],
				allLoaded:false,
				commonUrl:HOST_HOME,
				imgIcon:"static/img/dbanner1.png"
			}
		},
		created(){
			this.getFile();
		},
		methods:{
			loadTop(){
				this.allLoaded =false;
				this.$refs.loadmore.onTopLoaded();
				this.list = [];
				this.getFile();
			},
			toDetail(item){
				this.$router.push({path:"/consultDetail",query:{argument:item}})
			},
			getFile(){
				var _this = this;
				$.ajax({
					type:"post",
					url:_this.url,
					data:{
						encode:"DAZXXXLB",
						type:"1"
					},
					dataType:"json",
					success:function(res){
						_this.list.push.apply(_this.list,res.result[0].pic);
						_this.imgList.push.apply(_this.imgList,res.result[0].newPic);
					}
				});
			}
		}
	}
</script>

<style>
	.listLeft{
		display: inline-block;
		width:100%;
		height:100%;
		margin-top:10px;
		margin-left:10px ;
	}
	.listLeft img{
		width:100%;
		height:100%;
	}
	.messageList{
		display: inline-block;
		width:75vw;
		text-align: left;
		padding-left:2vw;
		font-size:13px;
		vertical-align:top;
	}

	/*.messageList p{
		width:100%;
		word-wrap: break-word;
  		word-break: break-all;
  		overflow: hidden;
  		line-height: 40px;
	}*/
	/*.messageList p:first-child{
		margin:0px 0px 3px 0px;
	}*/
</style>
