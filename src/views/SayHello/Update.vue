<template>
  <div>
    <el-dialog
      :title="form.id ? '编辑' : '新增'"
      :visible.sync="show"
      append-to-body
      width="70%"
      destroy-on-close
    >
      <div style="padding: 0 36px 0 0">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="类型" prop="type">
            <el-radio-group
              v-model="form.type"
              :disabled="!!form.id"
              @input="radioChange"
            >
              <el-radio :label="1">文字</el-radio>
              <el-radio :label="2">音频</el-radio>
              <el-radio :label="3">图片</el-radio>
              <el-radio :label="4">视频</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="内容" prop="content" v-if="form.type == 1">
            <el-input
              type="textarea"
              :rows="4"
              v-model="form.content"
            ></el-input>
          </el-form-item>
          
          <el-form-item label="内容" prop="content" v-if="form.type == 2">
            <UploadVideo v-model="form.content" />
          </el-form-item>
          <el-form-item label="内容" prop="content" v-if="form.type == 3">
            <UploadVideo v-model="form.content" />
          </el-form-item>
          <el-form-item label="内容" prop="content" v-if="form.type == 4">
            <UploadVideo v-model="form.content" />
          </el-form-item>

          <el-form-item label="组名" prop="group_id" v-if="!form.id">
            <hello-group-modal v-model="form.group_id" />
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
              :disabled="!form.content"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { get, del, update, add } from "@/api/sayHello";
import { areaList } from "@/assets/js/area";
import UploadVideo from "@/components/UploadVideo.vue";
import HelloGroupModal from "./HelloGroupModal";

export default {
  components: { UploadVideo, HelloGroupModal },
  data() {
    return {
      show: false,
      cityOptions: areaList,
      cityProps: {
        multiple: true,
        value: "name",
        label: "name",
        children: "city",
        emitPath: false,
      },
      form: {
        type: 1,
        city: [],
      },
    };
  },
  computed: {},
  created() {
    this.initForm();
    // this.cityOptions = areaList
  },
  mounted() {},
  methods: {
    /**
     * 初始化form
     */
    initForm() {
      this.form = {
        type: 1,
        city: [],
        enable: false,
        content: "",
      };
    },
    open(form) {
      this.initForm();
      this.show = true;
      const city = (form.city || "")
        .split(",")
        .filter((i) => i)
        .map((i) => {
          const len = i.length;
          return i.slice(0, len - 1);
        });
      // console.log(889, city);
      this.form = { ...this.form, ...form, city };
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

    radioChange(e) {
      this.form.content = "";
    },
    /**
     * 新增
     */
    async handleAdd() {
      const city = this.form.city.map((i) => i + "市").join(",");
      // console.log(1231, this.form.city);
      // console.log(
      //   1232,
      //   this.form.city.map((i) => i + "市")
      // );
      // console.log(1233, city);
      const { code } = await add({ ...this.form, city });
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
      const city = this.form.city.map((i) => i + "市").join(",");
      const { code } = await update({ ...this.form, city });
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
