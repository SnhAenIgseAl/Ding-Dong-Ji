import { API_URL } from ".."

// 提交订单
export const submitFakeOrder = ({
    store,
    order_mode,
    userToken,
    order_list,
    discount,
    address
}: {
    store: Store['documentId'],
    order_mode: OrderMode,
    userToken: string,
    order_list: OrderList,
    discount?: Discount['documentId'],
    address?: Address['documentId']
}) => {
    return new Promise<
        ResponseData<
            Order
        >
    >((resolve, reject) => {
        fetch(`${API_URL}/order-lists`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    store,
                    order_mode,
                    order_list,
                    order_status: 'production',
                    discount,
                    address
                }
            })
        })
            .then(res => res.json())
            .then(res => {
                resolve(res as ResponseData<Order>)
            })
    })
}

// 提交评论
export const submitFakeComment = async ({
    root_comment,
    comment_text,
    userToken
}: {
    root_comment?: string,
    comment_text: string,
    userToken: string
}) => {
    return new Promise<
        ResponseData<
            Comment
        >
    >((resolve, reject) => {
        fetch(`${API_URL}/comments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    root_comment,
                    comment_text
                }
            })
        })
            .then(res => res.json())
            .then(res => {
                resolve(res as ResponseData<Comment>)
            })
    })
}