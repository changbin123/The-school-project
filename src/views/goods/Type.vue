<template>
  <div>
    <Card>
      <div slot="title" class="title">
        <span>商品分类</span>
        <el-button type="primary" size="small" @click="dialogVisible = true"
          >添加分类</el-button
        >
        <!-- 弹出框 -->
        <el-dialog title="添加分类" :visible.sync="dialogVisible" width="30%">
          <el-form :model="form" label-width="100px" class="demo-ruleForm" size="small">
            <el-form-item label="商品分类" prop="cateName">
              <el-input v-model="form.cateName"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" width="200" prop="state">
              <el-switch
                v-model="form.state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
          </span>
        </el-dialog>
      </div>

      <div slot="content">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="序号" type="index" width="50"> </el-table-column>
          <el-table-column label="商品分类" width="300">
            <!-- 作用域插槽 -->
            <template slot-scope="scope">
              <p v-show="!scope.row.isEdit">{{ scope.row.cateName }}</p>
              <el-input v-show="scope.row.isEdit" v-model="scope.row.cateName"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="是否启用" width="200">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.state"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                v-show="!scope.row.isEdit"
                size="mini"
                @click="scope.row.isEdit = true"
                >编辑</el-button
              >
              <el-button
                v-show="scope.row.isEdit"
                type="success"
                size="mini"
                @click="editcate(scope.row)"
                >完成</el-button
              >
              <el-button size="mini" type="danger" @click="delcate(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
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
import { goodCate, editcate, delcate, addcate } from "@/api/goods.js";
export default {
  created() {
    this.getGoodCate();
  },
  components: {
    Card,
  },
  data() {
    return {
      dialogVisible: false,
      total: 0, //总条数
      currentPage: 1, //当前页码
      pageSize: 5, //每页条数
      tableData: [],
      form: {
        cateName: "",
        state: true,
      },
    };
  },

  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    //获取商品分类
    async getGoodCate() {
      const { total, data } = await goodCate({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      //如果获取的数据为空数组,重置页码到第一页 再次获取数据
      // if (data.length == 0 && this.currentPage != 1) {
      //   this.currentPage = 1;
      //   this.getGoodCate();
      // }
      data.forEach((element) => {
        element.isEdit = false;
        element.state = !!parseInt(element.state);
      });
      this.tableData = data;
      this.total = total;
    },
    //每页条数改变触发
    handleSizeChange(val) {
      //每页条数重置
      this.pageSize = val;
      //当前页码重置为1
      this.currentPage = 1;
      this.getGoodCate();
    },
    //页码改变
    handleCurrentChange(val) {
      //重置为当前页的页码
      this.currentPage = val;
      this.getGoodCate();
    },
    // 修改分类
    async editcate(row) {
      //可以直接返row
      const { code } = await editcate({
        id: row.id,
        cateName: row.cateName,
        state: row.state,
      });
      if (code == 0) {
        row.isEdit = false;
      }
    },
    // 删除分类
    delcate(row) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { code } = await delcate({ id: row.id });
          //如果删除成功 ,重新加载数据
          if (code == 0) {
            this.getGoodCate();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async submitForm() {
      const { code } = await addcate(this.form);
      if (code == 0) {
        this.dialogVisible = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
