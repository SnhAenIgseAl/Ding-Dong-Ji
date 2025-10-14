/**
 * `isOwner` middleware
 */

import type { Core } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
	return async (ctx, next) => {
		const user = ctx.state.user;
		const role = ctx.state.user.role;
		const entryId = ctx.params.id ? ctx.params.id : undefined;
		
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
							documentId: store.documentId,
						},
						...ctx.query.filters
					},
				}
				console.log(ctx.query.filters);
				
				return next()
			}

			if (entryId) {
				let entry = await strapi.documents('api::order-list.order-list').findOne({
					documentId: entryId,
					populate: "*"
				});
				
				if (store.documentId !== entry.store.documentId) {
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
				let entry = await strapi.documents('api::order-list.order-list').findOne({
					documentId: entryId,
					populate: "*"
				});
				if (user.id !== entry.user.id) {
					return ctx.unauthorized("非本用户，无权操作");
				} else {
					return next();
				}
			}
		}
	};
};
