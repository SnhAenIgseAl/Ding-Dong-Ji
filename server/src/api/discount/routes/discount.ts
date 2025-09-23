/**
 * discount router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::discount.discount', {
    config: {
        find: {
            middlewares: ['api::discount.is-owner']
        },
        findOne: {
            middlewares: ['api::discount.is-owner']
        }
    }
});
