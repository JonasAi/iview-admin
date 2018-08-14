export default [{
    path: '/login',
    component: resolve => require(['../page/login/index.vue'], resolve)
}, {
    path: '/',
    component: resolve => require(['../page/index/index.vue'], resolve),
    children: [{
        path: '/',
        meta: {
            parent: '后台首页'
        },
        component: resolve => require(['../page/index/home.vue'], resolve)
    }]
}];