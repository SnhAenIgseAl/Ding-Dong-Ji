/**
 * custom controller
 */

import { factories } from '@strapi/strapi'
import { formatDate, groupBy } from '../../../utils/common';

export default factories.createCoreController('api::custom.custom', ({ strapi }) => ({
    
    // 修改用户信息
    async updateMe(ctx) {
        const userId = ctx.state.user.documentId
        const { data } = ctx.request.body

        const res = await strapi.documents('plugin::users-permissions.user').update({
            documentId: userId,
            data: {
                ...data
            },
            fields: ['id', 'email', 'username', 'avatar', 'updatedAt', 'publishedAt'],
        })

        return {
            code: 0,
            message: 'success',
            data: res
        }
    },
    
    // 获取vip
    async getVip(ctx) {
        const userId = ctx.state.user.id

        const vipInfo = await strapi.documents('api::vip.vip').findFirst({
            filters: {
                user: userId
            }
        })

        if (vipInfo) {
            return {
                code: -1,
                message: '已经是狗椒大会员了',
                data: vipInfo
            }
        } else {
            const data = await strapi.documents('api::vip.vip').create({
                data: {
                    VIP_level: 1,
                    user: userId,
                    deadline: new Date().getTime() + 1000 * 60 * 60 * 24 * 30
                },
                status: 'published'
            })
    
            return {
                code: 0,
                message: '成为狗椒大会员成功',
                data: data
            }
        }
    },

    /**
     * 获取最近订单统计数据
     * @param ctx 
     */
    async getTotalRecent(ctx) {
        const recentData = await strapi.documents('api::order-list.order-list').findMany({
            limit: 10000,
            start: 0
        })

        let price: number = 0

        const today = recentData.map(item => {
            let mode: string = item.order_mode

            if (mode === 'outside') mode = '外卖'
            if (mode === 'dine_in') mode = '堂食'
            if (mode === 'takeout') mode = '外带'

            price += item.order_price

            return {
                ...item,
                createdAt: formatDate(item.createdAt as Date),
                createdDate: formatDate(item.createdAt as Date).split(' ')[0],
                order_mode: mode
            }
        })

        return {
            code: 0,
            message: 'success',
            data: {
                origin: today,
                data: groupBy(today, 'createdDate'),
                count: today.length,
                price: parseFloat(price.toFixed(2))
            }
        }
    },

    /**
     * 获取今日订单统计数据
     * @param ctx 
     */
    async getTotalToday(ctx) {
        const todayData = await strapi.documents('api::order-list.order-list').findMany({
            filters: {
                createdAt: {
                    $between: [
                        new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
                        new Date(new Date().setHours(23, 59, 59, 999)).toISOString()
                    ]
                }
            },
            limit: 1000,
            start: 0
        })

        let price: number = 0

        const today = todayData.map(item => {
            let mode: string = item.order_mode

            if (mode === 'outside') mode = '外卖'
            if (mode === 'dine_in') mode = '堂食'
            if (mode === 'takeout') mode = '外带'

            price += item.order_price

            return {
                ...item,
                createdAt: formatDate(item.createdAt as Date),
                createdDate: formatDate(item.createdAt as Date).split(' ')[0],
                order_mode: mode
            }
        })

        return {
            code: 0,
            message: 'success',
            data: {
                origin: today,
                data: groupBy(today, 'createdDate'),
                count: today.length,
                price: parseFloat(price.toFixed(2))
            }
        }
    }
}));
