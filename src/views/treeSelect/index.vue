<template>
  <div class="treeSelect">
    <jump-website @jumpWebsite="jumpWebsite"></jump-website>
    <el-tree-select
      v-model="searchKey"
      :normalizer="normalizer"
      :options="treeData"
      :show-count="true"
      :disable-branch-nodes="true"
      placeholder="请选择需要搜索的内容"
      @select="selectNode"
      style="width: 50%"
    />
    <div class="web-frame" v-if="showWebsite">
      <frameset style="overflow: scroll;">
        <frame :src="src">
      </frameset>
    </div>

  </div>
</template>
<script>
import jumpWebsite from '../../components/jumpWebsite.vue';
import website from '../../config/website';
export default {
  components: {
    jumpWebsite
  },
  data() {
    return {
      showWebsite: false,
      src: '',
      searchKey: null,
      treeData: website,
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
    selectNode(node) {
      this.searchKey = node.id;
      this.jumpWebsite();
    },
    jumpWebsite() {
      if(!this.searchKey) return ;
      let range = this.searchKey.split('-');
      let handleObj = (obj) => {
        if(!range.length) return obj;
        if(obj instanceof Object && obj.children && obj.children.length) {
          return handleObj(obj.children);
        }
        let loc = range.shift();
        return handleObj(obj[loc]);
      }
      var obj = handleObj([...website]);
      this.src = obj.url;
      this.showWebsite = true;
    }
  },
};
</script>
<style>
.treeSelect {
  margin: 2% 0 0 2%;
}
.treeSelect .web-frame {
  /* max-width: 80%;  */
  overflow-x: scroll;
}
</style>