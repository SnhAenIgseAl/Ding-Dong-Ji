/**
 * address router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::address.address', {
    config: {
        find: {
            middlewares: ["api::address.is-owner"]
        },
        findOne: {
            middlewares: ["api::address.is-owner"]
        },
        update: {
            middlewares: ["api::address.is-owner"]
        },
        delete: {
            middlewares: ["api::address.is-owner"]
        }
    }
});
