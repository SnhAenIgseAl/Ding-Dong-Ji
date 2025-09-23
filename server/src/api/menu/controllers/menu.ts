/**
 * menu controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::menu.menu', ({ strapi }) => ({
    async changeStoreOwn(ctx) {
        const { id } = ctx.params
        const { action } = ctx.request.body

        console.log(id, action);
        

        const storeInfo = await strapi.documents('api::store.store').findFirst({
            filters: {
                user: {
                    id: ctx.state.user.id
                }
            }
        })

        let menu

        // 售空
        if (action === 0) {
            menu = await strapi.documents('api::menu.menu').update({
                documentId: id,
                data: {
                    stores: {
                        disconnect: [storeInfo.documentId]
                    } 
                },
                status: 'published'
            })
        }

        // 上架
        if (action === 1) {
            menu = await strapi.documents('api::menu.menu').update({
                documentId: id,
                data: {
                    stores: [storeInfo.documentId]
                },
                status: 'published'
            })
        }

        return {
            code: 0,
            message: 'success',
            data: menu
        }
    }   
}));
