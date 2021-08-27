<template>
  <div class="l-table">
    <el-table
      :data="tableData"
      stripe
      :ref="refName"
      :height="height"
      :style="width"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      :row-style="tableDataStyle"
      :cell-style="cellStyle"
      :show-header="showHeader"
      :header-cell-style="tableHeaderStyle"
      :span-method="arraySpanMethod"
    >
      <el-table-column
        v-if="isCheckBox"
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <template v-for="(item, index) in tableHeader">
        <el-table-column
          v-if="item.type === 'sort'"
          :key="index"
          :width="item.width"
          :label="item.label"
          :align="item.align"
        >
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <!-- 默认 -->
        <el-table-column
          :key="index"
          v-if="!item.type"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <!-- 自定义 -->
        <el-table-column
          v-if="item.type === 'slot'"
          :key="index"
          :width="item.width"
          :label="item.label"
        >
          <template slot-scope="scope">
            <slot
              :row="scope.row"
              :index="scope.$index"
              :name="item.prop"
            ></slot>
          </template>
        </el-table-column>
      </template>

      <el-table-column
        v-if="isOperation"
        :width="operationWidth"
        label="操作"
        fixed="right"
      >
        <template slot-scope="scope">
          <slot :row="scope.row" :index="scope.$index"></slot>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;">
      <el-pagination
        v-if="isPagination"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.pageTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "l-table",
  props: {
    refName: {
      type: String,
      default: "mTable"
    },
    //表格数据
    tableData: {
      type: Array,
      default: function() {
        return [];
      },
    },
    //表头数据
    tableHeader: {
      type: Array,
      default: function() {
        return [];
      },
    },
    //表格宽度
    width: {
      type: String,
      default: "100%",
    },
    //是否需要复选框
    isCheckBox: {
      type: Boolean,
      default: false,
    },
    //是否显示表格操作栏
    isOperation: {
      type: Boolean,
      default: false,
    },

    //内容固定高度
    height: {
      type: String,
      default: "400",
    },
    //操作宽度
    operationWidth: {
      type: String,
      default: "",
    },
    //是否显示分页
    isPagination: {
      type: Boolean,
      default: false,
    },
    //分页数据
    pagination: {
      type: Object,
      default: () => {},
    },
    //行高
    lineHeight: {
      type: String,
      default: "52px",
    },
    //是否处于加载中
    loading: {
      type: Boolean,
      default: false,
    },
    //树形数据
    treeProps: {
      type: Object,
      default: () => {
        return {children: '', hasChildren: ''}
      },
    },
    // 是否展示表头
    showHeader: {
      type: Boolean,
      default: true
    },
    // 合并的数据
    mergeTable: {
      type: Array,
      default: function() {
        return [];
      },
    }
  },
  data() {
    return {
      //表头样式
      tableHeaderStyle: {
        background: "#F6F7FB",
        fontSize: "14px",
        fontWeight: "400",
        height: "34px",
        color: "#8F8F95",
      },
      //行内数据样式
      tableDataStyle: {
        color: "#3E3E48",
        height: this.lineHeight,
      },
    };
  },
  filters: {
    //过滤标签
    filtersTag: function(val, data) {
      if (data) {
        let value = "";
        data.filterData.forEach((v) => {
          if (v[data.value.value] == val) {
            value = v[data.value.label];
          }
        });
        return value;
      } else {
        return val;
      }
    },
  },
  mounted() {},
  methods: {
    // 设置单元格样式
    // cellStyle({ row, column, rowIndex, columnIndex }) {
    cellStyle() {
      // if(row.status === "正在告警" && column.label === "告警状态")
      //   return { color: "#DE3D3D" }
      // if(row.status === "离线" && column.label === "设备状态")
      //   return { color: "#DE3D3D" }
      return { color: "#3E3E48" }
    },
    // arraySpanMethod({ row, column, rowIndex, columnIndex }) {
    // 增加表格合并
    arraySpanMethod({ rowIndex }) {
      if(!this.mergeTable.length)
        return ;
      let arr = this.mergeTable.map( v => {
        let [r , c] = v;
        if(rowIndex == r)
          return Number(c) + 1;
      }).filter( v => v);
      return arr.length?arr:"";
    },
    //表格中操作事件触发
    clickOn(data, fun) {
      if (fun) {
        this.$parent[fun](data);
      }
    },
    // 
    handleRowClick(row, col, event) {
      this.$emit("handleRowClick", row,col , event);
    },
    //分页大小改变
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    //当前页改变
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    //表格当前复选框选中值的改变
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    //tab过滤
    filterTag(value, row) {
      return row.value === value;
    },
    //switch开关改变
    switchChange(val, fun, data) {
      if (fun) {
        this.$parent[fun](val, data);
      }
    },
    showTips(obj, row, prop) {
      let box = obj.path[0];
      if (box.scrollHeight > box.offsetHeight) {
        row.showTooltipProp = prop;
        row.showTooltip = true;
      } else {
        row.showTooltip = false;
      }
    },
  },
};
</script>
<style scoped>
.l-table {
  min-width: 800px;
}
</style>
