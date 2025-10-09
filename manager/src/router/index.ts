import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores'
import resultRoutes from './result'

const getUserStore = async () => {
    return useUserStore()
}

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/total'
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/error/404'
	},
    {
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/login.vue')
	},
	{
		path: '/total',
		name: 'total',
		component: () => import('@/views/total/total.vue')
	},
	{
		path: '/order',
		name: 'order',
		component: () => import('@/views/order/order.vue')
	},
	{
		path: '/order/:id',
		name: 'orderDetail',
		component: () => import('@/views/order/detail.vue')
	},
	{
		path: '/menu',
		name: 'menu',
		component: () => import('@/views/menu/menu.vue')
	},
	{
		path: '/comment',
		name: 'comment',
		component: () => import('@/views/comment/comment.vue')
	},
	{
		path: '/store',
		name: 'store',
		component: () => import('@/views/store/store.vue')
	},
	{
		path: '/store/register',
		name: 'storeRegister',
		component: () => import('@/views/store/register.vue')
	},
	{
		path: '/store/bind',
		name: 'storeBind',
		component: () => import('@/views/store/bind.vue')
	},
	{
		path: '/user',
		name: 'user',
		component: () => import('@/views/user/user.vue')
	},
	{
		path: '/user/reset-password',
		name: 'resetPassword',
		component: () => import('@/views/user/resetPassword.vue')
	},
	{
		path: '/fake-data',
		name: 'fakeData',
		component: () => import('@/views/fakeData/fakeData.vue')
	},
	...resultRoutes
]

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
})

router.beforeEach(async (to, from, next) => {
	const userStore = await getUserStore()

	// 正则匹配错误页面路径
	const errPage = /^\/error\/\d{3}$/
	console.log(userStore.userState)

	const isLogin = userStore.isLogin
	const isAdmin = userStore.userState?.is_admin
	const storeInfo = userStore.userState?.store

	if (to.path !== '/login' && !userStore.isLogin) {
		next({ path: '/login' })
	}

	if (to.path === '/store/bind' && isLogin && isAdmin) {
		next()
	}

	if (isLogin) {
		if (isAdmin) {
			if (storeInfo !== null) {
				next()
			} else {
				next({ path: '/store/bind' })
			}
		} else {
			if (errPage.test(to.path)) {
				next()
			}
			next({ path: '/error/403' })
		}
	}

	next()
})

export default router