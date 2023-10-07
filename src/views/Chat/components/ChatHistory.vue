<template>
  <div class="msgs-box wh100">
    <div class="flex-cc">
      <div style="margin-right: 24px">手机号：{{ row.phone }}</div>
      <el-button @click="getList(row, true)" size="mini">刷新记录</el-button>
    </div>

    <div class="list flex1" id="scrollElement">
      <div
        class="flex-cc"
        style="color: #666; font-size: 12px; margin-top: 20px"
        v-if="total <= list.length && list.length > 10"
      >
        - 我是有底线的 -
      </div>
      <template v-if="total">
        <Message
          :item="item"
          :phone="row.phone"
          v-for="(item, index) in list"
          :key="index"
        />
      </template>
      <div id="lineqq"></div>
      <div
        class="flex-cc"
        style="color: #666; font-size: 12px; margin-top: 50%"
        v-if="total == 0"
      >
        - 暂无聊天记录 -
      </div>
    </div>
  </div>
</template>

<script>
import { msgList } from "@/api";
import Message from "./Message";
export default {
  components: { Message },
  data() {
    return {
      row: {},
      list: [],
      page: 1,
      page_num: 10,
      total: 0,
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      const dom = document.getElementById("scrollElement");
      dom.addEventListener("scroll", () => {
        const scrollTop = dom.scrollTop;
        if (scrollTop < 10) {
          console.log("竖向滚动条已经滚动到顶部");
          this.getList(this.row);
        }
      });
    });
  },

  methods: {
    async getList(row, needInit) {
      this.row = row;
      if (this.list.length > this.total) return;

      if (needInit) {
        this.page = 1;
      }
      const { data = [], total } = await msgList({
        phone: this.row.phone,
        page: this.page,
        page_num: this.page_num,
      });
      this.total = total || 0;
      if (needInit) {
        this.list = [];
      }
      if (this.total > this.list.length) {
        this.page++;
        // if(data[2])  data[2].receiver='998'
        let arr = data.reverse();
        this.list = [...arr, ...this.list];
      }
      this.$nextTick(() => {
        if (this.page == 2) {
          const lineqq = document.getElementById("lineqq");
          // 滚动到底部
          document.getElementById("scrollElement").scrollTo({
            top: lineqq.offsetTop, //需要父元素设置postion(relative、absolute、fixed)
          });
        }
      });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.msgs-box {
  padding: 12px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: calc(100vh - 150px);
  overflow: hidden;
  .list {
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>