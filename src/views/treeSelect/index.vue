<template>
  <div>
    
    <el-tree-select
      v-model="form"
      :normalizer="normalizer"
      :options="treeData"
      :show-count="true"
      placeholder="请选择所属部门"
      style="width: 100%"
    />
  </div>
</template>
<script>
import jumpWebsite from '../../';
export default {
  data() {
    return {
      form: null,
      treeData: [],
    };
  },
  mounted() {},
  methods: {
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.label,
        children: node.children,
      };
    },
    jumpWebsite() {
      window.open('https://www.vue-treeselect.cn/')
    }
  },
};
</script>
<style scoped>
</style>