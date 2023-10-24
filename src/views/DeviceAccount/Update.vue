<template>
  <el-dialog
    :title="'编辑备注'"
    :visible.sync="show"
    width="70%"
    destroy-on-close
  >
    <div style="padding: 0 36px 0 0">
      <el-form ref="form" :model="form" label-width="180px">
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            placeholder="请输入"
            :rows="4"
            v-model="form.remark"
          ></el-input>
        </el-form-item>

        <el-form-item label="发送多少数量后暂停" prop="stop_num" label-width="180px">
          <el-input-number
            style="width: 240px"
            v-model="form.stop_num"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="暂停秒数" prop="stop_interval" label-width="180px">
          <el-input-number
            style="width: 240px"
            v-model="form.stop_interval"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="双钩数量" prop="double_check_num" label-width="180px">
          <el-input-number
            style="width: 240px"
            v-model="form.double_check_num"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="待检查双钩秒数" prop="double_check_interval" label-width="180px">
          <el-input-number
            style="width: 240px"
            v-model="form.double_check_interval"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="检测手机号" prop="check_phone" label-width="180px">
          <el-input
            v-model="form.check_phone"
            style="width: 240px"
            placeholder="请输入"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit" :disabled='!form.remark'>提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import {
  updateDeviceAccount
} from "@/api";
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
        remark:"",
        stop_num: 0,
        stop_interval: 0,
        double_check_num: 0,
        double_check_interval: 0,
        phone: "",
      };
    },

   handleSubmit() {
        this.handleUpdate();
    },

    /**
     * 编辑
     */
    async handleUpdate() {
      const { code } = await updateDeviceAccount({ ...this.form });
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