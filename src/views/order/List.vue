<template>
  <div>
    <Card>
      <div slot="title">
        <el-form
          ref="formInline"
          size="mini"
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="订单号" prop="orderNo">
            <el-input v-model="formInline.orderNo" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item label="收货人" prop="consignee">
            <el-input v-model="formInline.consignee" placeholder="收货人"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="订单状态" prop="orderState">
            <el-select clearable v-model="formInline.orderState" placeholder="订单状态">
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 时间 -->
        <el-form size="mini" label-width="80px" :inline="true">
          <el-form-item label="选择时间">
            <el-col :span="11">
              <el-date-picker
                type="datetime"
                placeholder="选择时间"
                v-model="date1"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="1">至</el-col>
            <el-col :span="11">
              <el-date-picker
                type="datetime"
                placeholder="选择时间"
                v-model="date2"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="content">
        <el-table :data="tableData" border style="width: 90%">
          <el-table-column fixed prop="orderNo" label="订单号" width="110">
          </el-table-column>
          <el-table-column prop="orderTime" label="下单时间" width="150">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"> </el-table-column>
          <el-table-column prop="consignee" label="收获人" width="100"> </el-table-column>
          <el-table-column prop="deliverAddress" label="配送地址" width="200">
          </el-table-column>
          <el-table-column prop="deliveryTime" label="送达时间" width="150">
          </el-table-column>
          <el-table-column prop="remarks" label="用户备注" width="120"> </el-table-column>
          <el-table-column prop="orderAmount" label="订单金额" width="100">
          </el-table-column>
          <el-table-column prop="orderState" label="订单状态" width="100">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row.id)" type="text" size="small"
                >查看</el-button
              >
              <!-- <el-button type="text" size="small">编辑</el-button> -->
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="formInline.currentPage"
            :pageSize="formInline.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/card";
import { orderList } from "@/api/order.js";
import moment from "moment";
export default {
  components: {
    Card,
  },
  created() {
    this.onSubmit();
  },
  data() {
    return {
      total: 0,
      date1: "",
      date2: "",
      formInline: {
        currentPage: 1,
        pageSize: 5,
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: [],
      },
      tableData: [],
    };
  },
  methods: {
    async onSubmit() {
      this.formInline.date = [this.date1, this.date2];
      this.formInline.date.forEach((item, index) => {
        item = moment(item).format("YY-MM-DD HH:mm:ss");
        this.formInline.date[index] = item;
      });
      console.log(this.formInline);
      const { total, data } = await orderList(this.formInline);
      this.total = total;
      data.forEach((item, index) => {
        item.deliveryTime = moment(item.deliveryTime).format("YYYY-MM-DD HH:mm:ss");
        item.orderTime = moment(item.orderTime).format("YYYY-MM-DD HH:mm:ss");
      });
      this.tableData = data;
      console.log(this.tableData);
    },
    handleClick(id) {
      this.$router.push({
        name: "orderDetail",
        //params中写传给下个页面的参数
        params: { id },
      });
    },
    handleSizeChange(val) {
      console.log(`每页 val 条`);
      this.formInline.pageSize = val;
      this.onSubmit();
    },
    handleCurrentChange(val) {
      console.log(`当前页: val`);
      this.formInline.currentPage = val;
      this.onSubmit();
    },
  },
};
</script>

<style lang="less" scoped></style>
