<template>
  <div class="dragger">
    <asider-dragger
      @handleOnClick="handleOnClick"
      :width="draWid"
      :height="draHei"
      :ref="asiderRefDragger"
    >
      <div slot="left" class="">
        <left-com :width="draWid"></left-com>
      </div>
      <div slot="switch" style="font-size: 20px;">
        <i class="el-icon-arrow-right" style="margin-top: 45vh;"></i>
      </div>
      <div slot="right">
        <div style="width: 100%;height:500px" id="allmap">
          <i class="el-icon-loading loadingMap" v-if="loadingMap"></i>
        </div>
        <Levitation
          :title="'覆盖分析'"
          :slide-range="['10%', '72%']"
          :right="'3%'"
        >
          <span slot="other">
            <el-button type="primary" style="padding: 5px;font-size: 8px;"
              >4/5G详单</el-button
            >
            <el-button type="primary" style="padding: 5px;font-size: 8px;"
              >导出</el-button
            >
          </span>
          <div slot="main" class="info">
            <mTable
              :width="tableWidth"
              :tableHeader="tableHeader"
              :tableData="tableData"
              :loading="loading"
              :isPagination="isPagination"
              :height="'200'"
            >
              <template slot-scope="scope" slot="details">
                <span @click="showDetails(scope.row)" class="details"
                  >详情</span
                >
              </template>
            </mTable>
          </div>
        </Levitation>
      </div>
    </asider-dragger>
  </div>
</template>
<script>
import asiderDragger from "@/components/dragger/asiderDragger.vue";
import asiderDraggerCon from "@/components/dragger/asiderDraggerCon.vue";
import Levitation from "@/components/Levitation/index.vue";
import LeftCom from "./component/leftCom.vue";
import mTable from "@/components/mTable.vue";

window.BMAPGL_URL = "https://gis.10621234.com:9081/dugis-baidu";
window.TRAFFIC_URL = "https://gis.10621234.com:9081/dugis-baidu";
// http://10.162.240.185:8219/baidumap/bmapgl/examples/#webgl0_2
export default {
  name: "dragger",
  components: {
    asiderDragger,
    asiderDraggerCon,
    LeftCom,
    Levitation,
    mTable,
  },
  data() {
    return {
      loadingMap: true,
      asiderRefDragger: "asiderDragger",
      draWid: "25vw", // "330px",
      draHei: "99.8vh",
      size: "mini",
      tableHeader: [],
      brevityTableHeader: [
        { label: "用户号码", prop: "user_phone" },
        { label: "4/5G标签", prop: "g45_label" },
        {
          label: "MR总次数",
          prop: "mr",
          formatter: (row, column) => {
            console.log(column);
            return row.mr;
          },
        },
        { label: "RSRP>-110次数", prop: "rsrp_110" },
        { label: "平均RSRP", prop: "rsrp_avg" },
        { label: "平均RSRQ", prop: "rsrq" },
        { label: "平均SINR", prop: "sinr_avg" },
        { label: "平均TA", prop: "ta_avg" },
        { type: "slot", prop: "details", label: "操作" },
      ],
      tableData: [],
      brevityTableData: [
        {
          user_phone: "1821",
          g45_label: "1821",
          mr: "1821",
          rsrp_110: "1821",
          rsrp_avg: "1821",
          rsrq: "1821",
          sinr_avg: "1821",
          ta_avg: "1821",
        },
      ],
      tableWidth: "",
      loading: false,
      isPagination: false,
      pagination: {
        currentPage: 1,
        pageTotal: null,
        pageSize: 10,
      },
      detailsTableHeader: [],
      detailsTableData: [],
      sdk:
        "https://gis.10621234.com:9081/dugis-baidu/baidumap/bmapgl/api/booter.js",
      sdk2: "https://gis.10621234.com:9081/dugis-baidu/baidumap/jsapi/api.js",
    };
  },
  mounted() {
    // 页面初始化-修正表格宽度
    let draWid = parseFloat(this.draWid);
    this.tableWidth =
      80 -
      draWid +
      this.draWid.slice(
        this.draWid.indexOf(draWid) + draWid.toString.length + 1
      );
    console.log(this.tableWidth);
    this.tableHeader = this.brevityTableHeader;
    this.tableData = this.brevityTableData;
    this.insertLink(window.BMAPGL_URL + "/baidumap/bmapgl/api/bmap.css").then(
      () => {
        this.insertScript(this.sdk2).then(
          // this.insertScript(window.BMAPGL_URL + "/bmapgl/?qt=getscript&libraries=visualization").then(
          () => {
            setTimeout(() => {
              console.log(window.BMap);
              // let map = new window.BMapGL.Map("allmap");
              // map.centerAndZoom(new BMapGL.Point(116.404,39.915),11);
              let map = new window.BMap.Map("allmap");
              map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
              map.enableScrollWheelZoom(true);
              this.addControl(map,"ScaleControl");
              this.addControl(map,"MapTypeControl");
              this.addControl(map,"NavigationControl"); // 导航控件
              this.loadingMap = false;
            }, 4000);
          }
        );
      }
    );
  },
  methods: {
    addControl(map,controller) {
      let ctrl = new window.BMap[controller]();
      map.addControl(ctrl);
    },
    handleOnClick(item) {
      console.log(item);
      let r = item.rightSize;
      let l = item.leftSize;
      if (item.name == "resize") {
        this.tableWidth = (parseInt(r) - parseInt(l)) * 1 + "px";
      } else {
        this.tableWidth = parseInt(r) - 200 + "px";
      }
      console.log(this.tableWidth);
    },
    showDetails(row) {
      console.log(row);
    },
    handleSizeChange(size) {
      this.pagination.size = size;
    },
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
    },
  },
};
// https://pan.baidu.com/s/1Vg7NkKppWrpFiICXFk3yA
</script>
<style lang="scss" scoped>
.dragger {
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .info {
    width: 100%;
    padding-top: 20px;
    overflow: hidden;
    .details {
      color: #409eff;
      cursor: pointer;
    }
  }
  .loadingMap {
    font-size: 60px;
    position: absolute;
    top: 200px;
    right: 50%;
    opacity: 0.3;
  }
}
</style>
