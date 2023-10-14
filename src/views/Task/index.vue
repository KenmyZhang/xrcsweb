<template>
  <div class="public-page">
    <el-form :inline="true" :model="formValues" size="small">
      <el-form-item label="启动状态">
        <el-select v-model="formValues.status" placeholder="状态" clearable>
          <el-option label="全部" :value="-1"></el-option>
          <el-option label="未启动" :value="0"></el-option>
          <el-option label="已启动" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领取状态">
        <el-select v-model="formValues.assign_status" placeholder="状态" clearable>
          <el-option label="全部" :value="-1"></el-option>
          <el-option label="可领取" :value="0"></el-option>
          <el-option label="不可领取" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleAdd">新建</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="handle_status" @tab-click="handleClick">
      <el-tab-pane label="全部" name="-1"></el-tab-pane>
      <el-tab-pane label="未发送" name="0"></el-tab-pane>
      <el-tab-pane label="发送中" name="1"></el-tab-pane>
      <el-tab-pane label="发送完成" name="2"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" class="table">
      <el-table-column prop="id" label="ID" width="55" />
      <el-table-column prop="app_key" label="秘钥" width="200px">
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
      <el-table-column prop="interval" label="消息延迟" />
      <el-table-column prop="total" label="任务总数" />
      <el-table-column prop="process_count" label="已发送数" />
      <el-table-column label="处理进度">
        <template slot-scope="scope">
          {{ ((scope.row.process_count / scope.row.total) * 100).toFixed(2) }}%
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否停止状态">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.stop == 0" size="small"
            >否</el-tag
          >
          <el-tag type="success" v-if="scope.row.stop == 1" size="small"
            >是</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column prop="created_time" label="创建日期" width="180px">
        <template slot-scope="scope">
          {{ getTime(scope.row.created_time) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="140" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type='text' @click='ShowHi(scope.row)'>打招呼配置</el-button>
          <el-button type="text" @click="$refs.showMemberRef.open(scope.row)">成员信息</el-button>
          <el-button
            type="text"
            @click="stoptTask(scope.row)"
            >停止</el-button
          >
          <el-popconfirm
              title="确定删除吗？"
              @confirm="handleRemove(scope.row)"
            >
              <el-button type="text" size="mini" slot="reference">
                删除
              </el-button>
        </el-popconfirm>
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
    <el-dialog title='打招呼配置' width='70%' :visible.sync='show_hi'>
      <el-table class='table' :data='hi_list'>
        <el-table-column label='编号' prop='id' />
        <el-table-column label='内容' prop='content'>
          <template slot-scope='scope'>
            <audio controls :src='scope.row.content' v-if='scope.row.type === 2' />
            <span v-else>{{scope.row.content}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import Modify from "./Modify.vue";
import ShowMember from "./ShowMember.vue";
import { phoneTaskStop, phoneTaskList,delPhoneTask, GetHi } from "@/api";
import dayjs from "dayjs";

export default {
  components: { Modify, ShowMember },
  data() {
    return {
      handle_status: "-1",
      page: 1,
      page_num: 10,
      total: 0,
      formValues: {
        status: -1,
        assign_status: -1,
      },
      tableData: [],
      hi_list: [],
      show_hi: false,
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
  methods: {
    ShowHi(item) {
      GetHi({ task_id: item.id }).then(res => {
        this.hi_list = res.data || []
        this.show_hi = true
      })
    },
    handleClick(tab, event) {
      this.getList();
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
    onCopy(text) {
      // console.log(text);
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
      this.$message.success("复制成功");
    },
    async stoptTask(row) {
      const { code } = await phoneTaskStop({ id: row.id });
      if (code == 200) {
        this.$message.success("停止成功");
        this.getList();
      } else {
        this.$message.success("停止失败");
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
        handle_status: this.handle_status,
        assign_status: this.formValues.assign_status,
      });
      this.loading = false;
      this.total = total;
      this.tableData = data;
    },
    /**
     * 单删除
     */
     async handleRemove(row) {
       const { code } = await delPhoneTask({
         id: row.id,
       });
      if (code == 200) {
        this.$message.success("删除成功");
        this.getTableData();
      } else {
        this.$message.error("删除失败");
      }
       this.getList();
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
</style>
