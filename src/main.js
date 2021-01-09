import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
//引入reset.css
import "@/assets/reset.css"
//引入element.css
import 'element-ui/lib/theme-chalk/index.css';

//引入阿里巴巴矢量图标库
import "@/assets/iconfont/iconfont.css"

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();//中央事件总线

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
