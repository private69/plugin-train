<template>
  <div style="margin-left: 100px;">
    <div id="myChart" :style="{ width: '1000px', height: '500px' }"></div>
  </div>
</template>
<script>
export default {
  name: "FuncFormsBase",
  data() {
    return {
      myChart: {}
    };
  },
  inject: ['options'],
  watch: {
    options: {
      handler() {
        setTimeout( () => {
          this.drawLine();
        },100)
      },
      deep: false,
    }
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      this.myChart = this.$echarts.init(document.getElementById("myChart"));
      this.myChart.clear();
      setTimeout( () => {
        this.myChart.setOption(this.options);
      },100)
    },
  },
};
</script>
<style>
</style>