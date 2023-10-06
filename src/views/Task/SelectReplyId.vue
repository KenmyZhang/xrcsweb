<template>
  <el-dialog title="选择" :visible.sync="show" width="70%" destroy-on-close>
    <el-table :data="tableData" class="table">
      <el-table-column prop="id" label="ID" width="55" />
      <el-table-column prop="city" label="城市" />
      <el-table-column prop="content" label="内容"> </el-table-column>
      <el-table-column prop="enable" label="状态" width="60px">
        <template slot-scope="scope">
          {{ scope.row.enable ? "开" : "关" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="60" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="selectId(scope.row)">
            选择
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { get, del, update, add } from "@/api/sayHello";

export default {
  data() {
    return {
      tableData: [],
      loading: false,
      show: false,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async open() {
      await this.getList();
      this.show = true;
    },
    close() {
      this.show = false;
    },

    /**
     * 表格数据获取
     */
    async getList() {
      this.loading = true;
      const { data = [] } = await get();
      this.loading = false;
      this.tableData = data;
    },
    selectId(row) {
      this.$emit("handleSelectReplyId", row);
      this.close()
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/* @import url(); 引入css类 */
.table {
  max-height: 60vh;
}
</style>