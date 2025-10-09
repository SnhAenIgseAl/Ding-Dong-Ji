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

/**
 * 计算两个经纬度之间的距离
 * @param lat1 纬度1
 * @param lng1 经度1
 * @param lat2 纬度2
 * @param lng2 经度2
 */
export const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number, toFixed: number = 0) => {
    const FINAL = 6378137.0
    const flat = calcDegree(lat1)
    const flng = calcDegree(lng1)
    const tlat = calcDegree(lat2) 
    const tlng = calcDegree(lng2)

    let result = Math.sin(flat) * Math.sin(tlat) 
    result += Math.cos(flat) * Math.cos(tlat) * Math.cos(flng - tlng)
    return (Math.acos(result) * FINAL).toFixed(toFixed);
}

/** 
 * 求某个经纬度的值的角度值 
 * @param {Object} d 
 */  
export const calcDegree = (d: number) => {  
    return d * Math.PI / 180.0 ;  
}  
