import Layout from '../layout/index'
export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        meta: {
          name: '首页',
          icon: ''
        },
        component: () => import('../views/home')
      }
    ]
  },
  {
    path: '/echarts',
    component: Layout,
    children: [
      {
        path: '/echarts',
        meta: {
          name: 'echart图表',
          icon: ''
        },
        component: () => import('../views/echarts/index')
      }
    ]
  },
  {
    path: '/mavonEditor',
    component: Layout,
    children: [
      {
        path: '/mavonEditor',
        meta: {
          name: 'MD编辑器',
          icon: ''
        },
        component: () => import('../views/mavonEditor/index')
      }
    ]
  },
  {
    path: '/amap',
    component: Layout,
    meta: {
      name: "vue 外部插件",
    },
    children: [
      {
        path: '/amap',
        meta: {
          name: 'vue-amap 地图',
          icon: ''
        },
        // 详细到文件后缀，由于结构中存在多个index，避免冲突
        component: () => import('../views/amap/index.vue')
      },
      {
        path: '/treeSelect',
        meta: {
          name: 'vue-select组件',
          icon: ''
        },
        component: () => import('../views/treeSelect/index')
      }
    ]
  },
  {
    path: '/showFile',
    component: Layout,
    children: [
      {
        path: '/showFile',
        meta: {
          name: '文件上传展示',
          icon: ''
        },
        component: () => import('../views/showFile/index')
      }
    ]
  },
  {
    path: '/qrcode',
    component: Layout,
    children: [
      {
        path: '/qrcode',
        meta: {
          name: '二维码',
          icon: ''
        },
        component: () => import('../views/qrcode/index')
      }
    ]
  },
]