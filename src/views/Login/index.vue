<template>
  <div class="login-page flex-ccc">
    <div class="logo flex-cc">
      <img src="@/assets/imgs/logo.png" alt="" class="wh100" />
    </div>
    <el-card class="card-box">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="" prop="account">
          <el-input
            v-model="form.account"
            placeholder="请输入卡密"
            @keyup.enter.native="handleLogin"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="w100"
            type="primary"
            @click="handleLogin"
            :loading="loading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from "@/api/login";
import { nomorlRoutes, getAdminRoutes } from "@/router/index";
export default {
  components: {},
  data() {
    return {
      form: {
        account: "",
        // account: "admin", 
      },
      loading: false,
      rules: {
        account: [{ required: true, message: "请输入卡密", trigger: "blur" }],
      },
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async login() {
      this.loading = true;
      const { code, result } = await login({ account: this.form.account });
      this.loading = false;
      if (code != 200) {
        this.$message.error(result || "网络飞到外太空~");
      } else {
        sessionStorage.setItem("userInfo", JSON.stringify(result));
        sessionStorage.setItem("account", this.form.account);
        sessionStorage.setItem("token", result.token);
        this.$store.commit("setUserInfo", result);
        this.$router.push("/");
      }
    },
    handleLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.login();
        } else {
        }
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  .logo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #eee;
    margin-bottom: 48px;
  }
  .card-box {
    padding: 36px 12px 12px 12px;
    box-sizing: border-box;
    width: 50%;
    max-width: 600px;
  }
}
</style>