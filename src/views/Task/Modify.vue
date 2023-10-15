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
              v-model="form.taskId"
              placeholder="请选择文件名"
              clearable
            >
              <el-option
                :label="item.filename"
                :value="item.id"
                v-for="item in taskList"
                :key="item.id"
              ></el-option>
            </el-select>
            <div v-if="form.taskId">文件内总数量：{{ totalTasks }}条</div>
          </el-form-item>
          <el-form-item label="打招呼内容" prop="reply_ids">
            <el-select
              class="w100"
              v-model="form.reply_ids"
              placeholder="请选择"
              multiple
              clearable
            >
              <el-option
                :label="item.content"
                :value="item.id"
                v-for="item in helloContentList"
                :key="item.id"
              >
                <audio controls v-if="item.type == 2" style="height: 32px">
                  <source :src="item.content" />
                </audio>
              </el-option>
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
import { phoneTask, phoneTaskFiles } from "@/api";
import { get } from "@/api/sayHello";

export default {
  components: {},
  data() {
    return {
      taskList: [],
      helloContentList: [],
      rules: {
        taskId: [{ required: true, message: "请输入", trigger: "blur" }],
        reply_ids: [{ required: true, message: "请输入", trigger: "blur" }],
        interval: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      show: false,
      form: {},
    };
  },
  computed: {
    totalTasks() {
      if (!this.form.taskId) return;
      const item = this.taskList.find((v) => v.id == this.form.taskId);
      return item.total;
    },
  },
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
      // console.log(87, this.helloContentList);
    },
    async getTaskList() {
      const { data = [] } = await phoneTaskFiles({});
      // console.log(data)
      // console.log('123213')
      // this.taskList = data || [];
      console.log(data)
      console.log('data')
      //const taskList = [];
      //data.forEach((v) => {
      //  if (!taskList.includes(v.filename)) {
      //    taskList.push(v.filename);
      //  }
      //});
      this.taskList = data;
    },

    /**
     * 初始化form
     */
    initForm() {
      this.form = {
        taskId: "",
        reply_ids: [],
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
      // const obj = this.helloContentList.find((v) => v.id == this.form.reply_ids);
      const task = this.taskList.find((v) => v.id == this.form.taskId);

      const params = {
        interval: this.form.interval,
        filename: task.filename,
        reply_ids: this.form.reply_ids.join(","),
        // reply_content: obj.content,
      };
      const { code } = await phoneTask(params);
      if (code == 200) {
        this.$message.success("新增成功");
        this.$emit("conform");
        this.close();
      } else {
        this.$message.error("新增失败,"+result);
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
<style lang="stylus" scoped>
/* @import url(); 引入css类 */
</style>
