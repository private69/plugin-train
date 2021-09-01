<template>
  <div :class="classname" :ref="classname" :style="'width:' + width + ';height:' + height"></div>
</template>
<script>
let chart = null;
export default {
  props: {
    // 2021-04-26 修改为单一的参数
    propsdata: {
      type: Object,
    },
    width: {
      type: String,
      default: "400px",
    },
    height: {
      type: String,
      default: "200px",
    },
  },
  data() {
    return {
      chartData: {},
      classname: "barchart",
      xAxis: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      barData: [5, 20, 36, 10, 10, 20],
    };
  },
  methods: {
    painting() {
      if(chart != null && chart != "" && chart != undefined)
        chart.dispose(); // 销毁画布
      const barchart = document.getElementsByClassName(this.classname)[0];
      chart = this.$echarts.init(barchart, this.chartData.theme);
      chart.setOption({
        title: {
          text: this.chartData.name || "柱状图",
        },
        tooltip: {},
        xAxis: {
          data: this.chartData.xData || this.xAxis,
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: this.chartData.data || this.barData,
          },
        ],
      });
    },
    propsInit() {
      // 深拷贝
      this.chartData = Object.assign({}, this.propsdata);
      // if(this.propsdata) return ;
      // 浅拷贝
      let data = this.chartData;
      // 主题：深色、明亮
      if (!("theme" in data)) data["theme"] = "light";
      // 横轴标签
      if (!("xData" in data)) data["xData"] = this.xAxis;
      // 具体数据
      if (!("data" in data)) data["data"] = this.barData;
      // 图表名称
      if (!("name" in data)) data["name"] = "";
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
