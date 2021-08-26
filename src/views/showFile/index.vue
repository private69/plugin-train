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
    <div v-if="tableData.length >= 1">
      <m-table 
        :tableHeader="tableHeader"
        :tableData="tableData"
      ></m-table>
    </div>
  </div>
</template>
<script>
import {showxlsx , parse} from '../../utils/parseXLSX';
import mTable from '../../components/mTable.vue';
export default {
  components: {  mTable},
  data() {
    return {
      fileList: [],
      textInfo: "",
      tableHeader: [],
      tableData: []
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
        this.tableHeader = result.header;
        let max = Math.max.apply('',this.tableHeader.map( v => {
          return result.data[v.label].length;
        }))
        for(let i = 0; i<max;i++) {
          this.tableData[i] = {};
          this.tableHeader.map( v => {
            this.tableData[i][v.label] = result.data[v.label][i] || "";
          })
        }
        console.log(result);
        console.log(this.tableData);
      })
    },
    handleRemove() {},
  },
};
</script>
<style>

</style>