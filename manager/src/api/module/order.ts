import { useFetch } from "@/utils/request"


// 获取用户订单列表
export const getOrderLists = (
    params?: RequestParams[]
) => {
    return new Promise<
        ResponseData<
            Order[]
        >
    >((resolve, reject) => {
        useFetch('/order-lists',
            { method: "GET", },
            params
        ).then((res) => {
            resolve(res)
        })
    })
}

// 获取单个订单信息
export const getOrderInfo = (
    id: string,
    params?: RequestParams[]
) => {
    return new Promise<
        ResponseData<
            Order
        >
    >((resolve, reject) => {
        useFetch(`/order-lists/${id}`,
            { method: "GET" },
            params
        ).then((res) => {
            resolve(res)
        })
    })
}

// 设置订单状态
export const setOrderStatus = (
    id: string,
    orderMode: OrderMode
) => {
    return new Promise<ResponseData>((resolve, reject) => {
        useFetch(`/order-list/set/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    order_mode: orderMode,
                }
            })
        }).then((res) => {
            resolve(res as ResponseData)
        })
    })
}

// 完成订单
export const finishOrder = (
    id: string
) => {
    return new Promise<ResponseData>((resolve, reject) => {
        useFetch(`/order-list/finish/${id}`, {
            method: "GET",
        }).then((res) => {
            resolve(res as ResponseData)
        })
    })
}

// 获取今日订单统计数据
export const getOrderTotalToday = () => {
    return new Promise<ResponseData>((resolve, reject) => {
        useFetch(`/total/today`, {
            method: "GET",
        }).then((res) => {
            resolve(res as ResponseData)
        })
    })
}

// 获取最近一个月订单统计数据
export const getOrderTotalRecent = () => {
    return new Promise<ResponseData>((resolve, reject) => {
        useFetch(`/total/recent`,{
            method: "GET"
        }).then((res) => {
            resolve(res as ResponseData)
        })
    })
}