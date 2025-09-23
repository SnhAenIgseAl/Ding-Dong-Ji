/**
 * 计算订单金额
 * @param {*} orderList 
 * @returns 
 */
export const countPrice = (orderList: OrderList) => {
    let total = 0
    for (let i in orderList) {
        total += orderList[i].menu_price * orderList[i].menu_number
    }

    return parseFloat(total.toFixed(2))
}

/**
 * 日期格式化
 */
export const formatDate = (date: Date) => {
    return new Date(date).toLocaleString()
}

/**
 * 数组分组排序
 * @param list 
 * @param key 
 * @returns 
 */
export const groupBy = (list: any[], key: string | Function ) => {

    let keyFn: Function

    if (typeof key === 'string') {
        const prop = key
        keyFn = (item: any) => item[prop]
    } else {
        keyFn = key
    }

    const res = {}
    list.forEach((item, index) => {
        const k = keyFn(item, index, list)
        if (!res[k]) {
            res[k] = []
        }
        res[k].push(item)
    })
    return res
}