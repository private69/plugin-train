<template>
  <div>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-remove="handleRemove"
      multiple
      :limit="3"
      :auto-upload="true"
      :file-list="fileList"
      :before-upload="handleBeforeUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
    <div class="showArea" v-if="tableData.length >= 1 || primaryFileData">
      <m-table
         v-if="tableData.length >= 1"
        ref="mtable"
        :loading="loading"
        :tableHeader="tableHeader"
        :tableData="tableData"
        :showHeader="showHeader"
        :mergeTable="mergeTable"
      ></m-table>
      <pre  v-if="primaryFileData">{{ primaryFileData }}</pre>
    </div>
  </div>
</template>
<script>
import { showxlsx, parse, showFileData } from "../../utils/parseXLSX";
import mTable from "../../components/mTable.vue";
export default {
  components: { mTable },
  data() {
    return {
      showHeader: false,
      loading: false,
      fileList: [],
      tableHeader: [], // excel 表头
      tableData: [], // excel 表格数据
      mergeTable: [], // 表格合并情况
      primaryFileData: "", // 普通文件数据
      qrcode: {}
    };
  },
  mounted() {
  },
  methods: {  
    // 加载前的预览
    handleBeforeUpload(file) {
      console.log(file);
      this.showHeader = false;
      if (/.(xlsx|xls)$/.test(file.name)) 
        this.getExcelFileData(file);
      if (/.(doc|docx)$/.test(file.name)) 
        this.getWordFileData(file);
      if (/.(md|txt|js|html|css|bat|cmd)$/.test(file.name))
        this.getPrimaryFileData(file);
      if (/.(json)$/.test(file.name)) 
        this.getJSONFileData(file);
      return false;
    },
    // 普通文件
    getPrimaryFileData(file) {
      showFileData(file).then((res) => {
        console.log(res);
        this.primaryFileData = res;
      });
    },
    // 数据转化为表格
    getJSONFileData(file) {
      showFileData(file).then((res) => {
        if (!res.length) return;
        try{
          let arr = JSON.parse(res + '');
          Object.keys(arr[0]).map((v) => {
            const header = {
              label: v,
              prop: v,
              align: "center",
            };
            this.tableHeader.push(header);
          });
          this.tableData = [...arr];
          this.showHeader = true;
        }catch(err){
          console.error("err:" , err.message);
        }
      });
    },
    getWordFileData(file) {
      showFileData(file, "readAsText").then((res) => {
        this.primaryFileData = res;
      });
    },
    // 获取 excel 文件数据
    getExcelFileData(file) {
      this.loading = true;
      showxlsx(file).then((res) => {
        console.log(res);
        let result = parse(res);
        this.tableHeader = result.header;
        this.tableData = [];
        let max = Math.max.apply(
          "",
          this.tableHeader.map((v) => {
            return result.data[v.label].length;
          })
        );
        for (let i = 0; i < max; i++) {
          this.tableData[i] = {};
          this.tableHeader.map((v) => {
            this.tableData[i][v.label] = result.data[v.label][i] || "";
          });
          this.tableData = this.tableData.filter((v) => {
            return Object.values(v).filter((val) => val).length > 0;
          });
        }
        this.$nextTick(() => {
          this.$refs.mtable.$refs.mTable.doLayout(); // 解决表格错位
          this.loading = false;
        });
        this.mergeTable = [...result.merge];
        console.log(result);
        console.log(this.tableData);
      });
    },
    handleRemove() {},
  },
};
</script>
<style>
.showArea {
  margin-top: 50px;
  height: 500px;
  overflow-y: scroll;
}
</style>