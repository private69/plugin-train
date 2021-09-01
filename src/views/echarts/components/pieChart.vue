<template>
  <div
    :class="classname"
    :style="'width:' + width + ';height:' + height + ';'"
  ></div>
</template>
<script>
let chart = null;
export default {
  props: {
    width: {
      type: String,
      default: "300px",
    },
    height: {
      type: String,
      default: "200px",
    },
    // 2021-04-26 修改为单一的参数
    propsdata: {
      type: Object,
    },
  },
  data() {
    return {
      chartData: {},
      classname: "pieChart",
      type: "pie",
      pieData: [
        { value: 200, name: "数据一" },
        { value: 250, name: "数据二" },
        { value: 180, name: "数据三" },
        { value: 280, name: "数据四" },
        { value: 400, name: "数据五" },
      ],
    };
  },
  methods: {
    painting() {
      if(chart != null && chart != "" && chart != undefined)
        chart.dispose(); // 销毁画布
      const pieChart = document.getElementsByClassName(this.classname)[0];
      chart = this.$echarts.init(pieChart, this.chartData.theme);
      chart.setOption({
        series: [
          {
            name: "饼图",
            type: this.type,
            radius: "50%",
            data: this.chartData.piedata || this.pieData,
            roseType: this.chartData.roseType == null ? "angle" : "",
            itemStyle: {
              normal: {
                shadowBlur: this.height,
                shadowColor: "rgba(0,0,0,0.6)",
              },
            },
          },
        ],
      });
      console.log("bbbbbbb");
    },
    propsInit() {
      this.chartData = Object.assign({}, this.propsdata);
      // if (this.propsdata) return;
      let data = this.chartData;
      if (!("theme" in data)) data["theme"] = "light";
      // 图形数据
      if (!("piedata" in data)) data["piedata"] = this.pieData;
      // 南丁格尔图 angle
      data["roseType"] = null;
      console.log(this.chartData);
    },
  },
  watch:{
    propsdata:{
      handler(){
        this.propsInit();
        setTimeout( () => {
          this.painting();
        },100)
      },
      deep: true
    },
    width: () => {
      setTimeout( () => {
        this.painting();
      }, 100)
    },
    height(){
      // 延迟重绘。避免重绘前的数据还没发生更新
      setTimeout( () => {
        this.painting();
      },100)
    }
  },
  mounted() {
    console.log(this.propsdata);
    this.propsInit();
    this.painting();
  },
};
</script>
<style>
</style>
