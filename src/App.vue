<template>
  <div id="app">
    <!-- <keep-alive> -->
    <router-view />
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: "App",
  created() {},
  mounted() {
    const userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
      this.$store.commit("setUserInfo", JSON.parse(userInfo));
    } else {
      this.$router.replace("/login");
    }
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
.public-page {
  padding: 12px;
  box-sizing: border-box;
  font-size: 14px;
  flex: 1;
  height: 100%;
  overflow-x: hidden;
  // overflow: scroll;
  background: #fff;
  border-radius: 8px;

  .table {
    width: 100%;
    margin-top: 24px;
    min-height: 300px;
    overflow: scroll;
    .cell-content {
      max-width: 400px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}

.pointer {
  cursor: pointer;
}
.w100 {
  width: 100%;
}

.h100 {
  height: 100%;
}
.wh100 {
  width: 100%;
  height: 100%;
}

.flex1 {
  flex: 1;
}
.flex {
  display: flex;
}

// 常用flex样式
.flex-c {
  display: flex;
  align-items: center;
}

// 常用flex样式
.flex-cc {
  display: flex;
  align-items: center;
  justify-content: center;
}

// 常用flex样式
.flex-cb {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex-ccc {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

::-webkit-scrollbar {
  width: 6px;
  height: 8px;
  background-color: #fff;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #cbcbcb;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #999;
}

.no-data {
  margin-top: 12px;
  font-size: 12px;
  color: #999;
}
.pr{
  position: relative;
}
.tr{
  text-align: right;
}
.tc{
  text-align: center;
}
</style>

