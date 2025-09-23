import { request } from "@/utils/request"

export const getHomeData = (
    params?: RequestParams[]
) => {
    return new Promise<
        ResponseData<
            Home
        >
    >((resolve, reject) => {
        request('/home', {
            method: 'GET',
            params
        }).then(res => {
            resolve(res as ResponseData<Home>)
        })
    })
}