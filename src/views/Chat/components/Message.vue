<template>
  <div class="item flex" :class="isVisitor(item) ? '' : 'is-right'">
    <img
      class="item-avatar"
      src="https://img0.baidu.com/it/u=3826616503,442714809&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      loading="lazy"
      width="40"
      height="40"
      v-if="isVisitor(item)"
    />
    <div class="item-main">
      <div class="item-create-time">{{ fmtTime(item.created_time) }}</div>
      <div class="pr msg-keyword-box item-content is-text">
        <div>{{ item.content }}</div>
      </div>
    </div>
    <img
      class="item-avatar"
      src="https://img0.baidu.com/it/u=1206126466,1896001011&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      loading="lazy"
      width="40"
      height="40"
      v-if="!isVisitor(item)"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    phone: [String],
  },
  data() {
    return {};
  },
  computed: {
    isVisitor() {
      return (item) => {
        if(item) return item.receiver == this.phone;
        return ''
      };
    },
    fmtTime(){
      return time => {
        return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/.face-icon {
  width: 18px;
  height: 18px;
  margin: 0 1px;
}

.read-status {
  color: #999;
  font-size: 12px;
}

.unread-status {
  color: red;
  font-size: 12px;
}

.item {
  color: #333;
  margin: 24px 0;
  word-break: break-all;
  // height: 100px;
  .item-avatar {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
  .item-main {
    margin-left: 12px;
    margin-right: 64px;
    display: flex;
    flex-direction: column;
    .item-create-time {
      font-size: 12px;
      color: #999;
      margin-bottom: 4px;
    }
    .item-content {
      background: rgb(230, 240, 255);
      border-radius: 4px;
      box-sizing: border-box;
      color: #333;
      width: fit-content;
      // white-space: pre;
      &.is-text {
        padding: 12px;
      }
      .send-img {
        width: 100%;
        max-width: 120px;
        display: block;
      }
      .send-video {
        width: 100%;
        max-width: 300px;
        display: block;
        object-fit: cover;
      }
    }
  }
  &.is-right {
    text-align: right;
    justify-content: flex-end;
    .item-main {
      margin-left: 64px;
      margin-right: 12px;
      .item-content {
        background: rgb(159, 187, 247);
        align-self: end;
        text-align: left;
      }
    }
  }
}

.msg-keyword-box {
  // padding-right: 24px;
  .add-keyword {
    position: absolute;
    bottom: 0px;
    right: 0px;
    z-index: 1;
    cursor: pointer;
    display: none;
  }
  &:hover {
    .add-keyword {
      display: block;
    }
  }
}
</style>