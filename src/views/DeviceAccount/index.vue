<template>
  <div class="public-page">
    <div class="flex-c" style="margin-bottom: 12px">
      <!-- @click="$refs.update.open({})" -->
      <el-button @click="onAdd" class="button" type="primary" size="small"
        >新增</el-button
      >
    </div>

    <el-table :data="tableData" class="table" :loading="loading">
      <el-table-column prop="id" label="ID" width="55" />
      <el-table-column prop="account" label="账号" align="center" />
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.status == 0" size="small"
            >未使用</el-tag
          >
          <el-tag type="success" v-if="scope.row.status == 1" size="small"
            >已使用</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column label="操作" width="50" align="center" fixed="right">
        <template slot-scope="scope">
          <div class="flex-cb">
            <el-button
              v-if="scope.row.status == 0"
              size="mini"
              type="text"
              @click="clickUse(scope.row)"
              >使用</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="tr"
      hide-on-single-page
      :current-page.sync="page_num"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="page"
      layout="sizes, prev, pager, next"
      :total="total"
    />
  </div>
</template>

<script>
import { deviceAccounts, useDeviceAccount, addDeviceAccount } from "@/api";
import dayjs from "dayjs";

export default {
  data() {
    return {
      tableData: [],
      loading: false,
      page_num: 10,
      page: 1,
      total: 0,
    };
  },
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
    /**
     * 表格数据获取
     */
    async getList() {
      this.loading = true;
      const { data = [], total } = await deviceAccounts({
        page: this.page,
        page_num: this.page_num,
      });
      this.loading = false;
      this.tableData = data;
      this.total = total;
    },
    async clickUse(row) {
      const { code, msg } = await useDeviceAccount({ id: row.id });
      if (code == 200) {
        this.$message.success("操作成功");
        this.getList();
      } else {
        this.$message.error("操作失败~");
      }
    },
    onAdd() {
      this.$prompt('请输入创建设备账号数量', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal: false,
      })
        .then(({ value }) => {
          this.handleAdd(value);
        })
        .catch(() => {});
    },

    isNumber(val) {
      var regPos = /^\d+(\.\d+)?$/; //非负浮点数
      var regNeg =
        /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if (regPos.test(val) || regNeg.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    async handleAdd(value) {
      console.log(11, value);
      const isnum = this.isNumber(value);
      console.log(112, isnum);
      if (isnum) {
        const { code } = await addDeviceAccount({ count: +value });
        if (code == 200) {
          this.$message.success("操作成功");
          this.getList();
        } else {
          this.$message.error("操作失败~");
        }
      } else {
        this.$message.error("请输入正整数~");
      }
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.button {
  margin-right: 12px;
}
</style>