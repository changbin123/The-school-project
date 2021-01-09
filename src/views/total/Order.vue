<template>
  <div>
    <Card>
      <div slot="title">
        <el-date-picker
          size="small"
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-button size="small" type="primary" @click="search">查询</el-button>
      </div>
      <div slot="content">
        <EchartsLine :option="option"> </EchartsLine>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/card";
import EchartsLine from "@/components/echarts/Line";
import { ordertotal } from "@/api/total.js";
export default {
  components: {
    Card,
    EchartsLine,
  },
  created() {
    this.search();
  },
  methods: {
    async search() {
      const { data } = await ordertotal({ date: JSON.stringify(this.date) });
      //定义空对象存放结果
      const obj = {};
      //处理后得到的obj对象  key是月份 值value是订单金额的数组
      data.forEach((item) => {
        //截取年月
        const key = item.orderTime.substring(0, 7);
        if (obj[key]) {
          //给年月添加金额数组
          obj[key].push(item.orderAmount);
        } else {
          //给没有的年月，添加年月属性和属性值
          obj[key] = [item.orderAmount];
        }
      });
      console.log(obj);
      //定义空数组,存放x轴月份数据
      const xAxis = [],
        //存放每月销售总额
        seriesData = [];
      for (let key in obj) {
        //key为对象属性
        xAxis.push(key);
        let total = 0;
        //把每月的订单金额求和，对象属性值求和
        obj[key].forEach((v) => (total += v));
        seriesData.push(total);
      }
      this.option = {
        text: "月销售额统计",
        legend: ["月销售额"],
        xAxis: xAxis,
        series: [
          {
            name: "月销售额",
            type: "line",
            stack: "总量",
            data: seriesData,
          },
        ],
      };
    },
  },
  data() {
    return {
      date: [],
      option: {},
    };
  },
};
</script>

<style lang="less" scoped></style>
