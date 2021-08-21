<template>
  <div class="map-list">
    <div class="map-div__flex" @click="handlechange('en')">
      <div class="map-list__icon">E</div>
      <div class="map-list__text">英语</div>
    </div>
    <div class="map-div__flex" @click="handlechange('zh_cn')">
      <div class="map-list__icon">C</div>
      <div class="map-list__text">中文</div>
    </div>
    <div class="map-div__flex" @click="handlechange('zh_en')">
      <div class="map-list__icon">M</div>
      <div class="map-list__text">混合</div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handlechange(lang) {
      this.$emit("changeLang" , lang)
    }
  }
};
</script>
<style scoped>
.map-list {
  position: fixed;
  display: flex;
  bottom: 20px;
  right: 20px;
}
.map-list .map-div__flex {
  width: 50px;
  text-align: center;
  background: #666;
  opacity: 0.55;
  border: 1px solid #ccc;
  cursor: pointer;
}
.map-list .map-div__flex:active {
  color: #ccc;
  background: #333;
}
.map-list .map-list__icon {
  font-size: 24px;
}
</style>