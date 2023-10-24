<template>
  <div class="public-page">
    <div class="flex-c" style="margin-bottom: 12px">
      <el-select
        v-model="status"
        placeholder="请选择"
        size="small"
        style="margin-right: 12px"
      >
        <el-option label="全部" :value="-1"></el-option>
        <el-option label="未使用" :value="0"></el-option>
        <el-option label="已使用" :value="1"></el-option>
      </el-select>
      <el-button @click="getList" type="primary" size="small">查询</el-button>
      <el-button @click="onAdd" size="small">新增</el-button>
    </div>

    <el-table :data="tableData" class="table" :loading="loading">
      <el-table-column prop="id" label="ID" width="55" />
      <el-table-column prop="account" label="账号" align="center" />
      <el-table-column
        prop="assigned_filter_count"
        label="领取筛选号码数量"
        align="center"
      />
      <el-table-column
        prop="filter_count"
        label="已筛选号码数量"
        align="center"
      />
      <el-table-column
        prop="assigned_send_count"
        label="领取发送号码数量"
        align="center"
      />
      <el-table-column
        prop="send_count"
        label="已发送号码数量"
        align="center"
      />
      <el-table-column
        prop="stop_num"
        label="发送多少数量后暂停"
        align="center"
      />
      <el-table-column prop="stop_interval" label="暂停秒数" align="center" />
      <el-table-column
        prop="double_check_num"
        label="双钩数量"
        align="center"
      />
      <el-table-column
        prop="double_check_interval"
        label="待检查双钩秒数"
        align="center"
      />
      <el-table-column prop="check_phone" label="检测手机号" align="center" />
      <el-table-column prop="remark" label="备注" align="center" />
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

      <el-table-column label="操作" width="130" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == 0"
            size="mini"
            type="text"
            @click="clickUse(scope.row)"
            >使用</el-button
          >
          <el-button
            style="margin:0 8px; "
            type="text"
            size="mini"
            @click="$refs.updateRef.open(scope.row)"
          >
            编辑
          </el-button>
          <el-popconfirm title="确定删除吗？" @confirm="hanldeDel(scope.row)">
            <el-button size="mini" type="text" slot="reference">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="tr"
      hide-on-single-page
      :current-page.sync="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="page_num"
      layout="sizes, prev, pager, next"
      :total="total"
    />
    <Update ref="updateRef" @confirm="getList" />
  </div>
</template>

<script>
import {
  deviceAccounts,
  useDeviceAccount,
  addDeviceAccount,
  delDeviceAccount,
} from "@/api";
import Update from "./Update";

export default {
  components: { Update },
  data() {
    return {
      form: {},
      status: -1,
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
     * 单删除
     */
    async hanldeDel(row) {
      const params = { id: row.id };
      const { code } = await delDeviceAccount(params);
      if (code == 200) {
        this.$message.success("操作成功");
      } else {
        this.$message.error("操作失败");
      }
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
        status: this.status,
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
      this.$prompt("请输入创建设备账号数量", "提示", {
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
      const isnum = this.isNumber(value);
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
<style lang="stylus" scoped>
.button {
  margin-right: 12px;
}
</style>
