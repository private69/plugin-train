<template>
  <div class="website" @click="jumpWebsite">
      <el-tooltip effect="dark" content="跳转官网" placement="top-start">
        <i class="iconfont icon-logistic"></i>
      </el-tooltip>
    </div>
</template>
<script>
export default {
  methods: {
    jumpWebsite() {
      this.$emit('jumpWebsite');
    }
  }
}
</script>
<style scoped>
.website {
  position: fixed;
  right: 100px;
  bottom: 100px;
  cursor: pointer;
}
.website i{
  font-size: 26px;
}
</style>