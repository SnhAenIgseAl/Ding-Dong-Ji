/**
 * `isOwner` middleware
 */

import type { Core } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
	return async (ctx, next) => {
		const user = ctx.state.user;
		const entryId = ctx.params.id ? ctx.params.id : undefined;
		let entry: any = {};

		/**
		 * find
		 */
		if (ctx.request.method === "GET" && !entryId) {
			ctx.query = {
				...ctx.query,
				filters: {
					user: {
						id: {
							$eq: user.id,
						},
					},
					...ctx.query.filters
				}
			}
			return next()
		}

		/**
		 * fineOne
		 */
		if (entryId) {
			entry = await strapi.documents('api::discount.discount').findOne({
				documentId: entryId,
				populate: "*"
			});
		}

		if (user.id !== entry.user.id) {
			return ctx.unauthorized("This action is unauthorized.");
		} else {
			return next();
		}
	};
};
