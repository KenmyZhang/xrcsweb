<template>
  <div :class="limit <= fileList.length ? 'more-than-limit' : ''">
    <el-upload
      action="#"
      ref="upload"
      multiple
      :limit="1"
      :file-list="fileList"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :http-request="httpRequest"
      :on-remove="onRemove"
      :on-success="onSuccess"
    >
      <div
        class="flex-cc"
        style="width: 20px; height: 20px; margin-right: 12px"
        v-if="loading"
      >
        <i class="el-icon-loading"></i>
      </div>
      <template v-else>
        <div v-if="fileList.length == 0" class="video-btn-box flex-cc">
          <Icon imgType="video" />
        </div>
        <!-- <div v-else>音频已成功上传：</div> -->
      </template>
    </el-upload>
  </div>
</template>

<script>
import { uploadFile } from "@/api/upload";
import Icon from "@/components/Icon";

export default {
  components: { Icon },
  props: {
    limit: {
      type: Number,
      default: 1,
    },
    info: {
      type: Object,
      default: () => {},
    },
    robotInfo: {
      type: Object,
      default: null,
    },
    value: {
      type: String,
      default: "",
    },
    isAddressBookPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      fileList: [], //深拷贝，判断重名及第一步时的文件信息展示
    };
  },
  computed: {
    infoObj() {
      return this.info || {};
    },
  },
  created() {},
  mounted() {
    if (this.value) {
      this.fileList = [
        {
          name: "音频名称.mp4",
          raw: { path: this.value },
        },
      ];
    }
  },
  methods: {
    // 处理超出音频个数操作
    handleExceed(files, fileList) {
      this.fileList = [];
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    onRemove() {
      this.fileList = [];
      this.$emit("input", "");
    },
    // 处理文件上传操作
    async httpRequest(file) {
      this.loading = true;
      const formData = new FormData();
      formData.append("realfile", file.file);

      // 调用后端服务器的接口
      const { result = {} } = await uploadFile(formData);
      const { path } = result;
      file.file.status = path ? "success" : "error";
      file.file.path = path;
      if (path) {
        // this.$message.success("音频" + file.file.name + "上传成功");
      } else {
        this.$message.error("音频" + file.file.name + "上传失败");
      }
      this.loading = false;
    },
    onSuccess(a, file, fileList) {
      fileList.forEach((item) => {
        item.status = item.raw.status;
      });
      this.fileList = fileList;
      let videoStr = fileList[0].raw.path;
      // const videoStr = fileList[0].row.path;
      this.$emit("input", videoStr);
    },

    // 音频上传前的判断
    beforeUpload(file) {
      console.log(14, file.type);
      const isVideo = [
        "video/mp4",
        "video/ogg",
        "video/flv",
        "video/avi",
        "video/wmv",
        "video/rmvb",
        "video/mov",
        "audio/wav",
        "audio/ogg",
        "audio/amr",
        "audio/mpeg",
      ].includes(file.type);
      const isLt20M = file.size / 1024 / 1024 < 1000;

      if (!isVideo) {
        this.$message.error("上传格式错误!" +file.type);
      }
      if (!isLt20M) {
        this.$message.error("上传音频大小不能超过 1000MB!");
      }
      return isVideo && isLt20M;
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/.el-upload-list__item {
  width: 240px;
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
.video-btn-box {
  width: 108px;
  height: 108px;
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  padding-left: 16px;
  padding-top: 8px;
  box-sizing: border-box;
}
</style>