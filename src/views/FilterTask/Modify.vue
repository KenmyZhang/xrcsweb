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
          <el-form-item label="打招呼内容" prop="reply_id">
            <el-select
              class="w100"
              v-model="form.reply_id"
              placeholder="请选择"
              clearable
            >
              <el-option
                :label="item.content"
                :value="item.id"
                v-for="item in helloContentList"
                :key="item.id"
              ></el-option>
            </el-select>
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
  </div>
</template>

<script>
import { addFilterTasks, phoneUploadhistory } from "@/api";
import { get } from "@/api/sayHello";

export default {
  components: {},
  data() {
    return {
      taskList: [],
      helloContentList: [],
      rules: {
        filename: [{ required: true, message: "请输入", trigger: "blur" }],
        reply_id: [{ required: true, message: "请输入", trigger: "blur" }],
        interval: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      show: false,
      form: {
        filename: "",
        reply_id: "",
        interval: 0,
      },
    };
  },
  computed: {},
  created() {
    this.initForm();
  },
  mounted() {},
  methods: {
    async getHellolist() {
      const { data = [] } = await get({
        page: 1,
        page_num: 1000000,
        valid: true,
      });
      // const arr = data.map(v=>v.content)
      // this.helloContentList = Array.from(new Set(arr));
      this.helloContentList = data;
      console.log(87, this.helloContentList);
    },
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
        interval: 0,
      };
    },
    async open(form) {
      this.initForm();
      await this.getTaskList();
      await this.getHellolist();
      this.show = true;
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

    /**
     * 新增
     */
    async handleAdd() {
      const obj = this.helloContentList.find((v) => v.id == this.form.reply_id);
      const { code } = await addFilterTasks({
        ...this.form,
        reply_id: Number(this.form.reply_id),
        reply_content: obj.content,
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