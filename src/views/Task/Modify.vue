<template>
  <div>
    <el-dialog
      :title="form.id ? '编辑' : '新增'"
      :visible.sync="show"
      width="70%"
      destroy-on-close
    >
      <div style="padding: 0 36px 0 0">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-form-item label="文件名" prop="filename">
            <el-select
              class="w100"
              v-model="form.filename"
              placeholder="请选择文件名"
              clearable
            >
              <el-option
                :label="item"
                :value="item"
                v-for="item in taskList"
                :key="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="打招呼id" prop="reply_id">
            <div @click="$refs.selectReplyIdRef.open()">
              <div v-if="row.id" class="pointer">{{ row.id }}</div>
              <el-button v-else size="small">请选择</el-button>
            </div>
          </el-form-item>
          <el-form-item label="打招呼内容" prop="reply_content">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入"
              v-model="form.reply_content"
            ></el-input>
          </el-form-item>

          <el-form-item label="消息延迟" prop="interval">
            <el-input-number
              placeholder="请输入"
              v-model="form.interval"
              :min="0"
            ></el-input-number>
            秒
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <select-reply-id
      ref="selectReplyIdRef"
      @handleSelectReplyId="handleSelectReplyId"
    />
  </div>
</template>

<script>
import { phoneTask, phoneUploadhistory } from "@/api";
import SelectReplyId from "./SelectReplyId";

export default {
  components: { SelectReplyId },
  data() {
    return {
      row: {},
      taskList: [],
      rules: {
        filename: [{ required: true, message: "请输入", trigger: "blur" }],
        reply_id: [{ required: true, message: "请输入", trigger: "blur" }],
        reply_content: [{ required: true, message: "请输入", trigger: "blur" }],
        interval: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      show: false,
      form: {
        filename: "",
        reply_id: "",
        reply_content: "",
        interval: 0,
      },
    };
  },
  computed: {},
  created() {
    this.initForm();
    this.getTaskList();
  },
  mounted() {},
  methods: {
    async getTaskList() {
      const { data = [] } = await phoneUploadhistory({
        page: 1,
        page_num: 1000000,
      });
      // this.taskList = data || [];
      const taskList = [];
      data.forEach((v) => {
        if (!taskList.includes(v.filename)) {
          taskList.push(v.filename);
        }
      });
      this.taskList = taskList;
    },

    /**
     * 初始化form
     */
    initForm() {
      this.form = {
        filename: "",
        reply_id: null,
        reply_content: "",
        interval: 0,
      };
    },
    open(form) {
      this.initForm();
      this.show = true;
      this.row = {};
      this.form = { ...this.form, ...form };
    },
    close() {
      this.form = {};
      this.show = false;
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.id) {
            this.handleUpdate();
          } else {
            this.handleAdd();
          }
        }
      });
    },
    handleSelectReplyId(row) {
      console.log(33, row);
      this.row = row;
      this.form.reply_id = row.id;
    },

    /**
     * 新增
     */
    async handleAdd() {
      const { code } = await phoneTask({
        ...this.form,
        reply_id: Number(this.form.reply_id),
      });
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
      const { code } = await update(this.form);
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
<style rel="stylesheet/scss" lang="scss" scoped>
/* @import url(); 引入css类 */
</style>