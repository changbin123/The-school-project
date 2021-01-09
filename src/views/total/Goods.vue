<template>
  <div>
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
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div ref="echarts" style="width: 80%; height: 400px; margin: 0 auto"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { ordertotal } from "@/api/total.js";
export default {
  created() {
    this.search();
  },
  mounted() {
    this.draw();
  },
  data() {
    return {
      date: [],
      option: {},
    };
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
        //存放每月销售数量
        seriesData = [];
      for (let key in obj) {
        //key为对象属性
        xAxis.push(key);
        let total = 0;
        //把每月的订单金额求和，对象属性值求和
        // obj[key].forEach((v) => (total += v));
        total = obj[key].length;
        seriesData.push(total);
      }
      this.option = {
        text: "月销售额统计",
        legend: ["月销售数量"],
        xAxis: xAxis,
        series: [
          {
            name: "月销售数量",
            type: "bar",
            stack: "总量",
            data: seriesData,
          },
        ],
      };
    },
    draw() {
      var myChart = echarts.init(this.$refs.echarts);
      var option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },

        legend: {
          data: this.option.legend,
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
        xAxis: [
          {
            type: "category",
            data: this.option.xAxis,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: this.option.series,
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

      console.log("此时完成了报表渲染");
    },
  },
  watch: {
    //当option改变  重新渲染报表
    option(newVal, oldVal) {
      this.draw();
    },
    // option:{
    //   handler(){
    //     this.draw()
    //   },
    //   deep:true,
    // }
  },
};
</script>

<style lang="less" scoped></style>
