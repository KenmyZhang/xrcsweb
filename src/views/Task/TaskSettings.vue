<template>
  <div>
    <el-dialog
      :visible.sync="show"
      width="500px"
      destroy-on-close
      append-to-body
      title="任务配置"
    >
      <el-form
        ref="form"
        :model="formValues"
        size="small"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item label="发送多少数量后暂停" prop="stop_num">
          <el-input-number
            style="width: 240px"
            v-model="formValues.stop_num"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="暂停秒数" prop="stop_interval">
          <el-input-number
            style="width: 240px"
            v-model="formValues.stop_interval"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="双钩数量" prop="double_check_num">
          <el-input-number
            style="width: 240px"
            v-model="formValues.double_check_num"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="待检查双钩秒数" prop="double_check_interval">
          <el-input-number
            style="width: 240px"
            v-model="formValues.double_check_interval"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input
            v-model="formValues.phone"
            style="width: 240px"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { taskphoneslist, taskmemberset } from "@/api";
import dayjs from "dayjs";

export default {
  data() {
    return {
      rules: {
        stop_num: [{ required: true, message: "请输入", trigger: "blur" }],
        stop_interval: [{ required: true, message: "请输入", trigger: "blur" }],
        double_check_num: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        double_check_interval: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      formValues: {},
      show: false,
      task_id: "",
      account: "",
    };
  },
  computed: {
    getTime() {
      return (num) => (num ? dayjs(num).format("YYYY-MM-DD, HH:mm") : "-/-");
    },
  },
  created() {},
  mounted() {},
  methods: {
    async open({ task_id, account }) {
      this.task_id = task_id;
      this.account = account;
      this.stop_num = "";
      this.stop_interval = "";
      this.double_check_num = "";
      this.double_check_interval = "";
      this.phone = "";
      this.show = true;
    },
    close() {
      this.show = false;
    },
    onConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          taskmemberset({
            ...this.formValues,
            account: this.account,
            task_id: this.task_id,
          }).then((res) => {
            console.log(9783, res);
            this.$message.success("设置成功");
            this.close();
          });
        }
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
/* @import url(); 引入css类 */
.w-table {
  // max-height: 60vh;
  // overflow-y: scroll;
}
</style>
