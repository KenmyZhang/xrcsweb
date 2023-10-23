<template>
  <div class="cell-content">
    <div v-if="type == 0 || type == 1">{{ content }}</div>
    <div v-if="type == 2" class="imgs">
      <audio controls v-for="item in getImgs" :key="item" style="height: 36px">
        <source :src="item" />
      </audio>
    </div>
    <div v-if="type == 3" class="imgs">
      <img class="img" :src="item" alt="" v-for="item in getImgs" :key="item" />
    </div>
    <div v-if="type == 4" class="imgs">
      <video controls v-for="item in getImgs" :key="item" style="width: 200px; max-height: 120px;">
        <source :src="item" />
      </video>
    </div>
    <!-- <div v-if="type == 4" class="imgs">
      <video
        style="height: 40px; width: 160px"
        controls
        v-for="item in getImgs"
        :key="item"
      >
        <source :src="item" />
      </video>
    </div> -->
  </div>
</template>

<script>
// import Test from "@/views/Test"
export default {
  props: {
    content: {
      type: String,
      default: "",
    },
    type: {
      type: Number,
      default: 1,
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    getImgs() {
      const arr = this.content.split(",");
      console.log(778, this.type, arr);
      return arr;
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="stylus" scoped>
.imgs {
  display: flex;
  flex-wrap: wrap;
  .img {
    margin: 0 4px 4px 0;
    width: 48px;
    height: 48px;
  }
}
</style>