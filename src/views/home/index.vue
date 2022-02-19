<template>
  <div>
    <div style="width: 100%; height: 300px;"></div>
    <div>
      <component :is="cpmname"></component>
    </div>
  </div>
</template>
<script>
import timeCalculate from './component/timeCalculate.vue';
export default {
  components: { timeCalculate },
  data() {
    return {
      cpmname: 'timeCalculate'
    }
  },
  mounted() {
    if(window.sessionStorage.length) {
      console.log(window.sessionStorage);
    };    
    if(window.localStorage.length) {
      console.log(window.localStorage)
    }
  },
  methods: {}
}
</script>
<style scoped>

</style>