<template>
  <div>
    <Card>
      <p slot="title">修改密码</p>
      <div slot="content">
        <el-form
          size="small"
          :model="form"
          status-icon
          :rules="rules"
          ref="form"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="oldPwd">
            <el-input type="text" v-model="form.oldPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input type="text" v-model="form.newPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPwd">
            <el-input type="text" v-model="form.confirmPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">提交</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Card>
  </div>
</template>

<script>
import { PWD_REG } from "@/utils/utils.js";
import Card from "@/components/card";
import { checkoldpwd, updatepwd } from "@/api/account.js";
export default {
  components: {
    Card,
  },
  data() {
    const validatePass = async (rule, value, callback) => {
      if (PWD_REG.test(value)) {
        const { code, msg } = await checkoldpwd({ oldPwd: value });
        code == "00" ? callback() : callback(new Error(msg));
      } else {
        callback(new Error("请输入6~16位数字或者字母"));
      }
    };
    const validateNewPass = (rule, value, callback) => {
      if (PWD_REG.test(value)) {
        if (value == this.form.oldPwd) {
          callback(new Error("新密码和原密码不能一致"));
        } else {
          if (this.form.confirmPwd) {
            //如果确认密码存在 就重新校验确认密码
            this.$refs.form.validateField("confirmPwd");
            callback();
          } else {
            callback();
          }
        }
      } else {
        callback(new Error("请输入6~16位数字或者字母"));
      }
    };
    const validateConfirmPass = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入6~16位数字或者字母"));
      } else if (value != this.form.newPwd) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: "",
      },
      rules: {
        oldPwd: { required: true, validator: validatePass, trigger: "blur" },
        newPwd: { required: true, validator: validateNewPass, trigger: "blur" },
        confirmPwd: { required: true, validator: validateConfirmPass, trigger: "blur" },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        console.log(123);
        if (valid) {
          console.log(valid);
          const { code, msg } = await updatepwd({ newPwd: this.form.newPwd });
        } else {
          console.log(2222);
          console.log("error submit!!");
          return false;
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
