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

export default {
  components: { MenuList, Header },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>
<style lang="stylus" scoped>
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