<template>
  <div class="mavon-editor">
    <el-row :gutter="20">
      <el-col :span="7">
        <span>语言：</span>
        <el-select
          filterable
          default-first-option
          size="small"
          v-model="form.lang"
          clearable
          placeholder="请选择语言"
        >
          <el-option
            v-for="(v, i) in lang"
            :key="v.value + '' + i"
            :label="v.label"
            :value="v.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <br />
    <mavon-editor class="editor" :language="form.lang" @save="save" />
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form>
        <el-form-item label="文件名称：" label-width="90px">
          <el-input 
            ref="filename-input"
            placeholder="请输入文件名..." 
            v-model="filename"
            size="small"
            clearable 
            @keydown.enter.native="handleSure"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="close">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSure"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import downBlob from "../../utils/dataObject";
export default {
  data() {
    return {
      dialogVisible: false,
      fileData: "", // 文件数据
      filename: "", // 文件名称
      form: {
        lang: "",
      },
      lang: [
        { value: "zh-CN", label: "简体中文", },
        { value: "zh-TW", label: "正体中文", },
        { value: "en", label: "英文", },
        { value: "ja", label: "日语", },
        { value: "ru", label: "俄语", },
        { value: "fr", label: "法语", },
        { value: "pt-BR", label: "葡萄牙语", },
        { value: "de", label: "德语", },
      ],
    };
  },
  methods: {
    // 保存 val-原文本 ， content - md文本
    save(val, content) {
      console.log(content);
      this.fileData = content;
      this.dialogVisible = true;
      this.$nextTick( () => {
        this.$refs["filename-input"].focus();
      })
    },
    close() {
      this.dialogVisible = false;
    },
    handleSure() {
      if(!this.filename) return ;
      this.down();
      this.close();
    },
    down(data) {
      let con = this.fileData;
      if (data) con = data;
      downBlob.down(con, false);
    },
  },
};
</script>
<style scoped>
.mavon-editor {
  /* width: 100%; */
  padding: 20px;
}
.mavon-editor .editor {
  max-height: 700px;
}
</style>