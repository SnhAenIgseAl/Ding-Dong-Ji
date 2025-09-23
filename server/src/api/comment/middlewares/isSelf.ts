/**
 * `isSelf` middleware
 */

import type { Core } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
	// Add your own logic here.
	return async (ctx, next) => {
		const userId = ctx.state.user.id
		const putId = ctx.request.body.data.user

		if (userId !== putId) {
			return ctx.unauthorized('You are not authorized to perform this action')
		} else {
			return next()
		}
	};
};
