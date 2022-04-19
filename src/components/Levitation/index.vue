<template>
  <div class="levitation-main" :style="'top:' + top_copy+';height: 100%;'">
    <el-row :gutter="0">
      <slot name="title">
        <el-col :span="6" v-if="showTitle">
          <span class="title">
            {{ title }}
          </span>
        </el-col>
      </slot>
      <div class="menu_bar" :style="'right:' + right">
        <slot name="other"></slot>
        <span v-if="showMax" @click="handleMax">
          <slot name="max">
            <i class="el-icon-arrow-up"></i>
          </slot>
        </span>
        <span v-if="showMini" @click="handleMini">
          <slot name="mini">
            <i class="el-icon-arrow-down"></i>
          </slot>
        </span>
      </div>
    </el-row>
    <slot name="main"></slot>
  </div>
</template>
<script>
export default {
  name: "Levitation",
  props: {
    title: {
      type: String,
      default: "",
    },
    "show-title": {
      type: Boolean,
      default: true,
    },
    "show-mini": {
      type: Boolean,
      default: true,
    },
    "show-max": {
      type: Boolean,
      default: true,
    },
    right: {
      type: String,
      default: "7%",
    },
    top: {
      type: String,
      default: "70%",
    },
    "slide-range": {
      type: Array,
      default: () => ["20%", "70%", "95%"],
    },
  },
  data() {
    return {
      top_copy: null,
    };
  },
  mounted() {
    this.top_copy = this.slideRange[this.slideRange.length-1];
  },
  methods: {
    // 排序
    sort(arr) {
      let [a0, a1] = arr;
      console.log(arr);
      return;
    },
    // top 变小
    handleMini() {
      if (!this.top_copy) {
        this.top_copy = this.top;
      }
      let nowTop = this.top_copy;
      let index = this.slideRange.indexOf(nowTop);
      console.log(nowTop, "\t", index);
      if (index == "-1") {
        throw new Error("top_copy is not in 'slideRange'");
      }
      if (index == this.slideRange.length - 1) {
        return;
      }
      this.changeTopSize(
        "top_copy",
        this.top_copy,
        this.slideRange[index + 1],
        "%"
      );
    },
    // top 增大
    handleMax() {
      if (!this.top_copy) {
        this.top_copy = this.top;
      }
      let nowTop = this.top_copy;
      let index = this.slideRange.indexOf(nowTop);
      console.log(nowTop, "\t", index);
      if (index == "-1") {
        throw new Error("top_copy is not in 'slideRange'");
      }
      if (index == 0) {
        return;
      }
      this.changeTopSize(
        "top_copy",
        this.top_copy,
        this.slideRange[index - 1],
        "%"
      );
    },
    changeTopSize(key, from, to, tag = "%") {
      if (from == to) return;
      let tempF = parseInt(from);
      let tempT = parseInt(to);
      let time = Math.round(
        tempF > tempT ? 200 / (tempF - tempT) : 200 / (tempT - tempF)
      );
      let temp = tempF;
      let i = setInterval(() => {
        if (
          (tempF > tempT && temp <= tempT) ||
          (tempF < tempT && temp >= tempT)
        ) {
          clearInterval(i);
        } else {
          if (tempF > tempT) temp -= 1;
          if (tempF < tempT) temp += 1;
          this[key] = temp + tag;
        }
      }, time);
    },
  },
};
</script>
<style lang="scss">
.levitation-main {
  width: 100%;
  padding: 5px 5px 5px 20px;
  position: absolute;
  // z-index: 3000;
  background-color: #fff;
  .menu_bar {
    position: fixed;
    > span {
      padding: 5px;
      cursor: pointer;
    }
  }
  .title {
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
