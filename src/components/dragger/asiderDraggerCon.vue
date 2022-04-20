<!-- 
增加控制条
-->
<template>
  <div class="asider-dragger-controller">
    <div :style="'width:' + width + ';height:' + height" class="show-block">
      <div class="controller-tips">
        <div class="controller-pattern">
          <!-- <i class="el-icon-arrow-left"></i>
          <i class="el-icon-arrow-right"></i> -->
          <i class="el-icon-arrow-up"></i>
          <!-- <i class="el-icon-arrow-down"></i> -->
        </div>
      </div>
      <slot name="main">
        <div class="slot-show-block"></div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "asiderDraggerCon",
  props: {
    width: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      ifMouseDown: false,
    };
  },
  mounted() {
    let con = document.getElementsByClassName("controller-pattern")[0];
    con.onmousedown = function(e) {
      let t = e.target;
      t.style.cursor = "n-resize";
      this.ifMouseDown = true;
    };
    con.onmousemove = function(e) {
      if (!this.ifMouseDown) return;
      let t = e.target;
      let x = e.screenX;
      let y = e.screenY;
      t.style.marginTop = 
      console.log(e);
    };
    con.onmouseup = function(e) {
      let t = e.target;
      t.style.cursor = "pointer";
      this.ifMouseDown = false;
      console.log(this.ifMouseDown);
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.asider-dragger-controller {
  .show-block {
    .controller-tips {
      width: 100%;
      height: 5px;
      text-align: center;
      .controller-pattern {
        background-color: rgb(144, 159, 228);
        font-size: 5px;
        cursor: pointer;
        // display: inline-block;
        // -webkit-clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
        // clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
        // width: 40px;
        // height: 10px;
        // box-shadow:  2px 12px 5px #000;
        // border: 2px solid #000 ;
        // line-height: 10px;
      }
    }
    .slot-show-block {
      background-color: #cfc;
    }
  }
}
</style>
