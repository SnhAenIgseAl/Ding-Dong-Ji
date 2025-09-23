import { MessagePlugin } from 'tdesign-vue-next';
import { API_URL } from '@/config/request.config'
import { useUserStore } from '@/stores';

const getUserStore = async () => {
    return useUserStore()
}

/**
 * fetch
 */
export const useFetch = (
    url: string,
    option?: RequestInit,
    params?: RequestParams[],
    timeout?: number,
) => {
    return new Promise<
        ResponseData<
            any
        >
    >(async (resolve, reject) => {

        const timer = timeout ?? 5000
        const userStore = await getUserStore()

        // 请求超时
        const timeoutId = setTimeout(() => {
            reject(new Error("请求超时"));
        }, timer);

        // 有用户token就带上
        if (option) {
            option.headers = {
                ...option.headers,
                'Authorization': 'Bearer ' + userStore!.userToken,
            }
        }

        // 有参数就拼接
        const [...param] = params ?? []
        let paramStr = ''
        param.forEach(item => {
            for (let key in item) {
                paramStr += `${key}=${item[key]}&`
            }
        })

        fetch(API_URL + url + '?' + paramStr, option)
            .then(res => {
                return res.json()
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                MessagePlugin.error('服务器连接超时，请检查网络')
                reject(err)
            })
            .finally(() => {
                clearTimeout(timeoutId)
            })
    })
}