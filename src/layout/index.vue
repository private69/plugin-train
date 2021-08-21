<template>
  <div class="all-page">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      @select="handleOpen"
    >
      <el-menu-item index="/">首頁</el-menu-item>
      <el-menu-item index="/amap">Amap</el-menu-item>
      <el-menu-item index="/setting">处理中心</el-menu-item>
      <el-menu-item index="1">处理中心</el-menu-item>
    </el-menu>
    <div>
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    // 切换路由
    handleOpen(path) {
      console.log(path);
      if(path !== this.$route.path) {
        this.$router.push({ path: path})
      }
    }
  }
}
</script>
<style scoped>
.all-page {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.el-menu-vertical-demo {
  display: "inline-block";
  width: 200px;
  height: 100vh;
}
</style>