<template>
  <div>
    <el-dialog
      :visible.sync="show"
      width="90%"
      destroy-on-close
    >
      <el-table :data="tableData" v-loading="loading">
        <el-table-column prop="id" label="ID" width="55" align="center" />
        <el-table-column prop="phone" label="phone"  align="center"/>
        <!-- <el-table-column prop="task_id" label="task_id" align="center"/>
        <el-table-column prop="already_send" label="already_send" align="center"/>
        <el-table-column prop="reply_minute" label="reply_minute" align="center"/>
        <el-table-column prop="reply_hour" label="reply_hour" align="center"/>
        <el-table-column prop="reply_yearday" label="reply_yearday" align="center"/>
        <el-table-column prop="trade_minute" label="trade_minute" align="center"/>
        <el-table-column prop="trade_hour" label="trade_hour" align="center"/>
        <el-table-column prop="trade_yearday" label="trade_yearday" align="center"/>
        <el-table-column prop="status" label="status" align="center"/>
        <el-table-column prop="trade_status" label="trade_status" align="center"/>
        <el-table-column prop="valid" label="valid" align="center"/> -->
      </el-table>
      <el-pagination
        class="tr"
        small
        hide-on-single-page
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[6, 10, 20]"
        :page-size="page_num"
        layout="total, prev, pager, next"
        :total="total"
      />
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="show = false">取 消</el-button> -->
        <el-button type="primary" @click="close">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getphones } from "@/api";

export default {
  data() {
    return {
      tableData: [],
      loading: false,
      show: false,

      filename: "",
      page: 1,
      page_num: 6,
      total: 0,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async open({ filename }) {
      this.filename = filename;
      await this.getList();
      this.show = true;
    },
    close() {
      this.show = false;
    },
    handleSizeChange(page_num) {
      this.page_num = page_num;
      this.getList();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getList();
    },
    /**
     * 表格数据获取
     */
    async getList() {
      this.loading = true;
      const { data = [], total } = await getphones({
        page_num: this.page_num,
        page: this.page,
        filename: this.filename
      });
      this.loading = false;
      this.total = total;
      this.tableData = data;
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/* @import url(); 引入css类 */
.w-table {
  // max-height: 60vh;
  // overflow-y: scroll;
}
</style>
