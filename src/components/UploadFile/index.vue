<template>
  <div :class="limit <= fileList.length ? 'more-than-limit' : ''">
    <el-upload
      action="#"
      ref="upload"
      multiple
      :limit="limit"
      :file-list="fileList"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :http-request="httpRequest"
      :on-success="onSuccess"
    >
      <el-button type="primary"
        ><i class="el-icon-upload" style="margin-right: 8px"></i
        >上传号码</el-button
      >
    </el-upload>
  </div>
</template>

<script>
import { phoneUpload } from "@/api/upload";
import { getUuid } from "@/utils/index";

export default {
  components: {},
  props: {
    limit: {
      type: Number,
      default: 9,
    },
    rm_dup: {
      type: Boolean,
      default: false,
    },
    rm_reply: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      fileList: [], //深拷贝，判断重名及第一步时的文件信息展示
    };
  },
  computed: {},
  created() {
    this.createInitFileList();
  },
  mounted() {},
  methods: {
    // 处理移除操作
    handleRemove(file, fileList) {
      console.log("handleRemove", file, fileList);
      this.fileList = fileList;
      this.formatImgsStr(fileList);
    },
    // 处理超出个数操作
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },

    // 处理文件上传操作
    async httpRequest(file) {
      this.loading = true;
      const formData = new FormData();
      formData.append("phone_file", file.file);
      formData.append("rm_dup", this.rm_dup);
      formData.append("rm_reply", this.rm_reply);

      // 调用后端服务器的接口
      console.log(1, this.rm_dup);
      console.log(2, this.rm_reply);
      const { result = {} } = await phoneUpload(formData);
      const { path } = result;
      file.file.status = path ? "success" : "error";
      file.file.path = path;
      if (path) {
        this.$message.success("文件" + file.file.name + "上传成功");
      } else {
        this.$message.error("文件" + file.file.name + "上传失败");
      }
      this.loading = false;
    },
    onSuccess(a, file, fileList) {
      fileList.forEach((item) => {
        item.status = item.raw.status;
      });
      this.fileList = fileList;
      this.formatImgsStr(fileList);
    },

    // 格式化数据
    formatImgsStr(fileList) {
      const imgStr = fileList.map((i) => i.raw.path).join(",");
      console.log("imgStr", imgStr);
      this.$emit("input", imgStr);
    },
    // 文件上传前的判断
    beforeUpload(file) {
      const isJPG = file.type.indexOf("text") > -1;
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error("只能上传txt文本格式!");
      }
      if (!isLt20M) {
        this.$message.error("上传大小不能超过 20MB!");
      }
      return isJPG && isLt20M;
    },

    // 打开弹窗时，根据父组件传来的数据
    // 初始化fileList
    createInitFileList() {
      const paths = this.value.split(",").filter((i) => i);
      this.fileList = paths.map((path) => {
        return {
          status: "success",
          uid: getUuid(),
          path,
          raw: {
            status: "success",
            path,
          },
          url: path,
        };
      });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/.el-upload-list--picture-card .el-upload-list__item {
  width: 108px;
  height: 108px;
}

/deep/.el-upload--picture-card {
  width: 108px;
  height: 108px;
  line-height: 114px;
}
.more-than-limit {
  /deep/.el-upload--picture-card {
    opacity: 0;
    pointer-events: none;
  }
}
</style>