<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <i class="iconfont icon-weibiaoti-"></i>
          <div>
            <p>总订单</p>
            <p>102400</p>
          </div>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <i class="iconfont icon-huaban25"></i>
          <div>
            <p>总销售额</p>
            <p>102400</p>
          </div>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <i class="iconfont icon-dingdan"></i>
          <div>
            <p>今日订单数</p>
            <p>102400</p>
          </div>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <i class="iconfont icon-qianbi"></i>
          <div>
            <p>今日销售额</p>
            <p>102400</p>
          </div>
        </div></el-col
      >
    </el-row>

    <echartsLine :option="option"></echartsLine>
  </div>
</template>

<script>
// import echarts from "echarts";
import { homeTotaldata } from "@/api/total.js";
import echartsLine from "@/components/echarts/Line.vue";
export default {
  components: {
    echartsLine,
  },
  async created() {
    const {
      totalOrder,
      totalAmount,
      todayOrder,
      totayAmount,
      xData,
      orderData,
      amountData,
    } = await homeTotaldata();
    console.log("此时有了后端数据");
    this.option = {
      text: "数据统计",
      legend: ["总订单", "总销售额"],
      xAxis: xData,
      series: [
        {
          name: "总订单",
          type: "line",
          stack: "总量",
          data: orderData,
        },
        {
          name: "总销售额",
          type: "line",
          stack: "总量",
          data: amountData,
        },
      ],
    };
    console.log(this.option);
  },
  data() {
    return {
      option: {},
    };
  },
};
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  .grid-content {
    padding: 15px 0 15px 0;
    display: flex;
    justify-content: space-around;
    align-content: center;
    i {
      font-size: 40px;
      color: rgb(93, 190, 255);
    }
    p {
      &:first-child {
        margin-top: 5px;
        font-size: 14px;
        margin-bottom: 5px;
        color: #bfc2c9;
      }
    }
  }
  &:nth-child(2) {
    i {
      color: rgb(255, 82, 105);
    }
  }
  &:nth-child(4) {
    i {
      color: rgb(86, 255, 86);
    }
  }
}
.bg-purple-dark {
  background: #ffffff;
}
.bg-purple {
  background: #ffffff;
}
.bg-purple-light {
  background: #ffffff;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
