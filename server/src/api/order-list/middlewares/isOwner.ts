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
		 * 分店管理员
		 */
		if (role.name === "StoreAdmin") {
			const { store } = await strapi.documents('plugin::users-permissions.user').findFirst({
				filters: {
					id: user.id
				},
				populate: 'store'
			})

			if (ctx.request.method === "GET" && !entryId) {
				ctx.query = {
					...ctx.query,
					filters: {
						store: {
							id: store.id,
						},
						...ctx.query.filters
					},
				}
				return next()
			}

			if (entryId) {
				entry = await strapi.documents('api::order-list.order-list').findOne({
					documentId: entryId,
					populate: "*"
				});
				
				if (store.id !== entry.store.id) {
					return ctx.unauthorized("非本店管理员，无权操作");
				} else {
					return next();
				}
			}
		}

		/**
		 * 用户
		 */
		if (role.name === "Authenticated") {
			if (ctx.request.method === "GET" && !entryId) {
				ctx.query = {
					...ctx.query,
					filters: {
						user: {
							id: user.id,
						},
						...ctx.query.filters
					},
				}
				return next()
			}

			if (entryId) {
				entry = await strapi.documents('api::order-list.order-list').findOne({
					documentId: entryId,
					populate: "*"
				});
				console.log(entry);
				if (user.id !== entry.user.id) {
					return ctx.unauthorized("非本用户，无权操作");
				} else {
					return next();
				}
			}
		}
	};
};
