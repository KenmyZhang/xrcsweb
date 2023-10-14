<template>
  <div>
    <el-dialog
      :visible.sync="show"
      width="70%"
      destroy-on-close
      title="电话列表"
    >
      <el-table :data="tableData" v-loading="loading">
        <el-table-column prop="phone" label="手机号" align="center" />
        <el-table-column prop="already_send" label="已发送" align="center">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.already_send == 0" size="small"
              >未发送</el-tag
            >
            <el-tag
              type="success"
              v-if="scope.row.already_send == 1"
              size="small"
              >已发送</el-tag
            >
          </template>
        </el-table-column>
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
import { taskphoneslist } from "@/api";
import dayjs from "dayjs";

export default {
  data() {
    return {
      tableData: [],
      loading: false,
      show: false,

      task_id: "",
      account: "",
      page: 1,
      page_num: 6,
      total: 0,
    };
  },
  computed: {
    getTime() {
      return (num) => (num ? dayjs(num).format("YYYY-MM-DD, HH:mm") : "-/-");
    },
  },
  created() {},
  mounted() {},
  methods: {
    async open({ task_id, account }) {
      this.task_id = task_id;
      this.account = account;
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
      const { data = [], total } = await taskphoneslist({
        page_num: this.page_num,
        page: this.page,
        task_id: this.task_id,
        account: this.account,
      });
      this.loading = false;
      this.total = total;
      this.tableData = data;
    },
  },
};
</script>
<style lang="stylus" scoped>
/* @import url(); 引入css类 */
.w-table {
  // max-height: 60vh;
  // overflow-y: scroll;
}
</style>
