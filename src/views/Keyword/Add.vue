<template>
  <el-dialog
    :title="form.id ? '编辑成交关键词' : '新增成交关键词'"
    :visible.sync="show"
    width="70%"
    destroy-on-close
  >
    <div style="padding: 0 36px 0 0">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="关键字" prop="keyword">
          <el-input
            placeholder="请输入关键字"
            v-model="form.keyword"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            placeholder="请输入"
            :rows="4"
            v-model="form.remark"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit" :disabled='!form.keyword'>提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import {
  keywordList,
  keywordDel,
  validPasswd,
  keywordHasPasswd,
  keywordUpdate,
  keywordAdd,
  keywordCheck,
} from "@/api/keyword";
export default {
  components: {},
  data() {
    return {
      show: false,
      form: {},
    };
  },
  computed: {},
  created() {
    this.initForm();
    // this.cityOptions = areaList
  },
  mounted() {},
  methods: {
    open(obj) {
      this.initForm();
      this.form = { ...this.form, ...obj };
      this.show = true;
    },
    close() {
      this.form = {};
      this.show = false;
    },
    initForm() {
      this.form = {
        id:"",
        content:"",
        keyword:"",
        remark:"",
      };
    },
    handleSubmit() {
      if (this.form.id) {
        this.handleUpdate();
      } else {
        this.handleAdd();
      }
    },

    /**
     * 新增
     */
    async handleAdd() {
      const { code } = await keywordAdd({ ...this.form });
      if (code == 200) {
        this.$message.success("新增成功");
        this.$emit("confirm");
        this.close();
      } else {
        this.$message.error("新增失败");
      }
    },
    /**
     * 编辑
     */
    async handleUpdate() {
      const { code } = await keywordUpdate({ ...this.form });
      if (code == 200) {
        this.$message.success("编辑成功");
        this.$emit("confirm");
        this.close();
      } else {
        this.$message.error("编辑失败");
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
/* @import url(); 引入css类 */
</style>