import Layout from '@/layout/index'
/**
 * 单栏目
 * {
 *   path,component,children:[ {path,meta(name,icon),component} ]
 * }
 * 包含子栏目
 * {
 *   path
 *   meta: { name }
 *   children: [
 *      { path,meta(name,icon),component},{...}
 *   ]
 * }
 */
export default [
    {
        path: '/',
        component: Layout,
        children: [{
            path: '/',
            meta: {
                name: '首页',
                icon: ''
            },
            component: () =>
                import('@/views/home')
        }]
    },
    {
        path: '/dragger',
        component: Layout,
        meta: {
            name: "拖拽"
        },
        children: [
            {
                path: '/drgger-com',
                meta: {
                    name: '拖拽组件',
                    icon: ''
                },
                component: () => import('@/views/dragger'),
            },
            {
                path: '/drgger-map',
                meta: {
                    name: '地图',
                    icon: ''
                },
                component: () => import('@/views/dragger'),
            }
        ]
    },
    {
        path: '/echarts',
        component: Layout,
        children: [{
            path: '/echarts',
            meta: {
                name: 'echart图表',
                icon: ''
            },
            component: () =>
                import('@/views/echarts/index')
        }]
    },
    {
        path: '/mavonEditor',
        component: Layout,
        children: [{
            path: '/mavonEditor',
            meta: {
                name: 'MD编辑器',
                icon: ''
            },
            component: () =>
                import('@/views/mavonEditor/index')
        }]
    },
    {
        path: '/amap',
        component: Layout,
        meta: {
            name: "vue 外部插件",
        },
        children: [{
            path: '/amap',
            meta: {
                name: 'vue-amap 地图',
                icon: ''
            },
            // 详细到文件后缀，由于结构中存在多个index，避免冲突
            component: () =>
                import('@/views/amap/index.vue')
        },
        {
            path: '/treeSelect',
            meta: {
                name: 'vue-select组件',
                icon: ''
            },
            component: () =>
                import('@/views/treeSelect/index')
        }
        ]
    },
    {
        path: '/showFile',
        component: Layout,
        children: [{
            path: '/showFile',
            meta: {
                name: '文件上传展示',
                icon: ''
            },
            component: () =>
                import('@/views/showFile/index')
        }]
    },
    {
        path: '/qrcode',
        component: Layout,
        children: [{
            path: '/qrcode',
            meta: {
                name: '二维码',
                icon: ''
            },
            component: () =>
                import('@/views/qrcode/index')
        }]
    },
    {
        path: '/gotoNewWins',
        component: Layout,
        children: [{
            path: '/gotoNewWins',
            meta: {
                name: '跳转新窗口',
                icon: ''
            },
            component: () =>
                import('@/views/newWins/index')
        }]
    },

]