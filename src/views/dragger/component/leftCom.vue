<template>
  <div class="leftCom" :style="'max-width: 20rem;width:' + width">
    <el-form inline class="leftForm">
      <el-form-item>
        <el-input
          ref="elInputs"
          id="elInputs"
          placeholder="请输入用户号码："
          v-model="msisdn"
          :size="size"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :size="size">
          &nbsp;&nbsp;&nbsp;
          查&nbsp;&nbsp;询
          &nbsp;&nbsp;&nbsp;
        </el-button>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker
          style="max-width: 15rem;"
          v-model="dateRange"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :format="dateFormat"
          :size="size"
          ref="elDatePicker"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked">4G</el-checkbox>
        <el-checkbox v-model="checked">5G</el-checkbox>
        <el-checkbox v-model="checked">站点</el-checkbox>
        <el-checkbox v-model="checked">站点名</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="经度："
          v-model="longitude"
          :size="size"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :size="size">经纬度定位</el-button>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="纬度："
          v-model="latitude"
          :size="size"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <!-- <el-button type="primary" :size="size">查询</el-button> -->
      </el-form-item>
      <el-form-item>
        <el-input placeholder="eci/nci" v-model="eci" :size="size"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :size="size"
          >&nbsp;&nbsp;小区定位&nbsp;&nbsp;</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "leftCom",
  props: {
    width: {
      type: String,
      default: "300px",
    },
    max: {
      type: String,
      default: "300px",
    },
    size: {
      type: String,
      default: "mini",
    }
  },
  data() {
    return {
      dateRange: [],
      dateFormat: "yyyy-MM-dd HH:mm:ss",
      msisdn: "",
      longitude: "",
      latitude: "",
      eci: "",
      checked: "",
    };
  },
  mounted() {
    // this.screenChange();
  },
  methods: {
    screenChange() {
      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth;
          console.log(window.screenWidth);
          //   that.screenWidth = window.screenWidth;
          let elInput = that.$refs["elInputs"];
          let e = document.getElementById("elInputs");
          console.log(elInput._vnode.elm);
          console.log(e.style);
        })();
      };
    },
  },
};
</script>
<style lang="less">
.leftCom {
  // width: 100vw;
  height: 100%;
  overflow: hidden;
  padding: 20px 5px 20px 10px;
  .leftForm {
    .el-form-item {
      margin-bottom: 5px;
    }
  }
}
</style>
