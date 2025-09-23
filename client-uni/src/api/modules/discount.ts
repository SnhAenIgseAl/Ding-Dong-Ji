import { request } from '@/utils/request'

// 领取优惠券
export const getDiscount = async () => {
    return new Promise<ResponseData<Discount>>((resolve, reject) => {
        request('/discounts', {
            method: 'POST'
        }).then(res => {
            resolve(res as ResponseData<Discount>)
        })
    })
}

// 获取优惠券列表
export const getDiscountList = async (
    params?: RequestParams[]
) => {
    return new Promise<
        ResponseData<
            Discount[]
        >
    >((resolve, reject) => {
        request(`/discounts`, {
            method: 'GET',
            params
        }).then(res => {
            resolve(res as ResponseData<Discount[]>)
        })
    })
}