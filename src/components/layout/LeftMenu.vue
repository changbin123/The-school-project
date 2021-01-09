<template>
  <div class="left">
    <div class="left_top">
      <i class="iconfont icon-ziyuan"></i>
      外卖商家中心
    </div>
    <el-menu
      router
      unique-opened
      text-color="#fff"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#304156"
    >
      <div v-for="item in filterRouter" :key="item.path">
        <!-- 判断有没有leftmenu -->
        <div v-if="item.leftMenu">
          <!-- 判断有没有子 -->
          <div v-if="item.leftMenu.hasChildren">
            <el-submenu :index="item.leftMenu.index">
              <template slot="title">
                <i :class="['iconfont', item.leftMenu.icon]"></i>
                <span>{{ item.leftMenu.text }}</span>
              </template>
              <!-- 子组件页面 -->
              <el-menu-item
                v-for="subItem in item.children"
                :key="subItem.leftMenu.index"
                :index="subItem.leftMenu.index"
                >{{ subItem.leftMenu.text }}</el-menu-item
              >
            </el-submenu>
          </div>
          <div v-else>
            <!-- 没有子页面：首页、订单管理 -->
            <el-menu-item :index="item.leftMenu.index">
              <i :class="['iconfont', item.leftMenu.icon]"></i>
              <span slot="title">{{ item.leftMenu.text }}</span>
            </el-menu-item>
          </div>
        </div>
      </div>
      <!-- <el-menu-item index="/">
        <i class="iconfont icon-shouye"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>

      <el-menu-item index="/order/list">
        <i class="iconfont icon-weibiaoti-"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>

   
      <el-submenu index="3">
        <template slot="title">
          <i class="iconfont icon-shangpin"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="/goods/list">商品列表</el-menu-item>
        <el-menu-item index="/goods/add">商品添加</el-menu-item>
        <el-menu-item index="/goods/type">商品分类</el-menu-item>
      </el-submenu>

      <el-menu-item index="/shop">
        <i class="iconfont icon-dianpu"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>

      <el-submenu index="5">
        <template slot="title">
          <i class="iconfont icon-icon-"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item index="/account/add">账号添加</el-menu-item>
        <el-menu-item index="/account/list">账号列表</el-menu-item>
        <el-menu-item index="/account/modifyPwd">密码修改</el-menu-item>
        <el-menu-item index="/account/personal">个人中心</el-menu-item>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title">
          <i class="iconfont icon-tongji"></i>
          <span>销售统计</span>
        </template>
        <el-menu-item index="/total/goods">商品统计</el-menu-item>
        <el-menu-item index="/total/order">订单统计</el-menu-item>
      </el-submenu> -->
    </el-menu>
  </div>
</template>

<script>
import router, { asyncRouter, filterRouter, creteRoutes } from "@/router";
// import { getRole } from "@/api/account";
import local from "@/utils/local";
export default {
  //左边栏选项路由
  async created() {
    //获取后台给的权限role
    // const { role } = await getRole();
    //过滤动态路由,每有权限就去掉
    // const rst = filterRouter(asyncRouter, role);
    //在首页路由上加上过滤后的路由
    // router.addRoutes(rst);

    creteRoutes();
    const rst = filterRouter(asyncRouter, local.get("role"));
    this.filterRouter = [...this.$router.options.routes, ...rst];

    // console.log( filterRouter(asyncRouter,"normal") );
    //传入需要判断权限的路由，和后端传回的权限
    // router.addRoutes(filterRouter(asyncRouter, role));
  },
  data() {
    return {
      filterRouter: [],
    };
  },
};
</script>

<style lang="less" scoped>
.left {
  // flex: 0 0 200px;
  background-color: #304156;
  .left_top {
    color: #fff;
    font-size: 18px;
    margin: 15px 0 10px 20px;
    i {
      color: #304156;
      font-size: 20px;
      padding: 5px;
      border-radius: 50%;
      background: rgb(77, 160, 255);
    }
  }
  .el-menu {
    width: 200px;
    border-right: 0;
    .iconfont {
      margin-right: 10px;
    }
    .el-submenu {
      .el-menu-item {
        padding-left: 60px;
      }
    }
  }
}
</style>
