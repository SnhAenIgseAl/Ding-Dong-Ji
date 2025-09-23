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
    }
}));
