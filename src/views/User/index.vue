<template>
  <div>
    <Header></Header>
    <div class="page flex-ccc">
      <div class="flex1">
        <div class="flex-c pointer">
          <img width="100" :src="userInfo.avator" alt="avatar" class="avatar" />
        </div>
        <div class="time">卡密: {{ userInfo.name }}</div>
        <div class="time">昵称: {{ userInfo.nickname }}</div>
        <div class="time">创建时间: {{ getTime(userInfo.created_time) }}</div>
      </div>
      <div class="flex-c">
        <el-button @click="goBack" type="primary">返回</el-button>
        <el-button @click="$refs.updateRef.open(userInfo)">修改</el-button>
      </div>
    </div>
    <Update ref="updateRef" @confirm="getUserInfo" />
  </div>
</template>

<script>
import Header from "@/layout/Header";
import Update from "./Update";
import { customerUpdate, customerDetail } from "@/api/user";
import dayjs from "dayjs";

export default {
  components: { Header, Update },
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    this.getUserInfo();
  },
  computed: {
    getTime() {
      return (time) => dayjs(time).format("YYYY-MM-DD, HH:mm");
    },
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    async getUserInfo() {
      const { code, data } = await customerDetail();
      if (code == 200) {
        this.userInfo = data;
        const locUser = sessionStorage.getItem("userInfo");
        const info = JSON.parse(locUser);
        info.avatar = this.userInfo.avator;
        info.nickname = this.userInfo.nickname;
        sessionStorage.setItem("userInfo", JSON.stringify(info));
        this.$store.commit("setUserInfo", info);
      } else {
        this.$message.error("获取信息失败");
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.page {
  padding: 48px 24px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 500;
  height: 80vh;
  .avatar {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    margin-right: 24px;
  }
  .time {
    margin-top: 24px;
    font-weight: 400;
  }
}
</style>
