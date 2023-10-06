<template>
  <div class="page">
    <div class="flex-c">
      <el-button
        @click="handelBatchDel"
        class="button"
        size="small"
        :disabled="!multipleSelection.length"
        >删除</el-button
      >
      <el-button
        @click="$refs.update.open({})"
        class="button"
        type="primary"
        size="small"
        >新增</el-button
      >
      <el-button
        @click="getList"
        :loading="loading"
        class="button"
        type="primary"
        size="small"
        >查询</el-button
      >
    </div>

    <el-table
      :data="tableData"
      class="table"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="ID" width="55" />
      <el-table-column prop="city" label="城市" width="200" />
      <el-table-column prop="content" label="内容" width="200">
        <template slot-scope="scope">
          <ContentBox :content="scope.row.content" :type="scope.row.type" />
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
      <!-- <el-table-column prop="is_del" label="is_del" /> -->
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          {{ ["文字", "文字", "图片", "", "视频", "语音"][scope.row.type] }}
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
    <Update ref="update" @conform="getList" />
  </div>
</template>

<script>
import { get, del, update, add } from "@/api/sayHello";
import dayjs from "dayjs";
import Update from "./Update";
import ContentBox from "@/components/ContentBox";

export default {
  components: { Update, ContentBox },
  data() {
    return {
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
    /**
     * 表格数据获取
     */
    async getList() {
      this.loading = true;
      const { data = [] } = await get();
      this.loading = false;
      this.tableData = data;
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
<style rel="stylesheet/scss" lang="scss" scoped>
.button {
  margin-right: 12px;
}
</style>