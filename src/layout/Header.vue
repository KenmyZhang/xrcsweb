<template>
  <div class="header flex-cb">
    <img
      class="logo pointer"
      src="@/assets/imgs/logo.png"
      alt=""
      @click="goPage('/admin')"
    />

    <el-dropdown @command="handleCommand">
      <div class="flex-c user-box" @click="goPage('/user')">
        <img
          :src="userInfo.avatar"
          alt=""
          class="user-icon"
          v-if="userInfo.avatar"
        />
        <svg
          v-else
          t="1690533657318"
          class="user-icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1600"
          width="128"
          height="128"
        >
          <path
            d="M963.304273 982.126574c0 22.754101-18.255436 41.204869-40.78098 41.204869-22.52655 0-40.781987-18.450768-40.781987-41.204869l-0.358443-3.846217c0-1.630112 0.292997-3.194777 0.456109-4.792669-25.460549-180.860821-178.936705-313.768775-365.828637-315.853989-1.499219 0.03222-2.933999 0.228558-4.433219 0.228558s-2.935006-0.195331-4.400999-0.228558c-184.740265 2.086221-336.750428 132.025942-364.785526 309.757432 0.913225 3.488781 1.596885 7.107447 1.596885 10.888219l0.39167 3.878437c0 23.112544-18.549441 41.858323-41.433427 41.858323-22.852774 0-41.433427-18.744772-41.433427-41.858323l-0.03222-0.390663-0.782333 0c0.097666-1.206222 0.358443-2.380225 0.488329-3.586447 0-3.455554 0.521555-6.714771 1.303888-9.942774C83.710605 801.52653 194.319561 666.695467 344.830505 608.635708c-87.627303-56.721638-144.77283-156.964937-144.77283-271.486563 0-177.112269 136.232617-320.712104 311.551663-320.712104 175.286826 0 311.518436 143.599835 311.518436 320.712104 0 114.488399-57.081088 214.699479-144.676172 271.421117 149.467833 57.60365 259.555234 190.869041 281.984118 355.920096 1.532446 4.335553 2.54233 8.931883 2.54233 13.788991L963.304273 982.126574 963.304273 982.126574 963.304273 982.126574zM751.506574 337.246811c0-133.916832-107.447405-242.472793-239.99591-242.472793-132.548504 0-239.99591 108.588181-239.99591 242.472793 0 133.918845 107.447405 242.4738 239.99591 242.4738C644.025942 579.720611 751.506574 471.165657 751.506574 337.246811L751.506574 337.246811 751.506574 337.246811z"
            p-id="1601"
          ></path>
        </svg>
        <div class="account">{{ userInfo.nickname }}</div>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout" @click="logout"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
// import Test from "@/views/Test"
export default {
  components: {},
  data() {
    return {
      account: "",
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  created() {
    this.account = sessionStorage.getItem("account");
  },
  mounted() {},
  methods: {
    handleCommand(command) {
      if (command == "logout") {
        this.logout();
      }
    },
    goPage(path) {
      const account = sessionStorage.getItem("account");
      if (!account) {
        this.$router.push("/login");
      } else {
        this.$router.push(path);
      }
    },
    logout() {
      // console.log(33);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("account");
      location.href = "/login";
    },
  },
};
</script>
<style lang="stylus" scoped>
.header {
  height: 64px;
  padding: 0 36px;
  border-bottom: 1px solid #ddd;
  .logo {
    width: 48px;
    height: 48px;
  }
  .user-box {
    cursor: pointer;
    .user-icon {
      width: 20px;
      height: 20px;
      fill: #333;
    }
    .account {
      font-size: 14px;
      margin-left: 8px;
    }
    &:hover {
      color: #326ffd;
      .user-icon {
        fill: #326ffd;
      }
    }
  }
}
</style>
