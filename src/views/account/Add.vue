<template>
  <div>
    <Card>
      <p slot="title">添加账号</p>
      <div slot="content">
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
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="用户组" prop="userGroup">
            <el-select v-model="form.userGroup" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
            <el-button @click="resetForm('form')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/card";
import { PWD_REG } from "@/utils/utils.js";
import { accountAdd } from "@/api/account.js";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (PWD_REG.test(value)) {
        callback();
      } else {
        callback(new Error("密码必须是6~16位字母或者数字"));
      }
    };
    return {
      form: {
        account: "",
        password: "",
        userGroup: "",
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" },
        ],
        //自定义验证
        password: { required: true, validator: validatePass, trigger: "blur" },
        userGroup: { required: true, message: "请输入用户组", trigger: "change" },
      },
    };
  },
  components: {
    Card,
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { code, msg } = await accountAdd(this.form);
        } else {
          console.log("error");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-input {
  width: 300px;
}
</style>
