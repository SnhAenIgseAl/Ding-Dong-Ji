/**
 * address controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::address.address', ({ strapi }) => ({
    async create(ctx) {
        const userId = ctx.state.user.documentId
        const { data } = ctx.request.body

        const res = await strapi.documents('api::address.address').create({
            data: {
                ...data,
                user: userId
            },
            status: 'published'
        })

        return {
            code: 0,
            message: '添加地址成功',
            data: res
        }
    },

    async update(ctx) {
        const userId = ctx.state.user.documentId
        const { data } = ctx.request.body

        const res = await strapi.documents('api::address.address').update({
            documentId: ctx.params.id,
            data: {
                ...data,
                user: userId
            },
            status: 'published'
        })

        return {
            code: 0,
            message: '更新地址成功',
            data: res
        }
    },
    
    async delete(ctx) {
        let data = await super.findOne(ctx)
        if (!data) {
            return {
                code: -1,
                message: '地址不存在'
            }
        }

        await strapi.documents('api::address.address').delete({
            documentId: ctx.params.id
        })

        return {
            code: 0,
            message: '删除成功'
        }
    }
}));
