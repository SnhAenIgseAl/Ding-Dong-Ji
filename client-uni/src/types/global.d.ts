// src/types/global.d.ts
declare global {
	/**
	 * 响应数据结构
	 */
	type ResponseData<T = any> =
		ResponseSuccess &
		ResponseError & 
		LoginData &
		EmailData &
		User;

	interface ResponseSuccess<T = any> {
	    code?: number; 		// 业务状态码
		message?: string; 	// 消息
		data: T; 			// 返回数据			
		meta?: {
			pagination: {
				page: number,
				pageSize: number,
				pageCount: number,
				total: number
			}
		}
	}

	interface ResponseError {
		data: null,
		error: {				// 错误信息
			status: number; 	// 状态码
			message: string; 	// 错误信息
		}
	}

	type RestOption =
		`filters${string}` |
		'locale' |
		'status' |
		'populate' |
		`sort${string}` |
		'pagination[page]' |
		'pagination[pageSize]' |
		'pagination[withCount]' |
		'fields'
	type RequestParams = {
		[key in RestOption]?: string
	}

	/**
	 * strapi 时间为ISO格式字符串
	 */
	interface ISODateString extends String {}

	// interface LoginData {
	// 	jwt: string,
	// 	user: User
	// }
}
export { };
