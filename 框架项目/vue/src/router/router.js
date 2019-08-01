import Vue from 'vue'
import Router from 'vue-router'

const Index = r => require.ensure([], () => r(require('../pages/Index')), 'Index')

// 首页
const Main = r => require.ensure([], () => r(require('../pages/sys/Main')), 'Main')

// 菜单1
const product = r => require.ensure([], () => r(require('../pages/sys/product')), 'product')

//产品
const product1 = r => require.ensure([], () => r(require('../pages/product/product-1')), 'product1')


let router = [{
    path: '/',
    component: Index,
    redirect: '/main',
    children: [{
        path: '/main',
        component: Main
    }, {
        path: '/product',
        component: product
    }, {
        path: '/product1',
        component: product1
    }]
}]

export default router