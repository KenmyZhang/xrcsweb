<template>
  <div>
    <el-dialog
      :visible.sync="show"
      width="90%"
      destroy-on-close
      title="成员信息列表"
    >
      <el-table :data="tableData" v-loading="loading">
        <el-table-column prop="id" label="ID" width="55" align="center" />
        <el-table-column prop="task_id" label="任务ID" align="center" />
        <el-table-column prop="account" label="账号" align="center" />
        <el-table-column prop="count" label="数量" align="center" />
        <el-table-column prop="create_time" label="创建时间">
          <template slot-scope="scope">
            {{ getTime(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="50" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="$refs.showMemberPhomeRef.open(scope.row)"
              >电话</el-button
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
    <ShowMemberPhome ref="showMemberPhomeRef" />
  </div>
</template>

<script>
import { taskmember } from "@/api";
import dayjs from "dayjs";
import ShowMemberPhome from "./ShowMemberPhome.vue";

export default {
  components: { ShowMemberPhome },
  data() {
    return {
      tableData: [],
      loading: false,
      show: false,

      task_id: "",
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
    async open({ id }) {
      this.task_id = id;
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
      const { data = [], total } = await taskmember({
        page_num: this.page_num,
        page: this.page,
        task_id: this.task_id,
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
