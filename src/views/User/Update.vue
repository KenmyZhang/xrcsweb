<template>
  <el-dialog title="编辑信息" :visible.sync="show" width="70%" destroy-on-close>
    <div style="padding: 0 36px 0 0">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="头像" prop="avatar">
          <UploadImg v-model="form.avatar" v-if="show" :limit="1" />
        </el-form-item>
        <el-form-item label="名称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpdate">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { customerUpdate, customerDetail } from "@/api/user";
import UploadImg from "@/components/UploadImg";

export default {
  components: { UploadImg },
  data() {
    return {
      show: false,
      form: {},
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    /**
     * 初始化form
     */
    initForm() {
      this.form = {
        nickname: "",
        avatar: "",
      };
    },
    open(form) {
      this.initForm();
      this.show = true;
      this.form.nickname = form.nickname
      this.form.avatar = form.avator
    },
    close() {
      this.form = {};
      this.show = false;
    },
    /**
     * 编辑
     */
    async handleUpdate() {
      const { code } = await customerUpdate(this.form);
      if (code == 200) {
        this.$message.success("更新成功");
        this.$emit("confirm");
        this.close();
      } else {
        this.$message.error("更新失败");
      }
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/* @import url(); 引入css类 */
</style>