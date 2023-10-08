<template>
  <div class="public-page">
    <el-form :inline="true" :model="formValues" size="small">
      <el-form-item label="任务领取账号" prop="account">
        <el-input v-model="formValues.account" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="文件名" prop="filename">
        <!-- <el-input v-model="formValues.filename" placeholder="请输入"></el-input> -->
        <el-select
          class="w100"
          v-model="formValues.filename"
          placeholder="请选择文件名"
          clearable
        >
          <el-option
            :label="item"
            :value="item"
            v-for="item in taskList"
            :key="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formValues.status" placeholder="活动区域" clearable>
          <el-option label="未启动" :value="0"></el-option>
          <el-option label="已启动" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务创建时间" prop="created_time">
        <el-date-picker
          v-model="formValues.created_time"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" class="table">
      <el-table-column prop="id" label="ID" width="55" />
      <el-table-column prop="account" label="账户" />
      <el-table-column prop="filename" label="文件名" />
      <el-table-column prop="app_key" label="app_key" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag
            type="warning"
            size="small"
            v-if="scope.row.status === null || scope.row.status === undefined"
            >未知</el-tag
          >
          <el-tag type="info" v-if="scope.row.status == 0" size="small"
            >未启动</el-tag
          >
          <el-tag type="success" v-if="scope.row.status == 1" size="small"
            >已启动</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="handle_status" label="处理状态">
        <template slot-scope="scope">
          {{
            scope.row.handle_status === null ||
            scope.row.handle_status === undefined
              ? "未知"
              : ["未处理", "处理中", "处理完成"][scope.row.handle_status]
          }}
        </template>
      </el-table-column>

      <el-table-column prop="created_time" label="创建日期" width="180px">
        <template slot-scope="scope">
          {{ getTime(scope.row.created_time) }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="tr"
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
import { filterTasks, phoneUploadhistory } from "@/api";
import dayjs from "dayjs";

export default {
  data() {
    return {
      page: 1,
      page_num: 10,
      total: 0,
      taskList: [],
      formValues: {
        account: "",
        filename: "",
        status: "",
        created_time: "",
      },
      tableData: [],
      loading: false,
      // multipleSelection: [],
    };
  },
  computed: {
    getTime() {
      return (num) => (num ? dayjs(num).format("YYYY-MM-DD HH:mm:ss") : "-/-");
    },
  },
  created() {
    this.getList();
    this.getTaskList();
  },
  mounted() {},
  methods: {
    async getTaskList() {
      const { data = [] } = await phoneUploadhistory({
        page: 1,
        page_num: 1000000,
      });
      // this.taskList = data || [];
      const taskList = [];
      data.forEach((v) => {
        if (!taskList.includes(v.filename)) {
          taskList.push(v.filename);
        }
      });
      this.taskList = taskList;
    },
    handleAdd() {
      this.$refs.modifyRef.open({});
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
      const { data = [], total } = await filterTasks({
        page: this.page,
        page_num: this.page_num,
        status: this.formValues.status,
        filename: this.formValues.filename,
        account: this.formValues.account,
        created_time: this.formValues.created_time,
      });
      this.loading = false;
      this.total = total;
      this.tableData = data;
    },
    /**
     * 单删除
     */
    // async hanldeDel(row) {
    //   const params = { ids: [row.id] };
    //   this.delApi(params);
    // },
    /**
     * 多删除
     */
    // async handelBatchDel() {
    //   const params = { ids: this.multipleSelection.map((i) => i.id) };
    //   this.delApi(params);
    // },
    /**
     * 删除接口触发
     */
    // async delApi(params) {
    //   await del(params);
    //   this.$message.success("删除成功");
    //   this.getList();
    // },
    /**
     * 更新
     */
    // async handleUpdate(e, row) {
    //   const { code } = await update({ ...row, enable: e });
    //   if (code == 200) {
    //     this.$message.success("更新成功");
    //   } else {
    //     this.$message.error("更新失败");
    //   }
    //   this.getList();
    // },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.public-page {
  display: flex;
  flex-direction: column;
  .table {
    flex: 1;
  }
}
</style>