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
        <el-select
          v-model="formValues.assign_status"
          placeholder="状态"
          clearable
        >
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
      <el-tab-pane label="未发送" name="0"></el-tab-pane>
      <el-tab-pane label="发送中" name="1"></el-tab-pane>
      <el-tab-pane label="发送完成" name="2"></el-tab-pane>
      <el-tab-pane label="全部" name="-1"></el-tab-pane>
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
      <el-table-column prop="group_name" label="打招呼组名" width="95" />
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

      <el-table-column prop="status" label="任务创建状态">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.load_status == 0" size="small"
            >创建中</el-tag
          >
          <el-tag type="success" v-if="scope.row.load_status == 1" size="small"
            >成功</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column prop="created_time" label="创建日期" width="180px">
        <template slot-scope="scope">
          {{ getTime(scope.row.created_time) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="240" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="ShowEdit(scope.row)">编辑</el-button>
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleRemove(scope.row)"
          >
            <el-button
              type="text"
              style="margin-left: 10px; margin-right: 10px"
              slot="reference"
            >
              删除
            </el-button>
          </el-popconfirm>
          <el-button type="text" @click="ShowHi(scope.row)"
            >打招呼配置</el-button
          >
          <br />
          <el-button type="text" @click="$refs.showMemberRef.open(scope.row)"
            >成员信息</el-button
          >
          <el-popconfirm
            v-if="scope.row.stop == 0"
            title="确定停止吗？"
            @confirm="stoptTask(scope.row)"
          >
            <el-button type="text" style="margin-left: 10px" slot="reference">
              停止发送
            </el-button>
          </el-popconfirm>

          <el-popconfirm
            v-if="scope.row.stop == 1"
            title="确定继续吗？"
            @confirm="continuetTask(scope.row)"
          >
            <el-button type="text" style="margin-left: 10px" slot="reference">
              继续发送
            </el-button>
          </el-popconfirm>

          <el-popconfirm
            title="确定清除告警吗？"
            @confirm="clearNotice(scope.row)"
          >
            <el-button type="text" style="margin-left: 10px" slot="reference">
              清除告警
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
    <el-dialog title="打招呼配置" width="70%" :visible.sync="show_hi">
      <div class="flex">
        <div class="flex1"></div>
        <div class="flex-cc">
          <div v-if="groupInfo.id">组名：{{ groupInfo.name }}</div>
          <div v-if="groupInfo.id" style="margin: 0 12px">
            组ID：{{ groupInfo.id }}
          </div>
          <el-button
            size="small"
            type="primary"
            @click="$refs.helloGroupModalRef.open()"
          >
            <!-- <el-button size="small" type="primary" @click="ShowChangeHi"> -->
            修改打招呼
          </el-button>
        </div>
      </div>
      <el-table class="table" :data="hi_list">
        <el-table-column label="编号" prop="id" />
        <el-table-column label="内容" prop="content">
          <template slot-scope="scope">
            <audio
              controls
              :src="scope.row.content"
              v-if="scope.row.type === 2"
            />
            <span v-else>{{ scope.row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="handle">
          <template slot-scope="scope">
            <el-button type="text" @click="SendHi(scope.row)">打招呼</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="修改打招呼" width="70%" :visible.sync="show_change">
      <el-table
        class="table"
        :data="change_list"
        @selection-change="ChangeSel"
        style="max-height: 500px"
      >
        <el-table-column type="selection" width="60" />
        <el-table-column label="编号" prop="id" width="70" />
        <el-table-column label="组名" prop="group_name" width="140" />
        <el-table-column label="内容" prop="content">
          <template slot-scope="scope">
            <ContentBox :content="scope.row.content" :type="scope.row.type" />
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right">
        <el-button type="primary" @click="SubmitChange">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog
      destroy-on-close
      title="编辑"
      width="500px"
      :visible.sync="show_edit"
    >
      <el-form
        label-width="100px"
        :model="form_edit"
        :rules="rule_edit"
        ref="form_edit"
      >
        <el-form-item label="消息延迟" prop="interval">
          <el-input-number :min="0" v-model="form_edit.interval" />
          <span style="margin-left: 10px">秒</span>
        </el-form-item>
      </el-form>
      <div style="text-align: right">
        <el-button type="primary" @click="SubmitEdit">提交</el-button>
      </div>
    </el-dialog>
    <HelloGroupModal ref="helloGroupModalRef" @confirm="selectGroupInfo" />
  </div>
</template>

<script>
import Modify from "./Modify.vue";
import ShowMember from "./ShowMember.vue";
import ContentBox from "@/components/ContentBox";
import HelloGroupModal from "../SayHello/HelloGroupModal.vue";

import {
  phoneTaskStop,
  phoneTaskContinue,
  phoneTaskList,
  delPhoneTask,
  GetHi,
  PostSendHi,
  PostUpdateInterval,
  GetChangeHiList,
  clearWarn,
} from "@/api";
import dayjs from "dayjs";

export default {
  components: { Modify, ShowMember, ContentBox, HelloGroupModal },
  data() {
    return {
      handle_status: "0",
      page: 1,
      page_num: 10,
      total: 0,
      formValues: {
        status: -1,
        assign_status: -1,
      },
      tableData: [],
      hi_list: [],
      select_list: [],
      show_hi: false,
      form_edit: "",
      rule_edit: {
        interval: [
          {
            required: true,
            message: "请输入消息延迟",
            trigger: ["blur", "input"],
          },
        ],
      },
      show_edit: false,
      change_list: [],
      show_change: false,
      loading: false,
      // multipleSelection: [],
      groupInfo: {},
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
    ShowEdit(item) {
      this.form_edit = item;
      this.show_edit = true;
    },
    selectGroupInfo(info = {}) {
      this.groupInfo = info;
      console.log("this.groupInfo", this.groupInfo);
      this.SubmitSendHi()
    },
    SubmitEdit() {
      this.$refs.form_edit.validate((valid) => {
        if (!valid) return;
        PostUpdateInterval({
          id: this.form_edit.id,
          interval: this.form_edit.interval,
        }).then((res) => {
          if (res.msg === "ok") {
            this.show_edit = false;
            this.page = 1;
            this.getList();
          } else {
            this.$message({ type: "warning", message: res.msg });
          }
        });
      });
    },
    SendHi(item) {
      this.SubmitSendHi([item.id]);
    },
    ShowChangeHi() {
      GetChangeHiList().then((res) => {
        this.change_list = res.data;
        this.select_list = [];
        this.show_change = true;
      });
    },
    SubmitChange() {
      this.SubmitSendHi(this.select_list.map((i) => i.id));
    },
    SubmitSendHi(list) {
      if (!this.groupInfo.id) {
        this.$message.error("请先选择组~");
        return;
      }
      PostSendHi({
        id: this.hi_id,
        group_id: this.groupInfo.id,
        //  reply_ids: list.join(",")
      }).then((res) => {
        if (res.msg === "ok") {
          this.$message({ type: "success", message: "打招呼成功" });
          this.show_change = false;
        } else {
          this.$message({ type: "warning", message: res.msg });
        }
      });
    },
    ChangeSel(list) {
      this.select_list = list;
    },
    ShowHi(item) {
      this.hi_id = item.id;
      this.$refs.helloGroupModalRef.open()
      return
      GetHi({ task_id: item.id }).then((res) => {
        this.hi_list = res.data || [];
        this.show_hi = true;
      });
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

    async clearNotice(row) {
      const { code } = await clearWarn({ app_key: row.app_key });
      if (code == 200) {
        this.$message.success("清除成功");
        this.getList();
      } else {
        this.$message.success("清除失败");
      }
    },

    async continuetTask(row) {
      const { code } = await phoneTaskContinue({ id: row.id });
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
<style lang="stylus" scoped></style>
