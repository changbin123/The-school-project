<template>
  <div>
    <Card>
      <p slot="title">店铺管理</p>
      <div slot="content">
        <div class="content">
          <el-form :disabled="textIn" label-width="80px" :model="orderInfo">
            <el-form-item label="订单id">
              <el-input v-model="orderInfo.id"></el-input>
            </el-form-item>
            <el-form-item label="订单号">
              <el-input v-model="orderInfo.orderNo"></el-input>
            </el-form-item>

            <el-form-item label="下单时间">
              <el-input v-model="orderInfo.orderTime"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="orderInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="收货人">
              <el-input v-model="orderInfo.consignee"></el-input>
            </el-form-item>
            <el-form-item label="送货地址">
              <el-input v-model="orderInfo.deliverAddress"></el-input>
            </el-form-item>
            <el-form-item label="送达时间">
              <el-input v-model="orderInfo.deliveryTime"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="orderInfo.remarks"></el-input>
            </el-form-item>
            <el-form-item label="订单金额">
              <el-input v-model="orderInfo.orderAmount"></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-input v-model="orderInfo.orderState"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button v-if="textIn" type="primary" @click="textIn = false">编辑</el-button>
        <el-button v-else type="primary" @click="save">保存</el-button>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/card";
import { orderDetail, orderEdit } from "@/api/order.js";
export default {
  components: {
    Card,
  },
  async created() {
    console.log(this.$route);
    //获得列表传来的id
    const id = parseInt(this.$route.params.id);
    const { data } = await orderDetail({ id });
    this.orderInfo = data;
  },
  data() {
    return {
      textIn: true,
      orderInfo: {},
    };
  },

  methods: {
    // getOrderDetail(){
    //   orderDetail
    // }
    async save() {
      await orderEdit(this.orderInfo);
      this.textIn = true;
    },
  },
};
</script>

<style lang="less" scoped></style>
