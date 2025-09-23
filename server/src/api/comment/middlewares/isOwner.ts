/**
 * `isOwner` middleware
 */

import type { Core } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
	return async (ctx, next) => {
		const user = ctx.state.user;
		const role = ctx.state.user.role;
		const entryId = ctx.params.id ? ctx.params.id : undefined;
		let entry: any = {};

		/**
		 * delete
		 */
		if (role.name === 'Authenticated') {
			if (entryId) {
				entry = await strapi.documents('api::address.address').findOne({
					documentId: entryId,
					populate: "*"
				});
			}
	
			if (user.id !== entry.user.id) {
				return ctx.unauthorized("This action is unauthorized.");
			} else {
				return next();
			}
		}
	};
};
