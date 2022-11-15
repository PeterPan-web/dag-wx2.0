<template>
  <div style="margin-left:10vw;">
    <div style="display:flex">
      <div class="likeIcon">
        <div>
          <img src="../assets/tip_after.png"
               height="20"
               width="20"
               slot="icon">
        </div>
        <div style="margin-top:5px;margin-left:5px">
          {{p}}
        </div>

      </div>
      <div class="watchIcon">
        <div>
          <img src="../assets/scan.png"
               height="25"
               width="25"
               slot="icon">
        </div>

        <div style="margin-top:5px;margin-left:5px">
          {{r}}
        </div>
      </div>
    </div>

    <!-- <mt-button style="height:25px;background:#f2f2f2;color:#f8642f;margin-right:5vw;" disable>
	  		<img src="../assets/tip_after.png" height="20" width="20" slot="icon">
		 	 {{p}}
		</mt-button>


		<mt-button style="height:25px;background:#f2f2f2;color:#f8642f" disable>
	  		<img src="../assets/scan.png" height="20" width="20" slot="icon">
		 	 {{r}}
		</mt-button> -->
  </div>
</template>

<script>
import Bus from '../components/bus.js'
export default {
  name: 'icon',
  data() {
    return {
      p: 0,
      r: 0,
    }
  },
  mounted() {
    var _this = this
    Bus.$on('getTotal', (p) => {
      _this.p = p
    })
    Bus.$on('getRead', (r) => {
      _this.r = r
    })
  },
}
</script>

<style>
.likeIcon {
  height: 25px;
  background: #f2f2f2;
  color: #f8642f;
  margin-right: 15px;
  display: flex;
}
.watchIcon {
  height: 25px;
  background: #f2f2f2;
  color: #f8642f;
  display: flex;
}
</style>
