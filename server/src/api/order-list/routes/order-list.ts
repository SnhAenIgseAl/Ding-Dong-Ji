/**
 * order-list router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::order-list.order-list', {
    config: {
        find: {
            middlewares: ["api::order-list.is-owner"],
        },
        findOne: {
            middlewares: ["api::order-list.is-owner"],
        },
        update: {
            middlewares: ["api::order-list.is-owner"],
        }
    }
});
