<template>
  <div>
    <div id="allmap" ref="allmap"></div>
  </div>
</template>
 
<script>
import Bus from '../components/bus.js'
export default {
  name: 'mapTest',
  data(){
  	return{
  		userlocation: { lng: "", lat: "" }
  	}
  },
  methods:{
    map(){
    	var _this = this;
      let map =new BMap.Map(this.$refs.allmap); // 创建Map实例
      map.centerAndZoom(new BMap.Point(_this.userlocation.lng, _this.userlocation.lat), 18);// 初始化地图,设置中心点坐标和地图级别
      map.addControl(new BMap.NavigationControl());
      map.setCurrentCity("合肥");// 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      map.enablePinchToZoom(true); 
      map.enableDragging();
      var marker = new BMap.Marker(new BMap.Point(_this.userlocation.lng, _this.userlocation.lat));        // 创建标注
			map.addOverlay(marker); 
    }
  },
  mounted(){
  	var _this = this;
  	Bus.$on("setMap",(lng,lat)=>{
  			_this.userlocation.lng = lng;
  			_this.userlocation.lat = lat;
  			_this.map()
  	})
    
 
  }
}
</script>

<style>

#allmap{
	width:85vw;
    height: 200px;
    overflow: hidden;
   	border:#42B983 solid 1px;
	margin:0 auto;
}
</style>
