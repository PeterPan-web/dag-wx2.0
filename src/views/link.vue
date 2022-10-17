	<template>
	<div>
		<headnav :path="path" :title="title"></headnav>
		<div class="content">
			<ul>
				<li>
					<span class="label">单位名称</span>
					<span class="mainContent">{{name}}</span>
				</li>
				<li>
					<span class="label">所属分类</span>
					<span class="mainContent">{{classficy}}</span>
				</li>
				<li>
					<span class="label">联系电话</span>
					<span class="mainContent" @click="tel(phone)">{{phone}}</span>
				</li>
				<li>
					<span class="label">邮箱</span>
					<span class="mainContent">{{email}}</span>
				</li>
				<li>
					<span class="label">联系地址</span>
					<img :src="addressImg" @click ="resetMap" alt="" style="width:20px;height:20px;vertical-align: top;"/>
					<span class="mainContent" style="vertical-align: top;width:50vw;">{{address}}</span>
				</li>
				<li>
					<span class="label">交通指引</span>
					<span class="mainContent">{{guide}}</span>
				</li>
			</ul>
			<div style="text-align: center;">
				<img width="80%" height="400px" src="static/img/address.jpg" />
				
			</div>
			<!-- <mapcomponent :ps="params"></mapcomponent> -->
		</div>
	</div>
</template>

<script>
	import Bus from '../components/bus.js'
	import headnav from '../components/header.vue'
	import mapcomponent from '../components/maptest.vue'
	export default{
		name:"linkUs",
		data(){
			return {
				message:"<p>this is link.vue</p>",
				path:"/interaction",
				title:"联系我们",
				username:"",
				name:"",
				email:"",
				classficy:"",
				phone:"",
				address:"",
				addressImg:"static/img/address.png",
				guide:"",
				params:{}
			}
		},
		components:{headnav,mapcomponent},
		created(){
			this.getMessage();
			WeixinJSBridge.call('hideToolbar');
			WeixinJSBridge.call('hideOptionMenu');
		},
		methods:{
			getMessage(){
				var _this = this;
				$.ajax({
					type:"post",
					url:LINK_URL,
					dataType:"json",
					success: function (res) {
			        	_this.name = res.result[0].contact[0].COMPANYNAME;
			        	_this.classficy = res.result[0].contact[0].CLASSIFICATION;
			        	_this.email = res.result[0].contact[0].EMAIL;
			        	_this.phone = res.result[0].contact[0].PHONE;
			        	_this.address = res.result[0].contact[0].ADDRESS;
			        	_this.guide = res.result[0].contact[0].GUIDE;
			        	_this.params.lat = res.result[0].contact[0].LATITUDE;
			        	_this.params.lng = res.result[0].contact[0].LONGITUDE;
			        	Bus.$emit("setMap",_this.params.lng,_this.params.lat);
			        },
			        error:function(status){
			        }
				});
			},
			tel(ph){
				this.$messagebox({
					title:"提示",
					message:"确认拨打电话吗",
					showCancelButton:true
				}).then(function(e){
					if(e =="confirm"){
						window.location.href = 'tel://' + ph;
					}
				});
			},
			resetMap(){
				var _this = this;
				Bus.$emit("setMap",_this.params.lng,_this.params.lat);
			}
		}
	}
</script>

<style>
	.mint-header.is-fixed{
		z-index:2;
	}
	.content{
		margin-top:50px;
		text-align: left;
	}
	.content li{
		margin: 15px 0px;
	}
	.label{
		display: inline-block;
		width:25vw;
		margin-left:5vw;
		font-size:12px;
		font-weight: 600;
		vertical-align: top;
	}
	.mainContent{
		display: inline-block;
		width:60vw;
		margin-right:5vw;
		font-size:12px;
		text-align: left;
	}
</style>