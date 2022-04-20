<template>
  <div class="dragger">
    <asider-dragger :width="draWid" :height="draHei">
      <div slot="left" class=""  style="background-Color: #cff;">
        <left-com :width="draWid"></left-com>
      </div>
      <div slot="switch" style="font-size: 20px;">
        <i class="el-icon-arrow-right" style="margin-top: 45vh;"></i>
      </div>
      <div slot="right" >
        <div style="background-Color: #cff;">
          <div style="width: 100%;height: 400px;"></div>
          <Levitation :title="'header'">
            <span slot="other">
            <el-button type="primary" style="padding: 5px;font-size: 8px;">4/5G详单</el-button>
            <el-button type="primary" style="padding: 5px;font-size: 8px;">导出</el-button>
            </span>
          </Levitation>
        </div>
      </div>
    </asider-dragger>
  </div>
</template>
<script>
import asiderDragger from "@/components/dragger/asiderDragger.vue";
import asiderDraggerCon from "@/components/dragger/asiderDraggerCon.vue";
import Levitation from "@/components/Levitation/index.vue";
import LeftCom from './component/leftCom.vue';
export default {
  name: "dragger",
  components: {
    asiderDragger,
    asiderDraggerCon,
    LeftCom,
    Levitation,
  },
  data() {
    return {
      draWid: "330px",
      draHei: "99.8vh",
      size: "mini",

    };
  },
  methods: {
  },
};
</script>
<style lang="less" scoped>
.dragger {
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
