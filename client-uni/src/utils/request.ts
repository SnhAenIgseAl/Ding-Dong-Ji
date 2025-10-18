import { BASE_URL } from '@/config/api.config'
import { useUserStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { goTo } from './common'

const getUserStore = async () => {
	return useUserStore()
}

interface RequestConfig {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
	data?: any,
	params?: RequestParams[]
}

interface HttpError {
	[key: number]: string
}

export const request = async (
	url: string,
	config: RequestConfig
) => {
	
	const { isLogin, userToken } = storeToRefs(await getUserStore())
	const [...params] = config.params ?? []
	
	let paramStr = ''
	params.forEach(param => {
		for (let key in param) {
			paramStr += `${key}=${param[key]}&`
		}
	})
	
	return new Promise<ResponseData>((resolve, reject) => {
		uni.request({
			url: BASE_URL + url + '?' + paramStr,
			method: config.method ?? 'GET',
			header: {
				'Authorization': 'Bearer ' + userToken.value || null
			},
			data: config.data || {},
			success: (res) => {
				const response = res.data as ResponseData
				if (response.error && userToken.value) {
					// const errCode = response.error.status
					uni.showToast({
						title: response.error.message,
						// title: httpErrCode[errCode] || '未知错误',
						icon: 'none'
					})
					reject(response as ResponseError)
				}
				resolve(response as ResponseData<any>)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}