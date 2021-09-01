<template>
  <div :class="classname" :style="'width:' + width + ';height:' + height"></div>
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
      default: "250px",
    },
    // 2021-04-26 修改为单一的参数
    propsdata: {
      type: Object,
    },
  },
  data() {
    return {
      chartData: {},
      classname: "risingsunchart",
      type: "sunburst",
      sunchart: [
        {
          name: "A",
          value: 200,
          children: [
            { name: "Aa", value: 100 },
            { name: "Ab", value: 83 },
          ],
          itemStyle: {
            color: "#999",
          },
        },
        {
          name: "B",
          value: 120,
          children: [
            { name: "Ba", value: 60 },
            { name: "Bb", value: 20 },
          ],
        },
        {
          name: "C",
          value: 80,
        },
      ],
    };
  },
  methods: {
    painting() {
      if(chart != null && chart != "" && chart != undefined)
        chart.dispose(); // 销毁画布
      const risingsunchart = document.getElementsByClassName(this.classname)[0];
      chart = this.$echarts.init(risingsunchart, this.chartData.theme);
      chart.setOption({
        series: [
          {
            name: "旭日图",
            type: this.type,
            data: this.chartData.sunData || this.chartData.sundata || this.sunchart,
            itemStyle: {
              color: "#666",
            },
          },
        ],
      });
    },
    propsInit() {
      this.chartData = Object.assign({}, this.propsdata);
      // if (this.propsdata) return;
      let data = this.chartData;
      // 图形数据
      if (!("theme" in data)) data["theme"] = "light";
      if (!("sundata" in data)) data["sundata"] = this.sunchart;
      console.log(this.chartData);
    },
  },
  watch: {
    propsdata: {
      handler() {
        this.propsInit();
        this.painting();
      },
      deep: true,
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
<style>
</style>
