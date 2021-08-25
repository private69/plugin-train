<template>
  <div>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      multiple
      :limit="3"
      :auto-upload="false"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      textInfo: ""
    };
  },
  mounted() {
    // this.title = this.readFile('E:/个人文档/副班/全体学生/信息采集工作文件/附件1：XX学院专业班级人数统计表模板.xls')
    // console.log(this.title)
  },
  methods: {
    readFile(filePath) {
      // 创建一个新的xhr对象
      let xhr = null;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {
        // eslint-disable-next-line
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      const okStatus = document.location.protocol === "file" ? 0 : 200;
      xhr.open("GET", filePath, false);
      xhr.overrideMimeType("text/html;charset=utf-8");
      xhr.send(null);
      return xhr.status === okStatus ? xhr.responseText : null;
    },
    handlePreview(file) {
      console.log(file);
      this.getFileData(file);
    },
    handleSuccess(file) {
      console.log(file);
    },
    getFileData(file) {
      let reader = new FileReader();
      if (typeof FileReader === "undefined") {
        this.$message({
          type: "info",
          message: "您的浏览器不支持文件读取。"
        });
        return;
      }
      reader.readAsBinaryString(file.raw);
      var _this = this;
      reader.onload = function(e) {
        console.log(e);
        _this.textInfo = e.target.result;
        console.log(_this.textInfo);
      };
    },
    handleRemove() {},
  },
};
</script>
<style scoped>
</style>