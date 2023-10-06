<template>
  <div class="layout">
    <Header />
    <div class="main">
      <menu-list></menu-list>
      <div class="wrap">
        <!-- <keep-alive> -->
        <router-view />
        <!-- </keep-alive> -->
      </div>
    </div>
  </div>
</template>

<script>
import MenuList from "@/layout/MenuList";
import Header from "@/layout/Header";
import { getSocketStatus } from "@/assets/js/websocket.js";


export default {
  components: { MenuList, Header },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {
    window.addEventListener("online", this.onlineFun);
    window.addEventListener("offline", this.offlineFun);
  },
  beforeDestroy() {
    window.removeEventListener("online", this.onlineFun);
    window.removeEventListener("offline", this.offlineFun);
  },
  methods: {
    onlineFun() {
      console.log("网络已连接");
      const socketStatus = getSocketStatus();
      const { path } = this.$route;
      if (!socketStatus && ["/addressBook", "/chat"].includes(path)) {
        window.location.reload();
      }
    },
    offlineFun() {
      console.log("网络已断开");
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  .main {
    flex: 1;
    display: flex;
    width: 100%;
    overflow: hidden;
    .wrap {
      flex: 1;
      overflow: hidden;
      padding: 12px;
      background: #f9f9f9;
    }
  }
}
</style>