<template>
  <el-dialog
    :title="form.id ? '编辑' : '新增'"
    :visible.sync="show"
    width="70%"
    destroy-on-close
  >
    <div style="padding: 0 36px 0 0">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="模式" prop="name">
          <el-input placeholder="请输入" clearable v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="模式" prop="mode">
          <el-radio-group
            v-model="form.mode"
            :disabled="!!form.id"
          >
            <el-radio :label="0">随机</el-radio>
            <el-radio :label="1">组合</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="enable">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开"
            inactive-text="关"
            v-model="form.enable"
          >
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSubmit"
            :disabled="!form.name"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { get, del, update, add } from "@/api/sayHelloGroup";
import { areaList } from "@/assets/js/area";
import UploadVideo from "@/components/UploadVideo.vue";

export default {
  components: { UploadVideo },
  data() {
    return {
      show: false,
      form: {
        mode: 0,
        name: '',
        enable: false,
      },
    };
  },
  computed: {},
  created() {
    this.initForm();
  },
  mounted() {},
  methods: {
    /**
     * 初始化form
     */
    initForm() {
      this.form = {
        mode: 0,
        name: '',
        enable: false,
      };
    },
    open(form) {
      console.log(6666);
      this.initForm();
      this.form = { ...this.form, ...form };
      this.show = true
    },
    close() {
      this.form = {};
      this.show = false;
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
      const { code } = await add({ ...this.form });
      if (code == 200) {
        this.$message.success("新增成功");
        this.$emit("conform");
        this.close();
      } else {
        this.$message.error("新增失败");
      }
    },
    /**
     * 编辑
     */
    async handleUpdate() {
      const { code } = await update({ ...this.form });
      if (code == 200) {
        this.$message.success("更新成功");
        this.$emit("conform");
        this.close();
      } else {
        this.$message.error("更新失败");
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
</style>
