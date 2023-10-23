<template>
  <div class="public-page">
    <div class="flex-c" style="margin-bottom: 12px">
      <el-input placeholder="请输入组名" v-model="name" clearable size="small" style="width: 240px;margin-right: 24px"></el-input>
      <el-button
        @click="handelBatchDel"
        class="button"
        size="small"
        :disabled="!multipleSelection.length"
        >删除</el-button
      >
      <el-button
        @click="getList"
        :loading="loading"
        class="button"
        type="primary"
        size="small"
        >查询</el-button
      >
      <el-button
        @click="$refs.update.open({})"
        class="button"
        type="primary"
        size="small"
        >新增</el-button
      >
    </div>

    <el-table
      :data="tableData"
      class="table"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="55" />

      <el-table-column prop="name" label="组名"> </el-table-column>
      <el-table-column prop="mode" label="模式">
        <template slot-scope="scope">
          {{ ["随机", "组合"][scope.row.mode] }}
        </template>
      </el-table-column>
      <el-table-column prop="enable" label="状态">
        <template slot-scope="scope">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开"
            inactive-text="关"
            v-model="scope.row.enable"
            @change="(e) => handleUpdate(e, scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="created_time" label="创建日期">
        <template slot-scope="scope">
          {{ getTime(scope.row.created_time) }}
        </template>
      </el-table-column>
      <el-table-column prop="updated_time" label="更新日期">
        <template slot-scope="scope">
          {{ getTime(scope.row.updated_time) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center" fixed="right">
        <template slot-scope="scope">
          <div class="flex-cb">
            <el-popconfirm title="确定删除吗？" @confirm="hanldeDel(scope.row)">
              <el-button size="mini" type="text" slot="reference">
                删除
              </el-button>
            </el-popconfirm>

            <el-button
              size="mini"
              type="text"
              @click="$refs.update.open(scope.row)"
              >编辑</el-button
            >
          </div>
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
      :page-sizes="[10, 20, 50]"
      :page-size="page_num"
      layout="total, prev, pager, next"
      :total="total"
    />
    <Update ref="update" @conform="getList" />
  </div>
</template>

<script>
import { get, del, update, add } from "@/api/sayHelloGroup";
import dayjs from "dayjs";
import Update from "./Update";
import ContentBox from "@/components/ContentBox";

export default {
  components: { Update, ContentBox },
  data() {
    return {
      name: "",
      page: 1,
      total: 0,
      page_num: 10,
      tableData: [],
      loading: false,
      multipleSelection: [],
    };
  },
  computed: {
    getTime() {
      return (num) => (num ? dayjs(num).format("YYYY-MM-DD, HH:mm") : "-/-");
    },
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
      const { data = [], total } = await get({
        name: this.name,
        page: this.page,
        page_num: this.page_num,
      });
      this.loading = false;
      this.tableData = data;
      this.total = total;
    },
    /**
     * 单删除
     */
    async hanldeDel(row) {
      const params = { ids: [row.id] };
      this.delApi(params);
    },
    /**
     * 多删除
     */
    async handelBatchDel() {
      const params = { ids: this.multipleSelection.map((i) => i.id) };
      this.delApi(params);
    },
    /**
     * 删除接口触发
     */
    async delApi(params) {
      await del(params);
      this.$message.success("删除成功");
      this.getList();
    },
    /**
     * 更新
     */
    async handleUpdate(e, row) {
      const { code } = await update({ ...row, enable: e });
      if (code == 200) {
        this.$message.success("更新成功");
      } else {
        this.$message.error("更新失败");
      }
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style lang="stylus" scoped>
.button {
  margin-right: 12px;
}
</style>