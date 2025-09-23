import type { Core } from '@strapi/strapi';

export default {
	register({ strapi }: { strapi: Core.Strapi }) {
		// strapi.runPluginsLifecycles('register')
	},
	bootstrap({ strapi }: { strapi: Core.Strapi }) {
		// strapi.runPluginsLifecycles('bootstrap')
	},
	destroy({ strapi }: { strapi: Core.Strapi }) {
		// strapi.runPluginsLifecycles('destroy')
	}
};
