<template>
  <div class="login">
    <div class="login-box">
      <p>系统登录</p>

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input
            prefix-icon="iconfont icon-icon-"
            v-model="ruleForm.account"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            @click.native="zhengbi"
            @keyup.enter.native="submitForm('ruleForm')"
            prefix-icon="iconfont icon-mimasuo"
            :type="isClose ? 'password' : 'text'"
            v-model="ruleForm.password"
            autocomplete="off"
            :suffix-icon="
              isClose ? 'iconfont icon-yanjing-bi' : 'iconfont icon-yanjing-zheng'
            "
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login, getRole } from "@/api/account.js";
import local from "@/utils/local.js";
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        callback();
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9\W]{6,16}$/;
      if (reg.test(value)) {
        //成功
        // if (this.ruleForm.checkPass !== "") {
        //   this.$refs.ruleForm.validateField("checkPass");
        // }
        callback();
      } else {
        //传了Error对象就是失败
        callback(new Error("密码必须是6到16位字母或者数字"));
      }
    };
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.ruleForm.pass) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      ruleForm: {
        password: "",
        // checkPass: "",
        account: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        // checkPass: [{ validator: validatePass2, trigger: "blur" }],
        account: [{ validator: checkName, trigger: "blur" }],
      },
      isClose: true,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        //valid是一个bool值，验证成功为true
        if (valid) {
          const { code, msg, token } = await login(this.ruleForm);
          if (code == 0) {
            local.set("tk", token);
            const { role } = await getRole();
            //获取角色 村到本地存储
            local.set("role", role);
            this.$router.push("/");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    zhengbi(e) {
      //e.target就是事件DOM对象
      if (e.target.className.includes("icon-yanjing")) {
        this.isClose = !this.isClose;
      }
    },
  },
};
</script>

<style lang="less" scope>
.login {
  height: 100%;
  background: #304156;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    > p {
      width: 100%;
      text-align: center;
      font-size: 30px;
      color: #fff;
      margin-bottom: 35px;
    }
    .el-form {
      width: 500px;
      margin-right: 50px;
      .el-form-item:last-child {
        width: 500px;
        .el-button {
          width: 100%;
        }
      }
    }
  }
}
</style>
