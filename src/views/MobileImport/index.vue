<template>
  <div class="public-page">
    <div style="margin: 12px 0 16px 0">
      <el-checkbox v-model="rm_dup">去掉重复</el-checkbox>
      <el-checkbox v-model="rm_reply">去掉已回复</el-checkbox>
    </div>
    <div class="upload-box">
      <UploadFile :rm_dup="rm_dup" :rm_reply="rm_reply"/>
    </div>
  </div>
</template>

<script>
import UploadFile from "@/components/UploadFile";
export default {
  components: { UploadFile },
  data() {
    return {
      rm_dup: false,
      rm_reply: false,
      phone_file: false,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="stylus" scoped>
.upload-box {
  width: 50%;
  min-width: 300px;
  max-width: 600px;
}
</style>