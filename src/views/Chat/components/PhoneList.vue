<template>
  <div class="phone-list-component">
    <el-input
      size="small"
      v-model.trim="phone"
      placeholder="请输入电话号码后按enter键"
      style="margin: 0 0 12px 0"
      @keyup.enter.native="getList"
    ></el-input>
    <el-input
      size="small"
      v-model.trim="filename"
      placeholder="请输入文件名称后按enter键"
      @keyup.enter.native="getList"
    ></el-input>
    <div class="flex-cb" style="margin-top: 12px;">
      <el-radio-group v-model="already_reply" @input="getList">
        <el-radio :label="true">已回复</el-radio>
        <el-radio :label="false">未回复</el-radio>
      </el-radio-group>
      <el-button size="small" @click="getList">查询</el-button>
    </div>
    <el-table :data="tableData" class="table" @row-click="handleClickRow">
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="filename" label="文件名" />
      <el-table-column label="状态" width="60px">
        <template slot-scope="scope">
          {{ ["离线", "在线"][scope.row.status] }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="upload_time" label="上传日期">
        <template slot-scope="scope">
          {{ getTime(scope.row.upload_time) }}
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      class="tr"
      small
      hide-on-single-page
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[10, 20, 50]"
      :page-size="page_num"
      layout="total, prev, pager, next"
      :total="total"
    />
  </div>
</template>

<script>
import { phoneList } from "@/api";
export default {
  components: {},
  data() {
    return {
      already_reply: false,
      filename: "",
      phone: "",
      tableData: [],
      page: 1,
      page_num: 10,
      total: 0,
    };
  },
  computed: {},
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    handleSizeChange(page_num) {
      this.page_num = page_num;
      this.getList();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getList();
    },
    async getList() {
      const { data = [], total } = await phoneList({
        already_reply: this.already_reply,
        phone: this.phone,
        filename: this.filename,
        page: this.page,
        page_num: this.page_num,
      });
      this.tableData = data;
      console.log(12, this.tableData);
      this.total = total;
    },
    handleClickRow(row) {
      this.$emit("handleClickRow", row);
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.phone-list-component {
  padding: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  .table{
    flex: 1;
  }
}
</style>