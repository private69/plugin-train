<template>
  <div class="amap">
    <el-amap 
      vid="amap" 
      :plugin="plugin" 
      class="amap-demo" 
      :center="center"
      :lang="lang"
      :events="events"
    >
      <el-amap-marker
      v-for="(item , index ) in mapMarkers"
      :key="index"
      :position="item.position"
      :content="item.content"
      cursor="crosshair"
    >
      <i class="iconfont icon-security-protection"></i>
    </el-amap-marker>
    </el-amap>
    <map-list @changeLang="changeLang"/> 
    
  </div>
</template>
<script src="./index.js"></script>
<style scoped>
.amap {
  width: calc(100vw - 200px);
  height: 100%;
}
.amap .amap-demo {
  position: absolute;
  width: 100%;
  height: 100%;
}

</style>