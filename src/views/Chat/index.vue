<template>
  <div class="public-page flex">
    <div class="list-left">
      <phone-list @handleClickRow="handleClickRow" />
    </div>
    <div class="chat-right flex1">
      <template v-if="row.id">
        <div class="chat-right-top">
          <chat-history ref="chatHistoryRef" />
        </div>
        <div class="chat-right-bottom">
          <el-input
            placeholder="请输入内容"
            v-model="content"
            class="input-with-select"
            @keyup.enter.native="onSendMsg"
          >
            <el-button
              slot="append"
              type="primary"
              icon="el-icon-plus"
              @click="onSendMsg"
              >发送</el-button
            >
          </el-input>
        </div>
      </template>
      <div class="flex-ccc wh100" v-else>- 请点选左侧用户 -</div>
    </div>
  </div>
</template>

<script>
import PhoneList from "./components/PhoneList";
import ChatHistory from "./components/ChatHistory";
import { sendMsg } from "@/api";

export default {
  components: { PhoneList, ChatHistory },
  data() {
    return {
      row: {}, // 选中的人的信息
      content: "",
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 点击左边的手机号，选择用户
    handleClickRow(row) {
      this.row = row;
      console.log(223, row);
      this.$nextTick(() => {
        this.$refs.chatHistoryRef.getList(row, true);
      });
    },

    // 发送消息
    async onSendMsg() {
      const { code, msg } = await sendMsg({
        receiver: this.row.phone,
        content: this.content,
      });
      if (code !== 200) {
        this.$message.error(msg || "请求出错~");
      } else {
        this.$refs.chatHistoryRef.getList(this.row, true);
        this.content = ''
      }
      console.log(this.content);
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/* @import url(); 引入css类 */
.public-page {
  background: #f9f9f9;
  padding: 0;
  /deep/.el-input-group__append button.el-button {
    background: #326ffd;
    color: #fff;
  }
  .list-left {
    background: #fff;
    width: 360px;
    margin-right: 12px;
    border-radius: 12px;
  }
  .chat-right {
    height: 100%;
    display: flex;
    flex-direction: column;
    .chat-right-top {
      background: #fff;
      flex: 1;
      border-radius: 12px;
      margin-bottom: 12px;
    }
    .chat-right-bottom {
      background: #fff;
      border-radius: 12px;
      padding: 4px;
      // height: 200px;
      box-sizing: border-box;
    }
  }
}
</style>