/**
 * comment router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::comment.comment', {
    config: {
        // create: {
        //     middlewares: ['api::comment.is-self']
        // },
        find: {
            middlewares: ['api::comment.shadow-ban']
        },
        findOne: {
            middlewares: ['api::comment.shadow-ban']
        },
        delete: {
            middlewares: ['api::comment.is-owner']
        }
    }
});
