import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/layout/Layout.vue'

Vue.use(Router)

export const constantRouterMap = [
	{
		path: '/redirect',
		component: Layout,
		hidden: true,
		children: [
			{
				path: '/redirect/:path*',
				component: () => import('@/views/redirect/index')
			}
		]
	},
	{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/errorPage/404'),
		hidden: true
	},
	{
		path: '/401',
		component: () => import('@/views/errorPage/401'),
		hidden: true
	},
	{
	    path: '',
	    component: Layout,
	    redirect: 'home',
	    children: [
	      {
	        path: 'home',
	        component: () => import('@/views/home/index'),
	        name: 'home',
	        meta: { title: 'home', icon: 'iconfont uxd-home', noCache: true }
	      }
	    ]
	},
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
//	{
//		path: '/home',
//		component: Layout,
//	    children: [
//	      {
//	        path: 'index',
//	        component: () => import('@/views/home/index'),
//	        name: 'home',
//	        meta: { 
//	        	title: 'home', 
//	        	icon: 'iconfont uxd-home', 
//	        	roles: ['role_sys', 'tcms']
//	        }
//	      }
//	    ]
//	},
	{
		path: '/content',
		component: Layout,
		redirect: 'contentlist',
		alwaysShow: true, // will always show the root menu
		meta: {
			title: 'contentlist',
			icon: 'iconfont uxd-content',
			roles: ['role_sys', 'tcms'] // you can set roles in root nav
		},
		children: [
			{
				path: 'content',
				component: () => import('@/views/content/index'),
				name: 'content',
				meta: {
					title: 'content',
					roles: ['role_sys', 'tcms'] // or you can only set roles in sub nav
				}
			},
			{
				path: 'work',
				component: () => import('@/views/content/work'),
				name: 'work',
				meta: {
					title: 'work',
					roles: ['role_sys'] // or you can only set roles in sub nav
				}
			},
			{
				path: 'category',
				component: () => import('@/views/content/category'),
				name: 'category',
				meta: {
					title: 'category',
					roles: ['role_sys', 'tcms'] // or you can only set roles in sub nav
				}
			}
		]
	},
	{ path: '*', redirect: '/404', hidden: true }
]
