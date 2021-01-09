<template>
  <div class="RightHead">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in menuArr" :key="item.meta.title"
        >{{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="xiala">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link"
          >欢迎你，{{ accountInfo.account }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personal">个人中心</el-dropdown-item>
          <el-dropdown-item command="out">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <img :src="accountInfo.imgUrl" alt="" />
      <!-- require动态引用静态资源，链接后端就直接用线上地址 -->
    </div>
  </div>
</template>

<script>
import local from "@/utils/local.js";
import { accountinfo } from "@/api/account.js";
export default {
  created() {
    //监听到头像修改,重新获取数据
    this.$bus.$on("avataredit", () => {
      this.getAccountInfo();
    });
    this.setmenuArr();
    this.getAccountInfo();
  },
  data() {
    return {
      menuArr: [],
      accountInfo: {},
    };
  },
  methods: {
    async getAccountInfo() {
      const { accountInfo } = await accountinfo();
      //把个人账户信息到本地存储,方便在个人中心页获取
      local.set("accountInfo", accountInfo);
      this.accountInfo = accountInfo;
    },
    setmenuArr() {
      this.menuArr = this.$route.matched.filter((v) => v.meta.title); //过滤没有title属性的
    },
    handleCommand(command) {
      if (command == "personal") {
        this.$router.push("/account/personal"); //个人中心为首页
      } else {
        local.clear();
        this.$router.push("/login");
        //刷新页面,取消上一次的权限影响
        location.reload();
      }
    },
  },
  watch: {
    "$route.path"(newVal, oldVal) {
      this.setmenuArr();
    },
  },
};
</script>

<style lang="less" scoped>
.RightHead {
  height: 50px;
  background: #fff;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .xiala {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin: 0 20px;
    }
  }
}
</style>
