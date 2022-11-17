<template>
  <div>
        <headernav :title="title" :show="show" style="padding-bottom:50px"></headernav>
			  <div v-for="(item,index) in listred" :id="item.OPTIONNAME" :key="index">
         <searchcomponent :name="item.OPTIONNAME" :ps="params" style="height:calc(100vh - 306px);overflow: auto;"></searchcomponent> 
        </div>
  </div>
</template>
<script>
  import headernav from '../../components/header.vue'
	import searchcomponent from '../../components/consultNew.vue'
export default {
  data(){
    return{
      title:"红色记忆",
        listred:[],
        url:SHOW_URL,
				curPage:"红色记忆",
        params:{
					url:TYPESHOW_URL,
					mark:1
				}
    }
  },
  created(){
     this.getFile()
  },
  methods:{
			getFile(){
				var _this = this;
				$.ajax({
					type:"post",
					url:_this.url,
					data:{
						encode:"YDZTXXLB",
						type:"1"
					},
					dataType:"json",
					success:function(res){
            _this.listred =res.result[0].encodes.splice(3,1)
            console.log( _this.listred);
					}
				});
			},
  },
  components:{
    searchcomponent,
    headernav
  }
}
</script>