<template>
  <div>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div ref="echarts" style="width: 80%; height: 400px; margin: 0 auto"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  //拿到Home图标数据
  props: ["option"],
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      var myChart = echarts.init(this.$refs.echarts);
      // 指定图表的配置项和数据
      var option = {
        title: {
          //   text: "折线图堆叠",标题动态数据
          text: this.option.title,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          //   data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],//类目动态数据
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
        xAxis: {
          type: "category",
          boundaryGap: false,
          //   data: ["周一", "周二", "周三", "周四", "周五"],//x轴动态数据
          data: this.option.xAxis,
        },
        yAxis: {
          type: "value",
        },
        //核心数据 动态数据
        series: this.option.series,
        // series: [
        //   {
        //     name: "邮件营销",
        //     type: "line",
        //     stack: "总量",
        //     data: [120, 132, 101, 134, 90, 230, 210],
        //   },
        //   {
        //     name: "联盟广告",
        //     type: "line",
        //     stack: "总量",
        //     data: [220, 182, 191, 234, 290, 330, 310],
        //   },
        //   {
        //     name: "视频广告",
        //     type: "line",
        //     stack: "总量",
        //     data: [150, 232, 201, 154, 190, 330, 410],
        //   },
        //   {
        //     name: "直接访问",
        //     type: "line",
        //     stack: "总量",
        //     data: [320, 332, 301, 334, 390, 330, 320],
        //   },
        //   {
        //     name: "搜索引擎",
        //     type: "line",
        //     stack: "总量",
        //     data: [820, 932, 901, 934, 1290, 1330, 1320],
        //   },
        // ],
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
