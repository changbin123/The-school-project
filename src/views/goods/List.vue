<template>
  <div>
    <Card>
      <p slot="title">商品列表</p>
      <div slot="content">
        <el-table ref="singleTable" :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="商品价格">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="商品图片">
                  <img :src="baseImgUrl + props.row.imgUrl" alt="" />

                  <!-- <span>{{ props.row.imgUrl }}</span> -->
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ props.row.ctime }}</span>
                </el-form-item>
                <el-form-item label="商品评价">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>
                <el-form-item label="商品销量">
                  <span>{{ props.row.sellCount }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.goodsDesc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="120"> </el-table-column>
          <el-table-column prop="category" label="所属分类" width="120">
          </el-table-column>
          <el-table-column prop="price" label="商品价格"> </el-table-column>
          <el-table-column label="商品图片">
            <template slot-scope="scope">
              <img :src="baseImgUrl + scope.row.imgUrl" alt="" />
            </template>
            <!-- <img prop="imgUrl" :src="baseImgUrl"+prop class="avatar" /> -->
          </el-table-column>
          <el-table-column prop="goodsDesc" label="商品描述"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 弹出框 -->
        <el-dialog title="信息修改" :visible.sync="dialogVisible" width="30%">
          <el-form
            ref="form"
            :model="form"
            label-width="100px"
            class="demo-ruleForm"
            size="small"
          >
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <!-- <el-form-item label="密码" prop="pwd">
                <el-input v-model="form.pwd"></el-input>
              </el-form-item> -->
            <el-form-item label="商品分类" prop="category">
              <el-select v-model="form.category" placeholder="请选择商品分类">
                <el-option
                  v-for="item in categories"
                  :key="item.cateName"
                  :label="item.cateName"
                  :value="item.cateName"
                ></el-option>
                <!-- <el-option label="特色粥品" value="特色粥品"></el-option>
              <el-option label="热销榜" value="热销榜"></el-option> -->
              </el-select>
              <!-- <el-input v-model="form.category"></el-input> -->
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000/goods/goods_img_upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <img :src="baseImgUrl + form.imgUrl" alt="" />
              </el-upload>
              <!-- <el-input v-model="form.imgUrl"></el-input> -->
            </el-form-item>
            <el-form-item label="商品描述" prop="goodsDesc">
              <el-input v-model="form.goodsDesc"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[2, 5, 10]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import moment from "moment";
import Card from "@/components/card";
import { goodList, edit, categories as getCateList } from "@/api/goods.js";
export default {
  async created() {
    this.getGoodList();
    const { categories } = await getCateList();
    this.categories = categories;
  },
  components: {
    Card,
  },
  data() {
    return {
      categories: [],
      dialogVisible: false,
      imageUrl: "",
      baseImgUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      total: 0, //总条数
      currentPage: 1, //当前页码
      pageSize: 2, //每页条数
      tableData: [],
      form: {
        id: "",
        name: "",
        category: "",
        price: "",
        goodsDesc: "",
        imgUrl: "",
      },
      //   currentRow: null,
    };
  },

  methods: {
    //上传图片
    handleAvatarSuccess(res, file) {
      const { code, imgUrl, msg } = res;
      //上传信息
      if (code == 0) {
        this.imageUrl = imgUrl;
        this.form.imgUrl = imgUrl;
        this.$message.success(msg);
        console.log(this.form.imgUrl);
      } else {
        this.$message.error(msg);
      }
    },
    //获取商品列表
    async getGoodList() {
      const { total, data } = await goodList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      this.total = total;

      //如果获取的数据为空数组,重置页码到第一页 再次获取数据
      if (data.length == 0 && this.currentPage != 1) {
        this.currentPage = 1;
        this.getGoodList();
      }
      data.forEach((v) => (v.ctime = moment(v.ctime).format("YY-MM-DD HH:MM:SS")));
      this.tableData = data;
    },
    //每页条数改变触发
    handleSizeChange(val) {
      //每页条数重置
      this.pageSize = val;
      //当前页码重置为1
      this.currentPage = 1;
      this.getGoodList();
    },
    //页码改变
    handleCurrentChange(val) {
      //重置为当前页的页码
      this.currentPage = val;
      this.getGoodList();
    },
    //编辑打开
    handleEdit(index, row) {
      // 打开模态框
      this.dialogVisible = true;
      //下次dom更新完执行回调函数
      this.$nextTick(() => {
        //打开就重置表单,
        this.$refs.form.resetFields();
        //再给form表单赋值回显信息
        this.form = { ...row };
      });
    },
    async submitForm() {
      console.log(this.form);
      const { code } = await edit({
        name: this.form.name,
        category: this.form.category,
        price: this.form.price,
        imgUrl: this.form.imgUrl,
        goodsDesc: this.form.goodsDesc,
        id: this.form.id,
      });
      if (code == 0) {
        this.dialogVisible = false;
        this.getGoodList();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
img {
  width: 30px;
  height: 30px;
}
</style>
