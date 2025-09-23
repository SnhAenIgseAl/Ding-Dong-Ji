import { RouteRecordRaw } from 'vue-router'

const resultRoutes: RouteRecordRaw[] = [
    {
        path: '/error/:code',
        name: 'error',
        component: () => import('@/views/result/error.vue')
    }
]

export default resultRoutes