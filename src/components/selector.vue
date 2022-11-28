<template>
  <div>
  <van-field
  readonly
  clickable
  :label="this.pop.title"
  :value="picker"
  :placeholder="this.pop.titleholder"
  @click="show = true"
  :rules="[
                    {
                        required: true,
                        trigger:'onBlur',
                        message: '不能为空'
                    }
                ]"
/>
<van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>

  export default {
    components: {

    },
    data (){
      return {
      show: false,
      picker:'',
      pop:{
          title:"*",
          titleholder:""
        },
      actions: [],
      };
    },
    created(){
      if (this.chosetype==1) {
        this.getPurpose(),
        this.pop.title='*利用目的',
        this.pop.titleholder='点击选择利用目的'

      }
      if (this.chosetype==2) {
        this.getPickup(),
        this.pop.title='*选择取件地点',
        this.pop.titleholder='点击选择取件地点'
      }
    },
    props: {
chosetype:{
  type:Number
}
    },
    methods: {
      			//获取利用目的以及选择
			getPurpose(){
				var _this = this;
				$.ajax({
					url:HOST_HOME+'/book!getDicDatas.action?dicName=利用目的',
					type:'get',
					success:function(res){
						if(res.success == true) {
              _this.copyTransFun(res.result)
							  _this.actions = res.result;
						}
					},
					error:function() {
						Dialog.alert({message: '请求失败',}).then(() => {});
					}
				})
			},
      			//获取选择取件地址的值
			getPickup(){
				var _this = this;
				$.ajax({
					url:HOST_HOME+'/book!getDicDatas.action?dicName=取件地点',
					type:'get',
					success:function(res){
						if(res.success == true) {
							_this.copyTransFun(res.result)
							  _this.actions = res.result;
						}
					},
					error:function() {
						Dialog.alert({message: '请求失败',}).then(() => {});
					}
				})
			},
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      this.picker=item.name,
      this.$emit("pickeritem",item)
    },
    copyTransFun (arr) {
                arr.forEach ((item) => {
                    if (item.NAME) {
                        item.name = item.NAME;
                        delete item.NAME;
                    }
                });
            },
      
    },
  }
</script >

<style scoped>
</style>