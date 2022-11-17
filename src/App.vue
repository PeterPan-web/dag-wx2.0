<template>
  <div id="app">
  <!--<transition :name="transitionName">-->
    <navigation>
			<router-view/>
		</navigation>
		<!--</transition>-->
  </div>
</template>

<script>
import Bus from './components/bus.js'
export default {
  name: 'App',
  components:{
  },
  data(){
  	return{
  		up:false
  	}
  },
  mounted(){
  	// var _this = this;
  	// $.ajax({
  	// 	type:"post",
  	// 	data:{},
  	// 	url:GETID_URL,
  	// 	dataType:"json",
  	// 	success:function(res){
  	// 		localStorage.setItem("openId",res.result[0].openid);
  	// 	}
  	// });

    // function testPost(urlData,methodData,number){
    //   axios({
    //     url:urlData,
    //     method:methodDta,
    //     data:number,
    //     success:function(res){
    //     	localStorage.setItem("openId",res.result[0].openid);
    //     }
    //   })

    // }



  	Bus.$on("setUp",(status)=>{
  			_this.up = status;
  	});
  	mui.init({
	    keyEventBind: {
	        backbutton: true  //关闭back按键监听
	    }
		});


	/*	mui.plusReady(function(){
				// 设置系统状态栏背景为红色
				var type = plus.os.name;
				if(type == "iOS") {
					plus.navigator.setStatusBarBackground("#0b8def");
					plus.navigator.setFullscreen(true);
				} else {
					plus.navigator.setStatusBarBackground("#0b8def");
					plus.navigator.setFullscreen(true);
				}
			});*/
		mui.back = function() {
			if(!_this.up){
				_this.$router.back(-1);
			}
		};
  },
/*   watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
    		if(to.meta.index >from.meta.index){
    			this.transitionName = "slide-left";
    		}else{
    			this.transitionName = "slide-right";
    		}
    }
  }*/
}
</script>

<style>
	body{
		background: #f2f2f2;
	}
	*{
		margin:0;
		padding:0;
	}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
	-webkit-tap-highlight-color:rgba(0,0,0,0);
}
input{
	-webkit-appearance:none;/*清除ios默认圆角*/
	border-radius:0;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
