import { request } from "@/utils/request"

// 提交订单
export const submitOrder = ({
    store,
    order_mode,
    order_list,
    order_status,
    discount,
    address
}: {
    store: Store['documentId'],
    order_mode: OrderMode,
    order_list: OrderList,
    order_status: OrderStatus,
    discount?: Discount['documentId'],
    address?: Address['documentId']
}) => {
    return new Promise<
        ResponseData<
            Order
        >
    >((resolve, reject) => {
        request('/order-lists', {
            method: 'POST',
            data: {
                data: {
                    order_id: 0,
                    store,
                    order_mode,
                    order_list,
                    order_price: 0,
                    order_status,
                    discount,
                    address
                }
            }
        }).then(res => {
            resolve(res as ResponseData<Order>)
        })
    })
}

// 获取用户订单列表
export const getOrderLists = (
    params?: RequestParams[]
) => {
    return new Promise<
        ResponseData<
            Order[]
        >
    >((resolve, reject) => {
        request('/order-lists', {
            method: "GET",
            params
        }).then((res) => {
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
        request(`/order-lists/${id}`, {
            method: "GET",
            params
        }).then((res) => {
            resolve(res)
        })
    })
}

// 取餐并完成订单
export const finishOrder = (
    id: string,
) => {
    return new Promise<ResponseData>((resolve, reject) => {
        request(`/order-list/finish/${id}`, {
            method: "POST",
        }).then((res) => {
            resolve(res as ResponseData)
        })
    })
}