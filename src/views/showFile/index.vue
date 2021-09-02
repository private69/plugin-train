<!-- 文件解析 -->
<template>
  <div>
    <el-upload
      ref="fileUpload"
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
      <div slot="tip" class="el-upload__tip">展示上传的文件的内容</div>
    </el-upload>
    <div class="showArea" v-show="ifExcel || ifPrimary || ifWord || ifImage">
      <m-table
        v-if="ifExcel"
        ref="mtable"
        :loading="loading"
        :tableHeader="tableHeader"
        :tableData="tableData"
        :showHeader="showHeader"
        :mergeTable="mergeTable"
      ></m-table>
      <pre v-show="ifPrimary || ifWord" ref="fileData">{{
        primaryFileData
      }}</pre>
      <img v-show="ifImage" :src="imageSrc" alt="Error" />
    </div>
    <!-- pdf -->
    <div v-show="ifpdf" class="showPDFArea">
      <div>
        <pdf ref="pdfComponent" :src="pdfData" :page="pageObj.page"></pdf>
      </div>
      <div>
        <span>
          <i
            class="el-icon-arrow-left"
            @click="pageObj.page > 1 && pageObj.page--"
          ></i>
          <span class="currentPage">{{ pageObj.page }}</span>
          <i class="el-icon-arrow-right" @click="pageObj.page++"></i>
          <input type="text" name="" class="gotoPage" placeholder="跳转某页" @blur="changePage">
          <span style="padding-left: 10px">{{
            "共 " + pageObj.pageSize + " 页"
          }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  parseWord,
  showxlsx,
  parse,
  showFileData,
} from "../../utils/parseXLSX";
import mTable from "../../components/mTable.vue";
import pdf from "vue-pdf";
export default {
  components: { mTable, pdf },
  data() {
    return {
      showHeader: false, // 展示请求头
      loading: false,
      fileList: [], // 文件列表
      tableHeader: [], // excel 表头
      tableData: [], // excel 表格数据
      mergeTable: [], // 表格合并情况
      primaryFileData: "", // 普通文件数据
      ifWord: false, // 是否展示 word 文档
      ifImage: false, // 是否展示图片
      imageSrc: "", // 图片数据
      ifpdf: false, // 是否展示 pdf
      ifPrimary: false, // 普通文本数据
      ifExcel: false, // excel 数据
      pdfData: "", // pdf 数据
      pageObj: {
        page: 1,
        pageSize: 100,
      },
      ifShow: ["ifWord", "ifImage", "ifpdf", "ifExcel", "ifPrimary"],
    };
  },
  mounted() {},
  methods: {
    // 输入框事件
    changePage(event) {
      let page = parseInt(event.target.value);
      if(page <= 0 || page > this.pageObj.pageSize) {
        this.$message.warning("不存在当前页！");
        return ;
      }
      this.pageObj.page =  page;
    },
    // 加载前的预览
    handleBeforeUpload(file) {
      // this.addClass(this.$refs.fileUpload.$el, "animated infinite headShake");
      console.log(file);
      this.showHeader = false;
      this.ifShow.map((v) => {
        this[v] = false;
      });
      if (/.(xlsx|xls)$/.test(file.name)) this.getExcelFileData(file);
      else if (/.(doc|docx)$/.test(file.name)) this.getWordFileData(file);
      else if (/.(md|txt|js|html|css|bat|cmd)$/.test(file.name))
        this.getPrimaryFileData(file);
      else if (/.(json)$/.test(file.name)) this.getJSONFileData(file);
      else if (/.(png|jpg|jpeg)$/.test(file.name)) this.getImageFileData(file);
      else if (/.(pdf)$/.test(file.name)) this.getPdfFileData(file);
      return false;
    },
    // 普通文件
    getPrimaryFileData(file) {
      showFileData(file).then((res) => {
        console.log(res);
        this.primaryFileData = res;
      });
    },
    // pdf 文件
    getPdfFileData(file) {
      // this.pdfData = file.name;
      showFileData(file, "readAsDataURL").then((res) => {
        let that = this;
        this.ifpdf = true;
        this.pdfData = res;
        this.$refs.pdfComponent.pdf.forEachPage(function (page) {
          that.pageObj.pageSize = page.pageNumber;
          // console.log(page);
        });
      });
    },
    // 获取图片
    getImageFileData(file) {
      showFileData(file, "readAsDataURL").then((res) => {
        this.ifImage = true;
        this.imageSrc = res;
      });
    },
    // 数据转化为表格
    getJSONFileData(file) {
      showFileData(file).then((res) => {
        if (!res.length) return;
        try {
          let arr = JSON.parse(res + "");
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
        } catch (err) {
          console.error("err:", err.message);
        }
      });
    },
    // word 文档
    getWordFileData(file) {
      showFileData(file, "readAsBinaryString").then((res) => {
        parseWord({ arrayBuffer: res }).then((result) => {
          this.ifWord = true;
          console.log(result);
          let pre = this.$refs.fileData;
          pre.innerHTML = result.value;
        });
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
<style lang="scss" scoped>
.showArea {
  margin-top: 50px;
  height: 500px;
  overflow-y: scroll;
}
.showPDFArea {
  & > div:first-child {
    width: 100%;
    height: 700px;
    overflow-y: scroll;
  }
  & > div:last-child {
    text-align: center;
    margin-top: 10px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    i {
      cursor: pointer;
      padding: 5px;
    }
    span {
      color: #999;
      font-size: 14px;
    }
    .currentPage {
      /* padding: 0 20px; */
      display: inline-block;
      width: 70px;
    }
    .gotoPage {
      padding: 5px;
      margin: auto 5px;
      width: 50px;
    }
  }
}
</style>