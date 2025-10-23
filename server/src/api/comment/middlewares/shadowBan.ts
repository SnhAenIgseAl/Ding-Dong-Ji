/**
 * `shadowBan` middleware
 */

import type { Core } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
	return async (ctx, next) => {
		const user = ctx.state.user

		/**
		 * 未登录
		 */
		if (!user) {
			ctx.query = {
				...ctx.query,
				filters: {
					is_shadowban: {
						$eq: false
					},
					...ctx.query.filters
				}
			}
			return next()
		}

		/**
		 * 父评论
		 */
		if (ctx.request.method === "GET") {
			ctx.query = {
				...ctx.query,
				filters: {
					$or: [
						{
							user: {
								id: {
									$eq: user.id
								}
							}
						},
						{
							is_shadowban: {
								$eq: false
							}
						}
					],
					...ctx.query.filters
				}
			}
			return next()
		}
	};
};
