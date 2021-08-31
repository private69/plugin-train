<!-- 二维码生成 -->
<template>
  <div style="margin: 20px">
    <el-form style="width: 50%;">
      <el-form-item label="文本：" label-width="100px">
        <el-input v-model="codeValue" @change="changeCode"></el-input>
      </el-form-item>
    </el-form>
    <div class="code-area" style="display: flex">
      <!-- qrcodejs2 -->
      <div>
        <el-button @click="qrcodejs2 = !qrcodejs2">qrcodejs2:</el-button>
        <el-button v-if="qrcodejs2" @click="qrcodejs2Down">down</el-button>
        <el-button v-if="qrcodejs2" @click="qrcodejs2Parse">parse</el-button>
        <div v-show="qrcodejs2">
          <div class="qrcode" ref="qrCodeUrl"></div>
        </div>
      </div>
      <!-- qrcode.vue -->
      <div>
        <el-button @click="qrcodeVue = !qrcodeVue">qrcode.vue</el-button>
        <el-button v-if="qrcodeVue" @click="qrcodeVueDown">down</el-button>
        <el-button v-if="qrcodeVue" @click="qrcodeVueParse">parse</el-button>
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
import qrcodeJs from 'qrcode-decoder';
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
      console.log(this.codeValue);
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
    // 二维码解析
    qrcodejs2Parse() {
      let canvas = this.$refs.qrCodeUrl.getElementsByTagName("canvas")[0];
      let href = canvas.toDataURL("img/png");
      this.handleParse(href);
    },
    qrcodeVueParse() {
      let canvas = document.getElementsByClassName("qrcode")[0].getElementsByTagName("canvas")[0];
      let href = canvas.toDataURL("img/png");
      this.handleParse(href);
    },
    handleParse(url , cb = null) {
      const qr = new qrcodeJs();
      qr.decodeFromImage(url).then( res => {
        console.log(res);
        cb && cb.call(this , res);
      }).catch( err => {
        console.log(err);
      })
    },
    // 二维码下载
    qrcodejs2Down() {
      let qrcode = this.$refs.qrCodeUrl;
      this.handledown(qrcode.getElementsByTagName("canvas")[0]);
    },
    qrcodeVueDown() {
      let canvas = document
        .getElementsByClassName("qrcode")[0]
        .getElementsByTagName("canvas");
      this.handledown(canvas[0]);
    },
    handledown(canvas) {
      // //获取canvas标签
      //创建a标签
      let a = document.createElement("a");
      //获取二维码的url并赋值地址为a.href
      a.href = canvas.toDataURL("img/png");
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
  width: 400px;
  min-height: 200px;
  margin: 5px;
}
</style>