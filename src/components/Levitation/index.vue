<template>
  <div class="levitation-main" :style="'top:' + top_copy">
    <el-row :gutter="0">
      <slot name="title">
        <el-col :span="6" v-if="showTitle">
          {{ title }}
        </el-col>
      </slot>
      <div class="menu_bar" :style="'right:' + right">
        <slot name="other"></slot>
        <span v-if="showMax" @click="handleMax">
          <i class="el-icon-arrow-up"></i>
        </span>
        <span v-if="showMini" @click="handleMini">
          <i class="el-icon-arrow-down" ></i>
          <!-- <span>-</span> -->
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
  },
  data() {
    return {
      top_copy: null,
    };
  },
  mounted() {
      this.top_copy = this.top;
  },
  methods: {
    handleMini() {
      if (!this.top_copy) {
        this.top_copy = this.top;
      }
    //   this.top_copy = "70%";
        this.aa("top_copy",this.top_copy,"70%","%")
    },
    handleMax() {
      if (!this.top_copy) {
        this.top_copy = this.top;
      }
    //   this.top_copy = "20%";
    this.aa("top_copy",this.top_copy,"20%","%")
    },
    aa(key,from,to,tag="%") {
        if(from==to) return ;
        let tempF = parseInt(from);
        let tempT = parseInt(to);
        let temp = tempF;
        let i = setInterval( () => {
            if( (tempF > tempT && temp <= tempT) ||
                (tempF < tempT && temp >= tempT)
            ) {
                clearInterval(i)
            }else {
                if(tempF > tempT) temp -= 1;
                if(tempF < tempT) temp += 1;
                this[key] = temp + tag;
            }
        },4)
    }
  },
};
</script>
<style lang="less">
.levitation-main {
  width: 100%;
  height: 100%;
  padding: 5px 5px 5px 20px;
  position: absolute;
  //   border-top: 1px solid #4f8eec;
  .menu_bar {
    position: fixed;
    > span {
      padding: 5px;
      cursor: pointer;
    }
  }
}
</style>
