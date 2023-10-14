<template>
  <div class="public-page">
    <el-form :inline="true" :model="formValues" size="small">
      <el-form-item label="文件名">
        <el-input
          v-model="formValues.filename"
          placeholder="请输入文件名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" class="table">
      <el-table-column prop="id" label="ID" width="55" />
      <el-table-column prop="total" label="总数" />
      <el-table-column prop="repeated_count" label="重复数量" />
      <el-table-column prop="reply_count" label="已回复数量" />
      <el-table-column prop="filename" label="文件名" />
      <el-table-column prop="already_in_filter_task" label="是否在筛选任务中">
        <template slot-scope="scope">
          <el-tag
            type="warning"
            size="small"
            v-if="scope.row.already_in_filter_task === null || scope.row.already_in_filter_task === undefined"
            >未知</el-tag
          >
          <el-tag type="info" v-if="scope.row.already_in_filter_task == false" size="small"
            >否</el-tag
          >
          <el-tag type="success" v-if="scope.row.already_in_filter_task == true" size="small"
            >是</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column prop="already_in_send_task" label="是否在发送任务中">
        <template slot-scope="scope">
          <el-tag
            type="warning"
            size="small"
            v-if="scope.row.already_in_send_task === null || scope.row.already_in_send_task === undefined"
            >未知</el-tag
          >
          <el-tag type="info" v-if="scope.row.already_in_send_task == false" size="small"
            >否</el-tag
          >
          <el-tag type="success" v-if="scope.row.already_in_send_task == true" size="small"
            >是</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column prop="upload_time" label="上传日期">
        <template slot-scope="scope">
          {{ getTime(scope.row.upload_time) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="checkPhone(scope.row)">查看号码</el-button>
          <el-button type="text" @click="uploadTxt(scope.row)">下载</el-button>
          <!--el-popconfirm title="确定删除吗？" @confirm="hanldeDel(scope.row)">
            <el-button size="mini" type="text" slot="reference">
              删除
            </el-button>
          </el-popconfirm-->
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
    <ShowPhone ref="showPhoneRef"/>
  </div>
</template>

<script>
import { phoneUploadhistory } from "@/api";
import { phoneUploadDel } from '@/api/upload'
import dayjs from "dayjs";
import { downloadUrlFile } from "./utils";
import ShowPhone from './ShowPhone'

export default {
  components:{ShowPhone},
  data() {
    return {
      page: 1,
      page_num: 10,
      total: 0,
      formValues: {
        filename: "",
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
    uploadTxt(row) {
      // window.location.href = row.filepath
      // window.open(row.filepath, "_blank");

      // const a = document.createElement("a");
      // a.style.display = "none";
      // a.download = "xx";
      // a.href = row.filepath;
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
      downloadUrlFile(row.filepath, row.filename)
    },
    handleSizeChange(page_num) {
      this.page_num = page_num;
      this.getList();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getList();
    },
    checkPhone(row){
      this.$refs.showPhoneRef.open(row)
    },
    /**
     * 表格数据获取
     */
    async getList() {
      this.loading = true;
      const { data = [], total } = await phoneUploadhistory({
        page: this.page,
        page_num: this.page_num,
        filename: this.formValues.filename,
      });
      this.loading = false;
      this.total = total;
      this.tableData = data;
    },
    /**
     * 单删除
     */
    async hanldeDel(row) {
     // const {code } =
      await phoneUploadDel({
       id: row.id
     });
     // if (code == 200) {
     //   this.$message.success("删除成功");
     // } else {
     //   this.$message.error("删除失败");
     // }
    },
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
<style lang="stylus" scoped>
// .public-page {
//   display: flex;
//   flex-direction: column;
//   .table {
//     flex: 1;
//   }
// }
</style>
