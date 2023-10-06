<template>
  <div class="public-page flex">
    <div class="list-left">
      <phone-list @handleClickRow='handleClickRow'/>
    </div>
    <div class="chat-right flex1">
      <div class="chat-right-top">
        <chat-history ref="chatHistoryRef" />
      </div>
      <div class="chat-right-bottom">bottom</div>
    </div>
  </div>
</template>

<script>
import PhoneList from "./components/PhoneList";
import ChatHistory from "./components/ChatHistory";
export default {
  components: { PhoneList, ChatHistory },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleClickRow(row){
      this.$refs.chatHistoryRef.getList(row)
    }
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/* @import url(); 引入css类 */
.public-page {
  background: #f9f9f9;
  padding: 0;
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
      height: 300px;
    }
  }
}
</style>