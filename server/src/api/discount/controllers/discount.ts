/**
 * discount controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::discount.discount', ({ strapi }) => ({
    async create(ctx) {

        const userId = ctx.state.user.id

        const vipInfo = await strapi.documents('api::vip.vip').findFirst({
            filters: {
                user: userId
            }
        })
        if (!vipInfo) {
            return {
                code: -1,
                message: '非会员用户无法领取优惠券'
            }
        }

        const MIN_REACH = 28.8
        const MAX_REACH = 98.8
        const MIN_SUBTRACT = 8.8
        const MAX_SUBTRACT = 28.8

        const randomReach = Math.floor(Math.random() * (MAX_REACH - MIN_REACH + 1)) + MIN_REACH
        const readomSubtract = Math.floor(Math.random() * (MAX_SUBTRACT - MIN_SUBTRACT + 1)) + MIN_SUBTRACT
        
        const name = `满${randomReach}减${readomSubtract}元`
        const deadlineDay = 7

        const discountInfo = await strapi.documents('api::discount.discount').create({
            data: {
                reach: randomReach,
                subtract: readomSubtract,
                discount_name: name,
                deadline: new Date().getTime() + 1000 * 60 * 60 * 24 * deadlineDay,
                is_used: false,
                user: userId
            },
            status: 'published'
        })

        return {
            code: 0,
            message: '领取成功',
            data: discountInfo
        }
    }
}));
