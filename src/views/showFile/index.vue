<template>
  <div>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      multiple
      :limit="3"
      :auto-upload="true"
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
import {showxlsx , parse} from '../../utils/parseXLSX'
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
    handlePreview(file) {
      console.log(file);
      this.getFileData(file);
      return false;
    },
    getFileData(file) {
      showxlsx(file.raw).then( res => {
        console.log(res);
        let result = parse(res.Sheets.Sheet1);
        console.log(result);
      })
    },
    handleRemove() {},
  },
};
</script>
<style scoped>
</style>