<template>
<div>
  <headernav :title="title"></headernav>
 <listcomponent :mark="mark" :url="url" style="margin-top:50px"></listcomponent>   
</div>

</template>

<script>
import headernav from '../../components/header.vue'
import listcomponent from '../../components/list.vue'
export default {
data(){
  return{
          mark:"consult",
          url:NEWCONSULT_URL,
          title:"信息公开"
  }
},
  components:{
  	listcomponent,
    headernav
  }
}
</script>

