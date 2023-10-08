<template>
  <div class="public-page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="小时分钟" name="hour">
        <div>
          <div>
            <el-date-picker
              v-model="time"
              type="date"
              size="small"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              @change="drawHm"
            />
            <el-button size="small" @click="onExport('mins')"
              >导出分钟</el-button
            >
            <el-button size="small" @click="onExport('hours')"
              >导出小时</el-button
            >
          </div>
          <div class="flex-cb w100" style="padding-top: 36px">
            <div
              id="min"
              style="width: 48%; height: 600px"
              v-loading="minloading"
            ></div>
            <div
              id="hour"
              style="width: 48%; height: 600px"
              v-loading="hourloading"
            ></div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="时间段天" name="day">
        <div>
          <el-date-picker
            v-model="timeRange"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            @change="drawHm"
          >
          </el-date-picker>
          <el-button size="small" @click="onExport('days')">导出天</el-button>
        </div>
        <div style="padding-top: 36px">
          <div id="day" style="width: 100%; height: 600px"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { minuteList, hourList, dayList } from "@/api";
import dayjs from "dayjs";
import * as echarts from "echarts";
import { exportExcel } from "@/utils/tools";


export default {
  components: {},
  data() {
    return {
      activeName: "hour",
      time: "",
      minloading: false,
      hourloading: false,
      dayloading: false,
      timeRange: [],
      mins: [],
      hours: [],
      days: [],
    };
  },
  computed: {},
  created() {
    this.time = dayjs().format("YYYY-MM-DD");
    this.timeRange = [
      dayjs().subtract(30, "days").format("YYYY-MM-DD"),
      this.time,
    ];
    console.log(this.time, this.timeRange);
  },
  mounted() {
    this.drawHm();
  },
  methods: {
    getDownLoadList(row) {
      let key = [],
        val = {};
      const list = Object.keys(row).map((key) => {
        return {
          name: key,
          value: row[key],
        };
      });
      list.forEach((item, i) => {
        key.push(item.name);
        val[i] = item.value;
      });
      return { key, val };
    },
    onExport(type) {
      const arr = this[type];
      console.log(223, arr);

      let dataArr = [];
      let titleArr = [];
      arr.forEach((item) => {
        let { key, val } = this.getDownLoadList(item);
        dataArr.push(val);
        titleArr = key;
      });
      exportExcel(dataArr, "数据统计", titleArr, "数据统计");
    },
    handleClick(tab, event) {
      console.log(this.activeName);
    },
    initMin() {
      var chartDom = document.getElementById("min");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "分钟",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["客服发送数", "用户发送数", "回复用户数", "交易用户数"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.mins.map((v) => v.x),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "客服发送数",
            type: "line",
            stack: "Total",
            data: this.mins.map((v) => v.kefu_msg_count),
          },
          {
            name: "用户发送数",
            type: "line",
            stack: "Total",
            data: this.mins.map((v) => v.user_msg_count),
          },
          {
            name: "回复用户数",
            type: "line",
            stack: "Total",
            data: this.mins.map((v) => v.reply_user_count),
          },
          {
            name: "交易用户数",
            type: "line",
            stack: "Total",
            data: this.mins.map((v) => v.trade_user_count),
          },
        ],
      };

      option && myChart.setOption(option);
    },
    initHour() {
      var chartDom = document.getElementById("hour");
      // console.log("chartDom", chartDom);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "小时",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["客服发送数", "用户发送数", "回复用户数", "交易用户数"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.hours.map((v) => v.hour),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "客服发送数",
            type: "line",
            stack: "Total",
            data: this.hours.map((v) => v.kefu_msg_count),
          },
          {
            name: "用户发送数",
            type: "line",
            stack: "Total",
            data: this.hours.map((v) => v.user_msg_count),
          },
          {
            name: "回复用户数",
            type: "line",
            stack: "Total",
            data: this.hours.map((v) => v.reply_user_count),
          },
          {
            name: "交易用户数",
            type: "line",
            stack: "Total",
            data: this.hours.map((v) => v.trade_user_count),
          },
        ],
      };

      option && myChart.setOption(option);
    },
    // 格式化为两位
    fmt2(num) {
      let str = num + "";
      if (str.length == 1) str = "0" + str;
      return str;
    },
    drawHm() {
      this.getMin();
      this.getHour();
    },
    async getMin() {
      this.minloading = true;
      const { data } = await minuteList({ time: this.time });
      // const arr = data.map((v) => ({
      //   ...v,
      //   x: this.fmt2(v.hour) + ":" + this.fmt2(v.minute),
      // }));
      // arr.sort((a, b) => a.x - b.x);
      // this.mins = arr;
      this.minloading = false;
      this.mins = data || [];
      console.log(99, this.mins);
      this.initMin();
    },
    async getHour() {
      this.hourloading = true;
      const { data } = await hourList({ time: this.time });
      this.hourloading = false;
      this.hours = data;
      console.log(100, this.hours);
      this.initHour();
    },
    async getDay() {
      // this.hourloading = true;
      // const { data } = await hourList({ time: this.time });
      // this.hourloading = false;
      // this.hours = data;
      // console.log(100, this.hours);
      // this.initHour();
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/* @import url(); 引入css类 */
</style>