<template>
  <div :class="limit <= fileList.length ? 'more-than-limit' : '' ">
    <el-upload
      action="#"
      ref="upload"
      multiple
      :limit="limit"
      list-type="picture-card"
      :file-list="fileList"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :http-request="httpRequest"
      :on-success="onSuccess"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
import { upload } from "@/api/upload";
import { getUuid } from "@/utils/index";

export default {
  components: {},
  props: {
    limit: {
      type: Number,
      default: 9,
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
      // console.log("handleRemove", file, fileList);
      this.fileList = fileList
      this.formatImgsStr(fileList)
    },
    // 处理超出图片个数操作
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },

    // 处理文件上传操作
    async httpRequest(file) {
      this.loading = true;
      const formData = new FormData();
      formData.append("imgfile", file.file);

      // 调用后端服务器的接口
      const { result = {} } = await upload(formData);
      const { path } = result;
      file.file.status = path ? "success" : "error";
      file.file.path = path;
      if (path) {
        this.$message.success("图片" + file.file.name + "上传成功");
      } else {
        this.$message.error("图片" + file.file.name + "上传失败");
      }
      this.loading = false;
    },
    onSuccess(a, file, fileList) {
      fileList.forEach((item) => {
        item.status = item.raw.status;
      });
      this.fileList = fileList
      this.formatImgsStr(fileList);
    },

    // 格式化数据
    formatImgsStr(fileList) {
      const imgStr = fileList.map((i) => i.raw.path).join(",");
      // console.log("imgStr", imgStr);
      this.$emit("input", imgStr);
    },
    // 图片上传前的判断
    beforeUpload(file) {
      const isJPG = ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(file.type);
      const isLt20M = file.size / 1024 / 1024 < 20;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
      }
      if (!isLt20M) {
        this.$message.error("上传图片大小不能超过 20MB!");
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
<style lang="stylus" scoped>
/deep/.el-upload-list--picture-card .el-upload-list__item{
  width: 108px;
  height: 108px;
}

/deep/.el-upload--picture-card{
  width: 108px;
  height: 108px;
  line-height: 114px;
}
.more-than-limit{
  /deep/.el-upload--picture-card{
    opacity: 0;
    pointer-events: none;
  }
}
</style>
