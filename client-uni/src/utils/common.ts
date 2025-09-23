/**
 * 打开指定页面
 * @param {string} url 
 */
export const goTo = (url: string) => {
    uni.navigateTo({
        url: url
    })
}

/**
 * 返回上一页
 */
export const back = () => {
    uni.navigateBack({
        delta: 1
    })
}

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
export const formatDate = (date: ISODateString) => {

    let res = date.toString()
    return res
        .replace('T', ' ')
        .replace('Z', '')
        .split('.')[0]
}

/**
 * 延时
 * @param time 毫秒
 * @returns 
 */
export const sleep = (time: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, time)
    })
}
