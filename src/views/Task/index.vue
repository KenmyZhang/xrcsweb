<template>
  <div class="public-page">
    <el-form :inline="true" :model="formValues" size="small">
      <el-form-item label="状态">
        <el-select v-model="formValues.status" placeholder="活动区域" clearable>
          <el-option label="未启动" :value="0"></el-option>
          <el-option label="已启动" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleAdd">新建</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" class="table">
      <el-table-column prop="id" label="ID" width="55" />
      <el-table-column prop="app_key" label="秘钥" width="160px">
        <template slot-scope="scope">
          <div
            class="flex-cb"
            style="flex-wrap: no-wrap"
            v-if="scope.row.app_key"
          >
            {{ scope.row.app_key }}
            <el-button size="mini" @click="onCopy(scope.row.app_key)"
              >复制</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="filename" label="文件名" />
      <el-table-column prop="reply_id" label="回复规则id" />
      <el-table-column prop="reply_content" label="回复内容" />
      <el-table-column prop="interval" label="消息延迟" />
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

      <el-table-column label="操作" width="140" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="$refs.showMemberRef.open(scope.row)">成员信息</el-button>
          <el-button type="text" @click="startTask(scope.row)">开启</el-button>
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
    <modify ref="modifyRef" @conform="getList" />
    <ShowMember ref="showMemberRef" @conform="getList" />
  </div>
</template>

<script>
import Modify from "./Modify.vue";
import ShowMember from "./ShowMember.vue";
import { phoneTaskStart, phoneTaskList } from "@/api";
import dayjs from "dayjs";

export default {
  components: { Modify, ShowMember },
  data() {
    return {
      page: 1,
      page_num: 10,
      total: 0,
      formValues: {
        status: "",
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
  },
  mounted() {},
  methods: {
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
    onCopy(text) {
      console.log(text);
      //创建input标签
      var input = document.createElement("input");
      //将input的值设置为需要复制的内容
      input.value = text;
      //添加input标签
      document.body.appendChild(input);
      //选中input标签
      input.select();
      //执行复制
      document.execCommand("copy");
      //成功提示信息
      this.$message.success("success!");
      //移除input标签
      document.body.removeChild(input);
      this.$message.success('复制成功')
    },
    async startTask(row) {
      const { code } = await phoneTaskStart({ id: row.id });
      if (code == 200) {
        this.$message.success("开启成功");
        this.getList();
      } else {
        this.$message.success("开启失败");
      }
    },
    /**
     * 表格数据获取
     */
    async getList() {
      this.loading = true;
      const { data = [], total } = await phoneTaskList({
        page: this.page,
        page_num: this.page_num,
        status: this.formValues.status,
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
</style>