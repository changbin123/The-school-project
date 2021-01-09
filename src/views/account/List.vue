<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号列表</span>
      </div>
      <div class="content">
        <!-- 表格 -->
        <template>
          <el-table
            :data="tableData"
            style="width: 100%"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="account" label="账号" width="180"> </el-table-column>
            <el-table-column prop="userGroup" label="用户组" width="180">
            </el-table-column>
            <el-table-column prop="ctime" label="创建时间"> </el-table-column>
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
              :rules="rules"
            >
              <el-form-item label="账号" prop="account">
                <el-input v-model="form.account"></el-input>
              </el-form-item>
              <!-- <el-form-item label="密码" prop="pwd">
                <el-input v-model="form.pwd"></el-input>
              </el-form-item> -->
              <el-form-item label="用户组" prop="userGroup">
                <el-select v-model="form.userGroup" placeholder="请选择用户组">
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                  <el-option label="普通管理员" value="普通管理员"></el-option>
                </el-select>
              </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </span>
          </el-dialog>
        </template>
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
        <!-- 按钮 -->
        <div>
          <el-button type="danger" size="small" @click="bathDel">批量删除</el-button>
          <el-button type="primary" size="small" @click="toggleSelection()"
            >取消选择</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import moment from "moment";
import {
  accountList,
  accountUpdate,
  accountDel,
  accountBatchDel,
} from "@/api/account.js";
export default {
  created() {
    this.getAccountList();
  },
  data() {
    return {
      currentPage: 1, //当前页码
      pageSize: 2, //每页条数
      total: 0, //总条数
      multipleSelection: [], //保存选中的
      dialogVisible: false, //是否弹框
      //账户信息
      form: {
        id: "",
        account: "",
        userGroup: "",
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" },
        ],
        //自定义验证

        userGroup: { required: true, message: "请输入用户组", trigger: "change" },
      },
      tableData: [],
    };
  },
  methods: {
    //获取用户列表
    async getAccountList() {
      const { total, data } = await accountList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      this.total = total;

      //如果获取的数据为空数组,重置页码到第一页 再次获取数据
      if (data.length == 0 && this.currentPage != 1) {
        this.currentPage = 1;
        this.getAccountList();
      }
      data.forEach((v) => (v.ctime = moment(v.ctime).format("YY-MM-DD HH:MM:SS")));
      this.tableData = data;
    },
    //编辑
    handleEdit(index, row) {
      // 打开模态框
      this.dialogVisible = true;
      //下次dom更新完执行回调函数
      this.$nextTick(() => {
        //打开就重置表单
        this.$refs.form.resetFields();
        //再给form表单赋值回显信息
        this.form = { ...row };
      });
    },
    //单个删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { code, msg } = await accountDel({ id: row.id });

          this.getAccountList(); //重新获取新数据
        })
        .catch(() => {});
    },
    //当勾选改变的时候触发
    handleSelectionChange(val) {
      //val就是选中的值 是一个数组
      //数组里面每一个对象是每一行的form信息
      this.multipleSelection = val;
    },
    //批量删除
    bathDel() {
      //删除选中的行里的全部form
      console.log(this.multipleSelection);
    },
    //取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleClose(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].resetFields();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { code, msg } = await accountUpdate(this.form);
          this.dialogVisible = false; //关闭模态框
          this.getAccountList(); //重新获取新数据
        } else {
          console.log("error");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //每页条数改变触发
    handleSizeChange(val) {
      //每页条数重置
      this.pageSize = val;
      //当前页码重置为1
      this.currentPage = 1;
      this.getAccountList();
    },
    //页码改变
    handleCurrentChange(val) {
      //重置为当前页的页码
      this.currentPage = val;
      this.getAccountList();
    },
  },
};
</script>

<style lang="less" scoped></style>
