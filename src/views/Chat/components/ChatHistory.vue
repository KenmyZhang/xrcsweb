<template>
  <div class="class">
    手机号：{{row.phone}}
  </div>
</template>

<script>
// import Test from "@/views/Test"
export default {
  components: {},
  data() {
    return {
      row: {}
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    getList(row){
      console.log(78,row);
      this.row = row
    }
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/* @import url(); 引入css类 */
</style>