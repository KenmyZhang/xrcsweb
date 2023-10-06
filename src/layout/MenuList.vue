<template>
  <div class="menu-list">
    <div
      class="menu-item flex-c"
      :class="$route.path.includes(item.path) ? 'menu-item-active' : ''"
      v-for="(item, index) in getList"
      :key="index"
      @click="clickMenuItem(item)"
    >
      <div class="menu-icon-box">
        <div
          class="unread-num"
          v-if="item.path == 'chat' && +totalUnReadMsg > 0"
        >
          {{ totalUnReadMsg }}
        </div>
        <icons :icon="item.meta.icon" />
      </div>
      {{ item.meta.title }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Icons from "./Icons";
import { nomorlRoutes } from "@/router";

export default {
  components: { Icons },
  data() {
    return {};
  },
  computed: {
    ...mapState(["totalUnReadMsg", "mainRouteObj", 'userInfo']),
    getIcon() {
      return (item) => {
        const iconName = item.meta.icon || "default";
        return require(`@/assets/imgs/layout/${iconName}.svg`);
      };
    },
    getList() {
      let list = nomorlRoutes.children.filter((i) => !i.meta.hiddenMenu);
       if(this.userInfo.role_id == 'ops'){ 
        return list.filter(i=> ['customer', 'configFile'].includes(i.path))
       } else if (this.userInfo.role_id == 'admin'){
        return list.filter(i => i.meta.showSuperAdmin)
      }else{
        list = list.filter(i=>!['customer', 'adminQrcode', 'tabInfo', 'domain', 'configFile'].includes(i.path))
        return list
      }
    },
  },
  created() {
  },
  mounted() {},
  methods: {
    clickMenuItem(item) {
      this.$router.push(item.path);
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
.menu-list {
  height: 100%;
  background: #fff;
  flex: 0 0 160px;
  // padding-right: 12px;
  box-sizing: border-box;
  overflow: scroll;
  padding: 4px;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
  .menu-item {
    width: 100%;
    padding: 16px 12px;
    box-sizing: border-box;
    background: #fff;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 14px;
    color: #555;
    .menu-icon-box {
      width: 20px;
      height: 20px;
      position: relative;
      margin-right: 10px;
      svg {
        width: 100%;
        height: 100%;
        fill: #666;
      }
      .unread-num {
        position: absolute;
        top: -6px;
        left: -10px;
        z-index: 1;
        color: #fff;
        font-size: 12px;
        border-radius: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0px 4px;
        background: rgb(247, 120, 120);
      }
    }
    &.menu-item-active,
    &:hover {
      background: #e1eaff;
      color: #326ffd;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      svg {
        fill: #326ffd;
      }
    }
  }
}
</style>