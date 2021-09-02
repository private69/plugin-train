<template>
  <div style="margin-left: 100px">
    <div>
      <el-button @click="showCpm('radar')">radar</el-button>
      <el-button @click="showCpm('barChart')">barChart</el-button>
      <el-button @click="showCpm('lineChart')">lineChart</el-button>
      <el-button @click="showCpm('pieChart')">pieChart</el-button>
      <el-button @click="showCpm('risingSunChart')">risingSunChart</el-button>
    </div>
    <components :is="cpmname"></components>
  </div>
</template>
<script>
import radar from "./components/Radar.vue";
import barChart from "./components/barChart.vue";
import lineChart from "./components/lineChart.vue";
import pieChart from "./components/pieChart.vue";
import risingSunChart from "./components/risingSunChart.vue";
export default {
  name: "FuncFormsBase",
  components: {
    radar,
    barChart,
    lineChart,
    pieChart,
    risingSunChart,
  },
  provide() {
    return { options: this.options };
  },
  data() {
    return {
      options: {
        title: {
          // text: "基础雷达图",
        },
        legend: {
          data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"],
        },
        radar: {
          shape: "circle",
          indicator: [
            { name: "销售（Sales）", max: 6500 },
            { name: "管理（Administration）", max: 16000 },
            { name: "信息技术（Information Technology）", max: 30000 },
            { name: "客服（Customer Support）", max: 38000 },
            { name: "研发（Development）", max: 52000 },
            { name: "市场（Marketing）", max: 25000 },
          ],
        },
        series: [
          {
            name: "预算 vs 开销（Budget vs spending）",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "预算分配（Allocated Budget）",
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: "实际开销（Actual Spending）",
              },
            ],
          },
        ],
      },
      cpmname: "",
    };
  },
  mounted() {
    // if (!document) throw new Error("document is not exist !");
    // let domList = document.getElementsByTagName("button");
    // console.log(domList.length);
  },
  methods: {
    showCpm(name) {
      if (this.cpmname == name) {
        this.cpmname = "";
        return;
      }
      this.cpmname = name;
    },
  },
};
</script>
<style>
</style>