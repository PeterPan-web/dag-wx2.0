<template>
  <div class="myCollection">
  <myCentercom :title="title" :url="url" :type="type"></myCentercom>
  </div>
</template>

 <script>
import headernav from '../../components/header.vue'
import myCentercom  from "../../components/myCentercom.vue";
export default {
  components: {
    headernav,
    myCentercom
  },
  name: 'myCollection',
  data() {
    return {
      title: 'ζηζΆθ',
      url: COLLECTION_URL,
      type:'collects'
    }
  }
}
</script>
<style>

</style>