/**
 * store controller
 */

import { factories } from '@strapi/strapi'
import { isStoreOpening } from '../../../utils/common';

export default factories.createCoreController('api::store.store', ({ strapi }) => ({
    
    async find(ctx) {
        const storeListInfo = await super.find(ctx)
        storeListInfo.data.forEach(item => {
            item.is_operation = isStoreOpening(item)
        })

        return {
            data: storeListInfo.data,
            meta: storeListInfo.meta
        }
    },
    
    async findOne(ctx) {
        const storeInfo = await super.findOne(ctx)
        storeInfo.data.is_operation = isStoreOpening(storeInfo.data)

        return {
            data: storeInfo.data,
            meta: storeInfo.meta
        }
    },

    async update(ctx) {
        const user = ctx.state.user
        if (user.role.id !== 4) {
            ctx.unauthorized('You do not have permission to update this store')
        }

        const { data } = ctx.request.body
        
        const storeInfo = await strapi.documents('plugin::users-permissions.user').findOne({
            documentId: user.documentId,
            populate: 'store'
        }).then(res => res.store)

        const res = await strapi.documents('api::store.store').update({
            documentId: storeInfo.documentId,
            data: {
                ...data
            },
            status: 'published'
        })

        return {
            code: 0,
            message: '更新成功',
            data: res,
        }
    },

    async me(ctx) {
        const userId = ctx.state.user.documentId

        const storeInfo = await strapi.documents('plugin::users-permissions.user').findOne({
            documentId: userId,
            populate: 'store'
        }).then(res => res.store)

        return {
            code: 0,
            message: 'success',
            data: storeInfo
        }
    },

    async bind(ctx) {
        const user = ctx.state.user
        const { data } = ctx.request.body

        const userInfo = await strapi.documents('plugin::users-permissions.user').findOne({
            documentId: user.documentId,
            populate: 'store'
        })

        if (userInfo?.store) {
            return {
                code: -1,
                message: '已绑定店铺，请先解绑'
            }
        }

        const storeInfo = await strapi.documents('api::store.store').findOne({
            documentId: data.documentId,
            populate: 'user'
        })

        if (storeInfo?.user) {
            return {
                code: -2,
                message: '该店铺已被绑定，请选择其他分店'
            }
        }

        const res = await strapi.documents('api::store.store').update({
            documentId: data.documentId,
            data: {
                user: {
                    documentId: user.documentId
                }
            },
            status: 'published'
        })

        return {
            code: 0,
            message: '绑定成功',
            data: res
        }
    }
}));
