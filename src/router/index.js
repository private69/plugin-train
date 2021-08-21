import Vue from 'vue'
import VueRouter from 'vue-router';
import Layout from '../layout/index'
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/',
          component: () => import('../views/home')
        }
      ]
    },
    {
      path: '/amap',
      component: Layout,
      children: [
        {
          path: '/amap',
          // 详细到文件后缀，由于结构中存在多个index，避免冲突
          component: () => import('../views/amap/index.vue')
        }
      ]
    },
  ]
})