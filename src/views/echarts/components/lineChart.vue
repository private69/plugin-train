<template>
  <div :class="classname" :style="'width:' + width + ';height:' + height"></div>
</template>
<script>
let chart = null;
export default {
  props: {
    // 主题
    theme: {
      type: String,
      default: "light",
    },
    // 宽度 高度
    width: {
      type: String,
      default: "400px",
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
      classname: "linechart",
      xAxis: ["数据一", "数据二", "数据三", "数据四", "数据五"],
      lineData: [500, 300, 600, 350, 550],
    };
  },
  methods: {
    painting() {
      if(chart != null && chart != "" && chart != undefined)
        chart.dispose(); // 销毁画布
      const classname = document.getElementsByClassName(this.classname)[0];
      chart = this.$echarts.init(classname, this.chartData.theme);
      chart.setOption({
        title: {
          text: "折线图",
        },
        tooltip: {},
        xAxis: {
          data: this.chartData.xaxis || this.xAxis,
        },
        yAxis: {},
        series: [
          {
            name: "访问量",
            type: "line",
            smooth: true,
            data: this.chartData.linedata || this.lineData,
          },
        ],
      });
    },
    propsInit() {
      // 深拷贝
      this.chartData = Object.assign({}, this.propsdata);
      // if (this.propsdata) return;
      // 浅拷贝
      let data = this.chartData;
      // 主题：深色、明亮
      if (!("theme" in data)) data["theme"] = "light";
      // 横轴标签
      if (!("xaxis" in data)) data["xaxis"] = this.xAxis;
      // 具体数据
      if (!("linedata" in data)) data["linedata"] = this.lineData;
      console.log(this.chartData);
    },
  },
  watch:{
    propsdata:{
      handler(){
        this.propsInit();
        this.painting();
      },
      deep: true
    },
    width: () => {
      this.painting();
    },
    height(){
      // 延迟重绘。避免重绘前的数据还没发生更新
      setTimeout( () => {
        this.painting();
      },)
    }
  },
  mounted() {
    this.propsInit();
    this.painting();
  },
};
</script>