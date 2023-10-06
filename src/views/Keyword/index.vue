<template>
  <div>
    <el-dialog
      title="密码验证"
      :visible.sync="show"
      width="70%"
      destroy-on-close
      :modal-append-to-body="true"
    >
      <div style="padding: 0 36px 0 0">
        <el-form ref="form" label-width="80px">
          <el-form-item label="密码" prop="content">
            <el-input placeholder="请输入密码" v-model="passwd"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSubmit" :disabled="!passwd"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <List ref="listRef" />
    <Add ref="addRef" />
  </div>
</template>

<script>
import {
  keywordList,
  keywordDel,
  validPasswd,
  keywordHasPasswd,
  keywordUpdate,
  keywordAdd,
  keywordCheck,
} from "@/api/keyword";
import List from "./List";
import Add from "./Add";

export default {
  components: { List, Add },
  data() {
    return {
      show: false,
      keyword: "",
      passwd: "",
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async open({ keyword }) {
      const has_passwd = await this.checkHasPassword();
      if (!has_passwd) {
        this.$message.warning("无权限~");
        return;
      }
      this.passwd = "";
      this.keyword = keyword;
      this.show = true;
    },
    close() {
      this.show = false;
    },
    async checkHasPassword() {
      const { code, has_passwd } = await keywordHasPasswd();
      if (code == 200) {
        return has_passwd;
      } else {
        this.$message.error("请求出错~");
      }
    },
    // 校验密码
    async handleSubmit() {
      const { code, result } = await validPasswd({ passwd: this.passwd });
      if (code == 200) {
        // 检查关键词是否已经加入了
        // {"code":200,"exist":true,"result":"ok"}
        const { code, exist } = await keywordCheck({ keyword: this.keyword });
        if (code == 200) {
          this.close();
          if (exist) {
            this.$refs.listRef.open(this.keyword);
          } else {
            this.$confirm("请选择具体业务", "提示", {
              confirmButtonText: "复用",
              cancelButtonText: "新增",
              type: "warning",
            })
              .then(() => {
                // 复用
                this.$refs.listRef.open(this.keyword, "复用");
              })
              .catch(() => {
                // 新增
                this.$refs.addRef.open({keyword:this.keyword});
              });
          }
        } else {
          this.$message.error("关键词重复检验出错~");
        }
      } else {
        this.$message.error(result || "校验密码出错~");
      }
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/* @import url(); 引入css类 */
</style>