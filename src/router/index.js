import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Layout from '@/components/layout'
import local from "@/utils/local.js"
Vue.use(VueRouter)


//push方法组件间传递数据
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export const asyncRouter = [
  //订单模块
  {
    path: "/order",
    component: Layout,
    redirect: "/order/list",
    meta: {
      title: "订单管理"
    },
    leftMenu: {
      index: "/order",
      icon: "icon-weibiaoti-",
      text: "订单管理",
      hasChildren: false
    },
    children: [{
        path: "list",
        meta: {
          title: "订单列表"
        },
        component: () => import("@/views/order/List.vue")
      },
      {
        path: "detail",
        //页面间传参大量数据需要在router中写name
        name: "orderDetail",
        meta: {
          title: "订单详情"
        },
        component: () => import("@/views/order/Detail.vue"),
      },
    ]
  },
  //商品模块
  {
    path: "/goods",
    component: Layout,
    meta: {
      title: "商品管理"
    },
    leftMenu: {
      index: "/goods",
      icon: "icon-shangpin",
      text: "商品管理",
      hasChildren: true
    },
    children: [{
        path: "/goods/list",
        meta: {
          title: "商品列表"
        },
        leftMenu: {
          index: "/goods/list",
          text: "商品列表"
        },
        component: () => import("@/views/goods/List.vue"),
      },
      {
        path: "type",
        meta: {
          title: "商品分类"
        },
        leftMenu: {
          index: "/goods/type",
          text: "商品分类"
        },
        component: () => import("@/views/goods/Type.vue"),
      },
      {
        path: "add",
        meta: {
          title: "商品添加"
        },
        leftMenu: {
          index: "/goods/add",
          text: "商品添加"
        },
        component: () => import("@/views/goods/Add.vue"),
      },
    ]
  },
  //店铺
  {
    path: "/shop",
    component: Layout,
    roles: ["super"],
    meta: {
      title: "店铺管理"
    },
    leftMenu: {
      index: "/shop",
      icon: "icon-dianpu",
      text: "店铺管理",
      hasChildren: false
    },
    children: [{
      path: "",
      component: () => import("@/views/Shop.vue"),
    }]
  },
  //账号管理
  {
    path: "/account",
    component: Layout,
    roles: ["super", "normal"],
    meta: {
      title: "账号管理"
    },
    leftMenu: {
      index: "/account",
      icon: "icon-icon-",
      text: "账号管理",
      hasChildren: true
    },
    children: [{
        path: "list",
        roles: ["super"],
        meta: {
          title: "账号列表"
        },
        leftMenu: {
          index: "/account/list",
          text: "账号列表"
        },
        component: () => import("@/views/account/List.vue")
      },
      {
        path: "add",
        roles: ["super"],
        meta: {
          title: "账号添加"
        },
        leftMenu: {
          index: "/account/add",
          text: "添加账号"
        },
        component: () => import("@/views/account/Add.vue")
      },
      {
        path: "modifyPwd",
        roles: ["super", "normal"],
        meta: {
          title: "密码修改"
        },
        leftMenu: {
          index: "/account/modifyPwd",
          text: "修改密码"
        },
        component: () => import("@/views/account/ModifyPwd.vue")
      },
      {
        path: "personal",
        meta: {
          title: "个人中心"
        },
        leftMenu: {
          index: "/account/personal",
          text: "个人中心"
        },
        component: () => import("@/views/account/Personal.vue")
      }
    ]
  },
  //统计
  {
    path: "/total",
    component: Layout,
    meta: {
      title: "销售统计"
    },
    leftMenu: {
      index: "/total",
      text: "销售统计",
      icon: "icon-tongji",
      hasChildren: true
    },
    children: [{
        path: "goods",
        meta: {
          title: "商品统计"
        },
        leftMenu: {
          index: "/total/goods",
          text: "商品统计"
        },
        component: () => import("@/views/total/Goods.vue"),
      },
      {
        path: "order",
        meta: {
          title: "订单统计"
        },
        leftMenu: {
          index: "/total/order",
          text: "订单统计"
        },
        component: () => import("@/views/total/Order.vue"),
      },
    ]
  },
  //进入未授权路由，404
  // {
  //   path: "*",
  //   component: () => import("@/views/NotFound.vue")
  // }
]
//初始路由配置，刷新会触发，不在这个配置中，页面会空白
const routes = [{
    path: "/login",
    component: Login
  },
  //首页
  {
    path: "/",
    // meta:{
    //   title:"首页"
    // },
    component: Layout,
    leftMenu:{
      index:"/",
      icon:"icon-shouye",
      text:"后台首页"
    },
    children: [{
      path: "",
      component: () => import("@/views/Home.vue")
    }]
  },

]

const router = new VueRouter({
  mode: 'hash', //mode代表路由模式，它的默认值是hash模式，hash模式很丑，且不支持锚定向，
  // 所以如果希望有个漂亮的路由或支持锚定向，可以考虑使用history模式。具体的区别可以查看官方文档。
  base: process.env.BASE_URL,
  //base代表应用的基路径，process.env.BASE_URL是指从从环境进程中根据运行环境获取的api的base_url
  routes
  //routes 则是具体的路由配置列表，这个参数最核心也最关键
})

//根据传进来的路由配置和角色动态计算路由，根据不同角色过滤不同权限的路由
//router为首页路由，asyncRouter为其余需要判断权限的路由
export const filterRouter = (routes, role) => {
  //传入的路由过滤
  return routes.filter((item) => {
    //路由中不需要判断权限，就true
    if (!item.roles) {
      return true;
    } else {
      //需要判断权限
      //路由中有权限字段
      if (item.roles.includes(role)) {
        //存在子页面路由，递归
        if (item.children) {
          item.children = filterRouter(item.children, role);
        }
        //该路由有权限，返回true
        return true;
      } else {
        //该路由没有权限，返回false不进行路由跳转显示页面
        return false;
      }
    }
  });
};

//动态添加路由
export const creteRoutes = ()=>{
  console.log("动态添加路由")
  // 从本地存储获取角色 动态加载权限
  const rst = filterRouter(asyncRouter,local.get("role"))
  router.addRoutes(rst);
}

creteRoutes();//主动调一次 防止刷新出现页面空白 只会在页面刷新的时候执行一次,此后不会再执行

router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next()
  } else {
    if (local.get("tk") != undefined) {
      //tk为服务器返回的令牌
      next()
    } else {
      next("/login")
    }
  }
})
export default router