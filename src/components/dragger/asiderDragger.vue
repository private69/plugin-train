<template>
  <div class="asiderDragger">
    <div class="asider-dragger-left">
      <transition name="left">
        <div
          :style="
            'opacity:1;width:' +
              inner_left_width +
              ';height:' +
              inner_left_height
          "
          class="leftdiv"
        >
          <slot name="left"></slot>
          <slot name="top"></slot>
        </div>
      </transition>
    </div>
    <transition name="switch">
      <div class="asider-dragger-switch" :style="'left:' + inner_left_width">
        <slot name="switch">
          <i class="el-icon-arrow-right"></i>
        </slot>
      </div>
    </transition>
    <div class="asider-dragger-right">
      <transition name="right-bolck">
        <div
          :style="
            'opacity:1;width:' +
              inner_right_width +
              ';height:' +
              inner_right_height
          "
          class="rightdiv"
        >
          <slot name="right"> </slot>
          <slot name="bottom"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: "asiderDragger",
  props: {
    width: {
      type: String,
      default: "30vw",
    },
    height: {
      type: String,
      default: "90vh",
    },
    tag: {
      default: "width",
      type: String,
    },
    max: {
      type: Number,
      default: 100,
    },
  },
  data() {
    return {
      inner_left_width: "",
      inner_left_height: "",
      inner_right_width: "",
      inner_right_height: "",
    };
  },
  watch: {
    // 监听宽度变化更改
    inner_left_width(val) {
      this.setRightSize(val);
    },
    // inner_left_height(val) {
    //   this.inner_left_height = this.calcRightRange(val);
    // },
  },
  mounted() {
    this.inner_left_width = this.width;
    this.inner_left_height = this.height;
    this.screenChange();
    // 绑定点击事件
    setTimeout(() => {
      this.initSize("leftdiv");
      this.initSize("rightdiv");


      let chi = this.getChiNode("asider-dragger-switch");
      chi.style.cursor = "pointer";
      chi.title = "点击伸缩";
      chi.style.position = "relative";
      this.setSize(chi, "100%", this.height);
      chi.onclick = this.changeSize;
    }, 0);
  },
  methods: {
    initSize(name) {
      let chi = this.getChiNode(name);
      this.setSize(chi, "100%", "100%");
      this.setSize(chi.children[0], "100%", "100%");
    },
    setRightSize(val,hei=null) {
      this.inner_right_width = hei?val:this.calcRightRange(val);
      this.inner_right_height = hei?hei:this.inner_left_height;
    },
    // 监听屏幕尺寸变化计算需要转化的尺寸
    screenChange() {
      const that = this;
      window.onresize = () => {
        return (() => {
          let wid = document.body.clientWidth;
          let hei = document.body.clientHeight;
          let that_inner_wid = that.inner_left_width;
          if(that_inner_wid != "0px") {
            let inner_wid = parseFloat(that.inner_left_width);
            if(that_inner_wid.indexOf("px") > -1){
              wid = wid - inner_wid
            }else if(
              that_inner_wid.indexOf("vw") > -1 || 
              that_inner_wid.indexOf("%")
            ){
              wid = wid - (inner_wid * 0.01 * wid)
            }
          }
          that.setRightSize(wid + "px",hei+'px');
        })();
      };
    },
    // 计算剩余尺寸
    calcRightRange(val) {
      let m = this.max;
      if (val.indexOf("vw") > -1)
        return m - parseFloat(val) + "vw";
      if (val.indexOf("vh") > -1)
        return m - parseFloat(val) + "vh";
      if (val.indexOf("%") > -1)
        return m - parseFloat(val) + "%";
      if (val.indexOf("px") > -1) {
        let width = window.innerWidth;
        let height = window.innerHeight;
        return (
          parseFloat(this.tag == "width" ? width : height) -
          parseFloat(val) +
          "px"
        );
      }
    },
    // 伸展
    changeSize() {
      let key = "inner_left_width";
      if (this.tag !== "width") {
        key = "inner_left_height";
      }

      if (this[key] == "0px") {
        this[key] = this.width;
        setTimeout(() => {
          this.changeOpacity(true);
        }, 650);
        // this.inner_left_height = this.height;
      } else {
        this.changeOpacity(false);
        setTimeout(() => {
          this[key] = "0px";
        }, 100);
      }
    },
    // 修改透明度
    changeOpacity(tag) {
      let chi = this.getChiNode("asider-dragger-left");
      // chi.style.visibility = tag?"visible":"hidden";
      // chi.style.opacity=tag?1:0;
      if (tag) {
        chi.style.opacity = 1;
      } else {
        let zero = 1;
        let i = setInterval(() => {
          if (zero <= 0) {
            clearInterval(i);
          } else {
            chi.style.opacity = zero;
            zero -= 0.2;
          }
        }, 24);
      }
      // chi.style.display = tag?"inline-block":"none";
    },
    // 获取子dom
    getChiNode(className) {
      return document.getElementsByClassName(className)[0].children[0];
    },
    setSize(dom = null, wid, hei) {
      if (!dom) return;
      dom.style.width = wid;
      dom.style.height = hei;
    },
  },
};
</script>
<style lang="less">
.asiderDragger {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  .leftdiv {
    // background-color: #cfc;
    transition: width 1s;
  }
  .asider-dragger-switch {
    transition: 1s;
    position: absolute;
    z-index: 1000;
  }
  .asider-dragger-switch:hover {
    border-right: 1px solid #f0f0f0;
    border-left: 1px solid #f0f0f0;
    }
  .asider-dragger-switch:active {
    box-shadow: 2px 2px 3px #333 inset;
  }
  .rightdiv {
    display: inline-block;
    transition: 1s;
  }
}
</style>
