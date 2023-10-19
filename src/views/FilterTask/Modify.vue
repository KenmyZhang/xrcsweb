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

          <el-form-item label="最近多少天内活跃" prop="interval">
            <el-input-number
              placeholder="请输入"
              v-model="form.active_time"
              :min="0"
            ></el-input-number>
            天
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
        taskId: [{ required: true, message: "请输入", trigger: "blur" }],
        reply_ids: [{ required: true, message: "请输入", trigger: "blur" }],
        interval: [{ required: true, message: "请输入", trigger: "blur" }],
        active_time: [{ required: true, message: "请输入", trigger: "blur" }],
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
    /**
     * 初始化form
     */
    initForm() {
      this.form = {
        taskId: "",
        reply_ids: [],
        active_time:0,
        interval: 0,
      };
    },
    async getHellolist() {
      const { data = [] } = await get({
        page: 1,
        page_num: 1000000,
        valid: true,
      });
      this.helloContentList = data;
      // console.log(87, this.helloContentList);
    },
    async getTaskList() {
      const { data = [] } = await phoneUploadhistory({
        only_upload_finished: true,
        not_in_filter_task:true,
        page: 1,
        page_num: 1000000,
      });
      this.taskList = data || [];
      // console.log('this.taskList',  this.taskList);
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
      // const arr = this.helloContentList.filter(v=>{
      //   return this.form.reply_ids.some(id=> v.id == id)
      // })
      // const reply_contents = arr.map(v=>v.content).join(',')

      const task = this.taskList.find((v) => v.id == this.form.taskId);
      // console.log('this.form.taskId', this.form.taskId);
      const params = {
        interval: this.form.interval,
        active_time: this.form.active_time,
        filename: task.filename,
        reply_ids: this.form.reply_ids.join(','),
      };

      const { code, result } = await addFilterTasks(params);
      if (code == 200) {
        this.$message.success("新增成功");
        this.$emit("conform");
        this.close();
      } else {
        this.$message.error(result);
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
