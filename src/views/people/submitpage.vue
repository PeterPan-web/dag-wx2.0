<template>
  <div id='submitpage'>
    		<headernav :title="title" style="margin-bottom:45px"></headernav>
        <div v-if="this.closeVERIFY" class="closeshow">
<van-steps :active="active" active-icon="success" active-color="#38f" class="steps">
  <van-step>接受审核</van-step>
  <van-step >审核中</van-step>
  <van-step >审核通过</van-step>
</van-steps>          
        </div>
<div class="closeshow  closestyle" v-if="!this.closeVERIFY">
  <p style="color:#A30303;">
    审核驳回
  </p>
  <p  style="margin-left:1rem">{{argument.VERIFYINFO}}</p>
</div>
<div class="title">
  <p>
   {{argument.TITLE}} 
  </p>
 
</div>
<div class="titletime">
   <p >
    投稿时间：{{argument.PUBLISHDATE}}
  </p>
</div>
<div class="content">
   <p >
    {{argument.MAINWORD}}
  </p>
</div>
  </div>
</template>

<script>
	import headernav from '../../components/header.vue'
  export default {
    nname:'submitpage',
    components:{
   headernav,
    },
		data(){
			return{
         active: 0,
        closeVERIFY:true,
				list:[],
        title:"我的投稿",
				id:"",
				argument:{},
				imgList:[],
				url:HELP_COMMENT_URL,
				help:{
					addComment:HELP_PUSH_URL,
					forBidden:FORBIDDEN_URL,
					ps:{
						id:""
					}
				},
				text:""
			}
		},
		created(){
			this.getParams();
			this.argument = this.params.argument;
			this.id = this.argument.ID;
			this.help.ps.id = this.argument.ID;
			this.title1 = this.argument.TITLE;
			this.text = this.argument.HELPINFO;
			this.title = this.$route.query.title;
      if(this.argument.VERIFY==0){
         this.active= 1
      }
      if(this.argument.VERIFY==1){
         this.active= 2
      } 
      if(this.argument.VERIFY==2){
        this.closeVERIFY=false
      }
		},
		methods:{
			getParams(){
				this.params = this.$route.query;
			}
		},
  }
</script >

<style scoped>
#submitpage{
  padding-left: 0.3rem;
  padding-right: 0.3rem;
}

/deep/.steps{
 text-align: left;
}

.title{
  margin-top: 2rem;
  text-align: left;
  font-size: 30px;
}
.titletime{
  margin-top: 0.7rem;
  font-size: 12px;
  text-align: left;
}
.content{
  margin-top: 0.7rem;
text-align: left;
}
.closeshow{
  background: #ffffff;
border-radius: 4px;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.15) 
}
.closestyle{
  height: 4rem;
 font-size: 14px;
 display:flex;
 padding-left: 1rem;
 padding-top: 2rem;
}
</style>