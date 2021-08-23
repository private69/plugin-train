<template>
  <div class="all-page">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      active-text-color="#c0c0c0"
      @select="handleOpen"
    >
      <span v-for="(item, index) in mock" :key="item.path + '' + index">
        <!-- 含有多个 children -->
        <el-submenu :index="item.path" v-if="item.children.length > 1">
          <template slot="title">
            <i v-if="item.meta.icon" :class="icon.meta.icon"></i>
            {{ item.meta.name }}
          </template>
          <el-menu-item
            v-for="(v, i) in item.children"
            :key="v.path + '' + i"
            :index="v.path"
          >
            <i v-if="v.meta.icon" :class="v.meta.icon"></i>
            {{ v.meta.name }}
          </el-menu-item>
        </el-submenu>
        <!-- children 只有一个，点击父级跳转 -->
        <el-menu-item v-else-if="item.children.length == 1" :index="item.path">
          <i
            v-if="item.children[0].meta.icon"
            :class="item.children[0].meta.icon"
          ></i>
          {{ item.children[0].meta.name }}
        </el-menu-item>
        <!-- 不存在 children，即跳转新的页面 ，点击父级跳转 -->
        <el-menu-item v-else>
          <i
            v-if="item.meta.icon"
            :class="icon.meta.icon"
          ></i>
          {{ item.meta.name }}
        </el-menu-item>
      </span>
      <!-- <el-menu-item v-if="item.children > 1" :index="item.path">{{ item.meta.name }}</el-menu-item>
      <el-menu-item v-else :index="item.children[0].path">{{ item.children[0].meta.name }}</el-menu-item> -->
      <!-- <el-menu-item index="/">首頁</el-menu-item>
      <el-menu-item index="/amap">Amap</el-menu-item>
      <el-menu-item index="/setting">处理中心</el-menu-item>
      <el-menu-item index="1">处理中心</el-menu-item> -->
    </el-menu>
    <div>
      <router-view />
    </div>
  </div>
</template>
<script>
import mock from "../router/mock";
export default {
  data() {
    return {
      mock: mock,
    };
  },
  methods: {
    // 切换路由
    handleOpen(path) {
      console.log(path);
      // 避免重复点击同一路由
      if (path !== this.$route.path) {
        this.$router.push({ path: path });
      }
    },
  },
};
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
.el-menu-vertical-demo i {
  padding-right: 10px;
}

</style>