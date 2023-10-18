<template>
  <div class="public-page">
    <el-form :inline="true" :model="formValues" size="small">
      <el-form-item label="任务领取账号" prop="account">
        <el-input v-model="formValues.account" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="文件名" prop="account">
        <el-input v-model="formValues.filename" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="领取状态">
        <el-select v-model="formValues.status" placeholder="领取状态" clearable>
          <el-option label="全部" :value="-1"></el-option>
          <el-option label="未领取" :value="0"></el-option>
          <el-option label="已领取" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="筛选状态">
        <el-select v-model="formValues.filter_status" placeholder="筛选状态" clearable>
          <el-option label="全部" :value="-1"></el-option>
          <el-option label="未完成" :value="0"></el-option>
          <el-option label="已完成" :value="1"></el-option>
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
      <el-form-item>
        <el-button @click="$refs.modifyRef.open({})">新建</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" class="table">
      <el-table-column prop="id" label="ID" width="55" />
      <el-table-column prop="filename" label="文件名" />
      <el-table-column prop="total" label="总共数量" />
      <el-table-column prop="valid_count" label="有效数量" />
      <el-table-column prop="invalid_count" label="无效数量" />
      <el-table-column label="有效占比">
        <template slot-scope="scope">
          {{ ((scope.row.valid_count / scope.row.total)* 100).toFixed(2) }}%
        </template>
      </el-table-column>
      <el-table-column prop="un_process_count" label="未处理数量" />
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
      <el-table-column label="领取进度">
        <template slot-scope="scope">
          {{ ((scope.row.assigned_count / scope.row.total)* 100).toFixed(2) }}%
        </template>
      </el-table-column>
      <el-table-column label="筛选进度">
        <template slot-scope="scope">
          {{ ((scope.row.process_count / scope.row.total)* 100).toFixed(2) }}%
        </template>
      </el-table-column>
      <el-table-column prop="is_del" label="是否已删除">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.is_del == 0" size="small"
            >否</el-tag
          >
          <el-tag type="success" v-if="scope.row.is_del == 1" size="small"
            >是</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="created_time" label="创建日期" width="180px">
        <template slot-scope="scope">
          {{ getTime(scope.row.created_time) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="100">
        <template slot-scope="scope">
          <el-button size='mini' type='text' @click='ShowPhone(scope.row, true)'>有效号码</el-button>
          <el-button size='mini' type='text' @click='ShowPhone(scope.row, false)'>无效号码</el-button>
          <el-button size='mini' type='text' @click='ShowMember(scope.row)'>任务成员</el-button>
          <div class="flex-cb" style="justify-content: space-evenly">
            <el-popconfirm
              title="确定删除吗？"
              @confirm="handleRemove(scope.row)"
            >
              <el-button type="text" size="mini" slot="reference">
                删除
              </el-button>
            </el-popconfirm>
          </div>
          <div class="flex-cb" style="justify-content: space-evenly">
            <el-popconfirm
              v-if="scope.row.stop ==0" 
              title="确定停止吗？"
              @confirm="handleStop(scope.row)"
            >
              <el-button type="text" size="mini" slot="reference">
                停止筛选
              </el-button>
            </el-popconfirm>
            <el-popconfirm
              v-if="scope.row.stop ==1" 
              title="确定继续筛选吗？"
              @confirm="handleContinue(scope.row)"
            >
              <el-button type="text" size="mini" slot="reference">
                继续筛选
              </el-button>
            </el-popconfirm>
          </div>
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
    <el-dialog title='任务成员' width='70%' :visible.sync='show_member'>
      <el-table class='table' :data='member_list' v-loading='loading_member'>
        <el-table-column label='账号' prop='account' />
        <el-table-column label='任务总数' prop='total' />
        <el-table-column label='有效数量' prop='valid_count' />
        <el-table-column label='无效数量' prop='invalid_count' />
        <el-table-column label='已处理数量' prop='process_count' />
      </el-table>
      <el-pagination class='tr' @size-change='ReLoadMember' @current-change='LoadMemberData' :current-page.sync='member_index' :page-sizes='[10, 20, 50]' :page-size='member_size' layout='total,sizes,prev,pager,next' :total='member_total' />
    </el-dialog>
    <el-dialog :title="phone_is_valid ? '有效号码' : '无效号码'" width='70%' :visible.sync='show_phone'>
      <div style='text-align: right;'>
        <el-button type='primary' :loading='loading_phone' @click='ExportPhone'>导出</el-button>
      </div>
      <el-table class='table' :data='phone_list' v-loading='loading_phone'>
        <el-table-column label='号码' prop='phone' />
      </el-table>
      <el-pagination class='tr' @size-change='ReLoadPhone' @current-change='LoadPhoneData' :current-page.sync='phone_index' :page-sizes='[10, 20, 50]' :page-size='phone_size' layout='total,sizes,prev,pager,next' :total='phone_total' />
    </el-dialog>
  </div>
</template>

<script>
import { filterTasks, phoneUploadhistory,delFilterTask,stopFilterTask,continueFilterTask, GetMemberList, GetPhoneList } from "@/api";
import dayjs from "dayjs";
import Modify from "./Modify.vue";
import { exportExcel } from '@/utils/tools'

export default {
  components: { Modify },
  data() {
    return {
      handle_status: "-1",
      page: 1,
      page_num: 10,
      total: 0,
      taskList: [],
      formValues: {
        account: "",
        filename: "",
        status: -1,
        filter_status: -1,
        created_time: "",
      },
      tableData: [],
      member_index: 1,
      member_size: 10,
      member_list: [],
      member_total: 0,
      show_member: false,
      loading_member: false,
      phone_index: 1,
      phone_size: 10,
      phone_list: [],
      phone_total: 0,
      phone_is_valid: false,
      show_phone: false,
      loading_phone: false,
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
  methods: {
    ShowPhone(item, is_valid) {
      this.phone_is_valid = is_valid
      this.phone_file = item.filename
      this.show_phone = true
      this.ReLoadPhone()
    },
    ReLoadPhone() {
      this.phone_index = 1
      this.LoadPhoneData()
    },
    LoadPhoneData() {
      this.loading_phone = true
      GetPhoneList({
        filename: this.phone_file,
        valid: this.phone_is_valid,
        page: this.phone_index,
        page_num: this.phone_size
      }).then(res => {
        this.phone_total = res.total || 0
        this.phone_list = res.data || []
      }).finally(() => {
        this.loading_phone = false
      })
    },
    ExportPhone() {
      this.loading_phone = true
      GetPhoneList({
        filename: this.phone_file,
        valid: this.phone_is_valid,
        page: 1,
        page_num: 200000
      }).then(res => {
        let name = this.phone_is_valid ? '有效号码' : '无效号码'
        exportExcel((res.data || []).map(i => [i.phone]), name, [name], name)
      }).finally(() => {
        this.loading_phone = false
      })
    },
    ShowMember(item) {
      this.member_id = item.id
      this.show_member = true
      this.ReLoadMember()
    },
    ReLoadMember() {
      this.member_index = 1
      this.LoadMemberData()
    },
    LoadMemberData() {
      this.loading_member = true
      GetMemberList({
        task_id: this.member_id,
        page: this.member_index,
        page_num: this.member_size
      }).then(res => {
        this.member_total = res.total || 0
        this.member_list = res.data || []
      }).finally(() => {
        this.loading_member = false
      })
    },
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
        filter_status: this.formValues.filter_status,
        filename: this.formValues.filename,
        account: this.formValues.account,
        created_time: this.formValues.created_time,
        handle_status: this.handle_status,
      });
      this.loading = false;
      this.total = total;
      this.tableData = data;
    },
    /**
     * 单删除
     */
     async handleRemove(row) {
       const { code } = await delFilterTask({
         id: row.id,
       })
      if (code == 200) {
        this.$message.success("删除成功");
      } else {
        this.$message.error("删除失败");
      }
       this.getList();
       this.getTaskList();
     },

      async handleStop(row) {
       const { code } = await stopFilterTask({
         id: row.id,
       })
      if (code == 200) {
        this.$message.success("停止成功");
      } else {
        this.$message.error("停止失败");
      }
       this.getList();
       this.getTaskList();
     },

     async handleContinue(row) {
       const { code } = await continueFilterTask({
         id: row.id,
       })
      if (code == 200) {
        this.$message.success("继续筛选成功");
      } else {
        this.$message.error("继续筛选失败");
      }
       this.getList();
       this.getTaskList();
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
.public-page {
  display: flex;
  flex-direction: column;
  .table {
    flex: 1;
  }
}
</style>
