<template>
  <div>
    <el-dialog
      title="关键词管理"
      :visible.sync="show"
      width="70%"
      destroy-on-close
      :modal-append-to-body="false"
    >
      <div>
        <div class="flex-c" style="margin-bottom: 12px">
          关键词：
          <el-input
            placeholder="请输入关键词"
            v-model="keyword"
            size="small"
            clearable
            style="width: 300px; margin-right: 12px"
          ></el-input>
          <el-button
            class=""
            size="small"
            type="primary"
            @click="() => getTableData()"
            >查询</el-button
          >
          <el-button
            class=""
            size="small"
            type="primary"
            @click="$refs.addRef.open({})"
            >新增</el-button
          >
          <el-button
            class=""
            size="small"
            type="primary"
            :disabled="multipleSelection.length == 0"
            @click="batchRemove"
            >批量删除</el-button
          >
        </div>
        <el-table
          class="w100"
          :data="tableData"
          @selection-change="(e) => (multipleSelection = e)"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="id" label="ID" width="55" />
          <el-table-column prop="keyword" label="关键词" />
          <el-table-column prop="content" label="内容"> </el-table-column>
          <el-table-column prop="remark" label="备注"> </el-table-column>
          <el-table-column prop="created_at" label="添加日期">
            <template slot-scope="scope">
              {{ getTime(scope.row.created_at) }}
            </template></el-table-column
          >
          <el-table-column
            label="操作"
            fixed="right"
            align="center"
            width="110"
          >
            <template slot-scope="scope">
              <div class="flex-cb" style="justify-content: space-evenly">
                <el-popconfirm
                  title="确定删除吗？"
                  @confirm="handleRemove(scope.row)"
                >
                  <el-button type="text" size="mini" slot="reference">
                    删除
                  </el-button>
                </el-popconfirm>

                <el-button
                  style="margin-left: 8px"
                  type="text"
                  size="mini"
                  @click="$refs.addRef.open(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="type == '复用'"
                  style="margin-left: 8px"
                  type="text"
                  size="mini"
                  @click="handleCopy(scope.row)"
                >
                  复用
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex">
          <div class="flex1"></div>
          <el-pagination
            style="margin-top: 12px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[5, 10, 20, 50, 100]"
            :page-size="page_num"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </el-dialog>
    <Add ref="addRef" @confirm="getTableData" />
  </div>
</template>

<script>
import {
  keywordList,
  keywordDel,
  validPasswd,
  keywordHasPasswd,
  keywordUpdate,
  keywordAdd,
  keywordCheck,
} from "@/api/keyword";
import Add from "./Add";
import dayjs from "dayjs";

export default {
  components: { Add },
  data() {
    return {
      show: false,
      keyword: "",
      keyword2: "", // 复用时候
      tableData: [],
      page_num: 5,
      page: 1,
      total: 0,
      multipleSelection: [],

      type: "", //是否是复用
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
    async open(keyword, type) {
      this.show = true;
      this.keyword = keyword;
      this.type = type;
      if (type == "复用") {
        this.keyword = "";
        this.keyword2 = keyword;
      }
      console.log(12499);
      this.getTableData();
    },
    close() {
      this.show = false;
    },
    // 校验密码
    async handleSubmit() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page_num = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getTableData();
    },
    async handleCopy(row) {
      const { code } = await keywordAdd({
        keyword: this.keyword2,
        content: row.content,
        remark: row.remark,
      });
      if (code == 200) {
        this.$message.success("复用成功");
        this.getTableData();
      } else {
        this.$message.error("复用失败");
      }
    },
    async handleRemove(row) {
      const { code } = await keywordDel({ ids: [row.id] });
      if (code == 200) {
        this.$message.success("删除成功");
        this.getTableData();
      } else {
        this.$message.error("删除失败");
      }
    },
    async batchRemove() {
      const { code } = await keywordDel({
        ids: this.multipleSelection.map((i) => i.id),
      });
      if (code == 200) {
        this.$message.success("批量删除成功");
        this.getTableData();
      } else {
        this.$message.error("批量删除失败");
      }
    },

    // 获取列表
    async getTableData() {
      const params = {
        page: this.page,
        page_num: this.page_num,
      };
      console.log(1298, this.keyword);
      if (this.keyword) {
        params.keyword = this.keyword;
      }
      const { data = [], total } = await keywordList(params);
      this.tableData = data;
      this.total = total;
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/.el-dialog__body {
  padding-top: 12px;
}
</style>