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
    <div class="showArea">
      <m-table
        v-if="tableData.length"
        ref="mtable"
        :loading="loading"
        :tableHeader="tableHeader"
        :tableData="tableData"
        :showHeader="false"
        :mergeTable="mergeTable"
      ></m-table>
      <pre>{{ primaryFileData }}</pre>
    </div>
  </div>
</template>
<script>
import { showxlsx, parse ,showFileData} from "../../utils/parseXLSX";
import mTable from "../../components/mTable.vue";
export default {
  components: { mTable },
  data() {
    return {
      loading: false,
      fileList: [],
      tableHeader: [], // excel 表头
      tableData: [], // excel 表格数据
      mergeTable: [], // 表格合并情况
      primaryFileData: "", // 普通文件数据
    };
  },
  mounted() {},
  methods: {
    // 加载前的预览
    handleBeforeUpload(file) {
      console.log(file);
      if(/.(xlsx|xls)$/.test(file.name))
        this.getExcelFileData(file);
      if(/.(doc|docx)$/.test(file.name))
        this.getWordFileData(file);
      if(/.(md|txt|js|html|css|bat|cmd|json)$/.test(file.name))
        this.getPrimaryFileData(file);
      return ;
    },
    getPrimaryFileData(file) {
      showFileData(file).then( res => {
        // console.log(res);
        this.primaryFileData = res;
      })
    },
    getWordFileData(file) {
      showFileData(file,"readAsBinaryString").then( res => {
        this.primaryFileData = res;
      })
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
  height: 500px;
  overflow-y: scroll;
}
</style>