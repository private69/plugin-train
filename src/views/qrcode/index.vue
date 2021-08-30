<template>
  <div>
    <el-form style="width: 50%; margin-top: 20px">
      <el-form-item label="文本：" label-width="100px">
        <el-input v-model="codeValue" @change="changeCode"></el-input>
      </el-form-item>
    </el-form>
    <div class="code-area" style="display: flex">
      <div style="width: 200px">
        <el-button @click="qrcodejs2 = !qrcodejs2">qrcodejs2:</el-button>
        <div v-show="qrcodejs2">
          <div class="qrcode" ref="qrCodeUrl"></div>
        </div>
      </div>
      <div>
        <el-button @click="qrcodeVue = !qrcodeVue">qrcode.vue</el-button>
        <el-button v-if="qrcodeVue" @click="handledown">down</el-button>
        <div v-if="qrcodeVue">
          <qrcode-vue :value="qrcodeValue" size="160"></qrcode-vue>
        </div>
      </div>
    </div>
    <pre>* 当数据为非文字时，可以显示为文本的形式 </pre>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
import qrcodeVue from "qrcode.vue";
export default {
  components: { qrcodeVue },
  data() {
    return {
      qrcodeValue: "aaa", // 二维码数据
      qrcodejs2: false, // qrcodejs2 显示
      qrcodeVue: false, // qrcode.vue 显示
      codeValue: "", // 输入框数据
    };
  },
  methods: {
    // change 事件
    changeCode() {
      this.qrcodeValue = this.codeValue;
      this.creatQrCode(this.codeValue);
    },
    // 创建二维码
    creatQrCode(text = "cnjdkcmadsiklndov/n") {
      this.$refs.qrCodeUrl.innerHTML = "";
      this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
        // text: 'xxxxcasdkcaksdalsdkcmasdcmdc sijpewcmadpcm', // 需要转换为二维码的内容
        // text: `{"序号":"","线路":"ffffg","里程":"12","站段":"怀化车务段","车间":"柳州西","岗位":"党总支副书记","显示名称":"1212","失检天数":"12","状态":"1"}`, // 需要转换为二维码的内容
        text: text,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
    handledown() {
      //获取canvas标签
      let canvas = document
        .getElementsByClassName("qrcode")[0]
        .getElementsByTagName("canvas");
      //创建a标签
      let a = document.createElement("a");
      //获取二维码的url并赋值地址为a.href
      a.href = canvas[0].toDataURL("img/png");
      //设置下载文件的名字
      a.download = "二维码图片";
      //点击事件，相当于下载
      a.click();
    },
  },
  mounted() {
    this.creatQrCode();
  },
};
</script>
<style>
.code-area {
  display: flex;
}
.code-area > div {
  width: 200px;
  min-height: 200px;
  margin: 5px;
}
</style>